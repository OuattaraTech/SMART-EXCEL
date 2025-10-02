# -*- coding: utf-8 -*-
"""
Application Flask pour l'édition de fichiers Excel avec IA
Auteur: Assistant IA
Description: API backend pour traiter les fichiers Excel et interpréter les commandes naturelles
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
import numpy as np
import io
import os
import json
import openai  # Activé avec votre clé API
from datetime import datetime
import tempfile
import logging
from config import Config

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration de l'application
app.config.from_object(Config)
CORS(app, origins=Config.CORS_ORIGINS)  # Configuration CORS sécurisée

# Configuration OpenAI
openai.api_key = Config.OPENAI_API_KEY

# Configuration des dossiers
UPLOAD_FOLDER = Config.UPLOAD_FOLDER
EXPORT_FOLDER = Config.EXPORT_FOLDER

# Créer les dossiers nécessaires
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(EXPORT_FOLDER, exist_ok=True)

# Variable globale pour stocker le DataFrame actuel
current_dataframe = None
current_filename = None

class ExcelProcessor:
    """Classe pour traiter les opérations sur les fichiers Excel"""
    
    def __init__(self):
        self.df = None
    
    def load_file(self, file_path, file_type='xlsx'):
        """Charge un fichier Excel ou CSV dans un DataFrame pandas"""
        try:
            if file_type.lower() == 'csv':
                self.df = pd.read_csv(file_path)
            else:
                self.df = pd.read_excel(file_path)
            
            # Convertir les NaN en chaînes vides pour l'affichage
            self.df = self.df.fillna('')
            
            logger.info(f"Fichier chargé avec succès: {self.df.shape[0]} lignes, {self.df.shape[1]} colonnes")
            return True
        except Exception as e:
            logger.error(f"Erreur lors du chargement du fichier: {str(e)}")
            return False
    
    def get_data_for_frontend(self):
        """Convertit le DataFrame en format JSON pour le frontend"""
        if self.df is None:
            return None
        
        # Convertir en format compatible avec AG-Grid
        data = []
        for index, row in self.df.iterrows():
            row_data = {'id': index}
            for col in self.df.columns:
                row_data[col] = row[col]
            data.append(row_data)
        
        # Définir les colonnes pour AG-Grid
        columns = [{'field': 'id', 'headerName': 'ID', 'width': 70, 'editable': False}]
        for col in self.df.columns:
            columns.append({
                'field': col,
                'headerName': col,
                'editable': True,
                'width': 150
            })
        
        return {
            'data': data,
            'columns': columns,
            'rowCount': len(self.df),
            'colCount': len(self.df.columns)
        }
    
    def update_cell(self, row_id, column, value):
        """Met à jour une cellule spécifique"""
        try:
            if self.df is None:
                return False
            
            # Convertir la valeur si c'est un nombre
            try:
                if value.replace('.', '').replace('-', '').isdigit():
                    value = float(value) if '.' in value else int(value)
            except:
                pass
            
            self.df.at[row_id, column] = value
            logger.info(f"Cellule mise à jour: ligne {row_id}, colonne {column}, valeur {value}")
            return True
        except Exception as e:
            logger.error(f"Erreur lors de la mise à jour de la cellule: {str(e)}")
            return False
    
    def export_to_excel(self, filename):
        """Exporte le DataFrame vers un fichier Excel"""
        try:
            if self.df is None:
                return None
            
            export_path = os.path.join(EXPORT_FOLDER, filename)
            self.df.to_excel(export_path, index=False)
            logger.info(f"Fichier exporté: {export_path}")
            return export_path
        except Exception as e:
            logger.error(f"Erreur lors de l'export: {str(e)}")
            return None

class AICommandProcessor:
    """Classe pour traiter les commandes IA en langage naturel"""
    
    def __init__(self, api_key=None):
        # Configuration OpenAI
        self.openai_client = openai
        if api_key:
            self.openai_client.api_key = api_key
        self.processor = None
        self.use_openai = True  # Activer l'IA OpenAI
    
    def set_processor(self, processor):
        """Définit le processeur Excel à utiliser"""
        self.processor = processor
    
    def interpret_command(self, command, df_info):
        """Interprète une commande en langage naturel et génère du code pandas"""
        
        # Essayer d'abord avec OpenAI si disponible
        if self.use_openai and hasattr(self.openai_client, 'api_key'):
            try:
                return self._interpret_with_openai(command, df_info)
            except Exception as e:
                logger.warning(f"Erreur OpenAI: {e}. Utilisation du système de règles.")
        
        # Système de règles simple en fallback
        command_lower = command.lower()
        
        # Détection des types de commandes
        if 'somme' in command_lower or 'sum' in command_lower:
            return self._handle_sum_command(command, df_info)
        elif 'moyenne' in command_lower or 'mean' in command_lower:
            return self._handle_mean_command(command, df_info)
        elif 'ajoute' in command_lower and 'colonne' in command_lower:
            return self._handle_add_column_command(command, df_info)
        elif 'filtre' in command_lower or 'filter' in command_lower:
            return self._handle_filter_command(command, df_info)
        elif 'trie' in command_lower or 'sort' in command_lower:
            return self._handle_sort_command(command, df_info)
        else:
            return {
                'success': False,
                'message': 'Commande non reconnue. Essayez: "Calcule la somme de la colonne X", "Ajoute une colonne Y", "Filtre les lignes où X > 10"'
            }
    
    def _interpret_with_openai(self, command, df_info):
        """Utilise OpenAI GPT pour interpréter la commande de manière avancée"""
        try:
            # Préparer le contexte pour GPT
            columns_info = ", ".join(df_info['columns'])
            data_shape = f"{df_info['shape'][0]} lignes, {df_info['shape'][1]} colonnes"
            
            # Prompt système pour GPT
            system_prompt = f"""Tu es un assistant IA spécialisé dans l'analyse de données Excel avec pandas.
            
Contexte du fichier Excel:
- Colonnes disponibles: {columns_info}
- Taille des données: {data_shape}

Tu dois interpréter les commandes utilisateur et retourner une réponse JSON avec:
- "action": le type d'action (calculate, filter, add_column, sort, etc.)
- "column": la colonne concernée (si applicable)
- "operation": l'opération à effectuer
- "value": la valeur ou paramètre (si applicable)
- "message": message de confirmation pour l'utilisateur

Exemples de réponses:
- Pour "Calcule la somme de la colonne Prix": {{"action": "calculate", "column": "Prix", "operation": "sum", "message": "Calcul de la somme de la colonne Prix"}}
- Pour "Ajoute une colonne TVA à 20%": {{"action": "add_column", "column": "TVA", "operation": "percentage", "value": 20, "message": "Ajout d'une colonne TVA à 20%"}}
"""

            user_prompt = f"Commande utilisateur: {command}"
            
            # Appel à l'API OpenAI
            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=500,
                temperature=0.3
            )
            
            # Parser la réponse
            ai_response = response.choices[0].message.content.strip()
            
            try:
                # Essayer de parser comme JSON
                import json
                parsed_response = json.loads(ai_response)
                
                # Exécuter l'action déterminée par l'IA
                return self._execute_ai_action(parsed_response, df_info)
                
            except json.JSONDecodeError:
                # Si ce n'est pas du JSON, utiliser la réponse comme message
                return {
                    'success': True,
                    'message': f"IA: {ai_response}",
                    'operation': 'ai_response'
                }
                
        except Exception as e:
            logger.error(f"Erreur OpenAI: {e}")
            raise e
    
    def _execute_ai_action(self, ai_response, df_info):
        """Exécute l'action déterminée par l'IA"""
        try:
            action = ai_response.get('action', '')
            column = ai_response.get('column', '')
            operation = ai_response.get('operation', '')
            value = ai_response.get('value', '')
            message = ai_response.get('message', 'Action IA exécutée')
            
            if action == 'calculate' and operation == 'sum':
                # Calculer la somme
                if column in self.processor.df.columns:
                    result = self.processor.df[column].sum()
                    return {
                        'success': True,
                        'message': f'{message}. Résultat: {result}',
                        'operation': 'calculation',
                        'result': result
                    }
            
            elif action == 'add_column' and operation == 'percentage':
                # Ajouter une colonne avec pourcentage
                # Chercher une colonne de prix/montant
                price_column = None
                for col in self.processor.df.columns:
                    if any(word in col.lower() for word in ['prix', 'price', 'montant', 'amount', 'total']):
                        price_column = col
                        break
                
                if price_column and value:
                    self.processor.df[column] = self.processor.df[price_column] * (float(value) / 100)
                    return {
                        'success': True,
                        'message': f'{message}. Colonne {column} ajoutée avec {value}% de {price_column}',
                        'operation': 'add_column',
                        'refresh_needed': True
                    }
            
            # Action générique réussie
            return {
                'success': True,
                'message': message,
                'operation': 'ai_action'
            }
            
        except Exception as e:
            return {
                'success': False,
                'message': f'Erreur lors de l\'exécution de l\'action IA: {str(e)}'
            }
    
    def _handle_sum_command(self, command, df_info):
        """Traite les commandes de somme"""
        try:
            # Extraction simple du nom de colonne
            words = command.split()
            column_name = None
            
            for i, word in enumerate(words):
                if word.lower() in ['colonne', 'column']:
                    if i + 1 < len(words):
                        column_name = words[i + 1]
                        break
            
            if not column_name:
                # Chercher directement dans les colonnes disponibles
                for col in df_info['columns']:
                    if col.lower() in command.lower():
                        column_name = col
                        break
            
            if column_name and column_name in self.processor.df.columns:
                try:
                    result = self.processor.df[column_name].sum()
                    return {
                        'success': True,
                        'message': f'La somme de la colonne "{column_name}" est: {result}',
                        'operation': 'calculation',
                        'result': result
                    }
                except:
                    return {
                        'success': False,
                        'message': f'Impossible de calculer la somme de la colonne "{column_name}". Vérifiez que les données sont numériques.'
                    }
            else:
                return {
                    'success': False,
                    'message': f'Colonne "{column_name}" non trouvée. Colonnes disponibles: {list(self.processor.df.columns)}'
                }
        except Exception as e:
            return {'success': False, 'message': f'Erreur: {str(e)}'}
    
    def _handle_add_column_command(self, command, df_info):
        """Traite les commandes d'ajout de colonne"""
        try:
            # Exemple: "Ajoute une colonne TVA à 18%"
            if 'tva' in command.lower():
                # Chercher une colonne de prix
                price_column = None
                for col in self.processor.df.columns:
                    if any(word in col.lower() for word in ['prix', 'price', 'montant', 'amount']):
                        price_column = col
                        break
                
                if price_column:
                    # Extraire le pourcentage
                    import re
                    percentage_match = re.search(r'(\d+(?:\.\d+)?)%', command)
                    if percentage_match:
                        percentage = float(percentage_match.group(1))
                        self.processor.df['TVA'] = self.processor.df[price_column] * (percentage / 100)
                        return {
                            'success': True,
                            'message': f'Colonne TVA ajoutée avec {percentage}% de {price_column}',
                            'operation': 'add_column',
                            'refresh_needed': True
                        }
                
            return {
                'success': False,
                'message': 'Format de commande non reconnu pour l\'ajout de colonne'
            }
        except Exception as e:
            return {'success': False, 'message': f'Erreur: {str(e)}'}
    
    def _handle_filter_command(self, command, df_info):
        """Traite les commandes de filtrage"""
        try:
            # Exemple: "Filtre uniquement les lignes où le rendement est > 2"
            import re
            
            # Recherche de pattern: colonne opérateur valeur
            pattern = r'(\w+)\s*(>|<|>=|<=|=|==)\s*(\d+(?:\.\d+)?)'
            match = re.search(pattern, command)
            
            if match:
                column_name = match.group(1)
                operator = match.group(2)
                value = float(match.group(3))
                
                # Trouver la colonne correspondante
                actual_column = None
                for col in self.processor.df.columns:
                    if column_name.lower() in col.lower():
                        actual_column = col
                        break
                
                if actual_column:
                    if operator == '>':
                        filtered_df = self.processor.df[self.processor.df[actual_column] > value]
                    elif operator == '<':
                        filtered_df = self.processor.df[self.processor.df[actual_column] < value]
                    elif operator in ['=', '==']:
                        filtered_df = self.processor.df[self.processor.df[actual_column] == value]
                    elif operator == '>=':
                        filtered_df = self.processor.df[self.processor.df[actual_column] >= value]
                    elif operator == '<=':
                        filtered_df = self.processor.df[self.processor.df[actual_column] <= value]
                    
                    self.processor.df = filtered_df.reset_index(drop=True)
                    
                    return {
                        'success': True,
                        'message': f'Filtre appliqué: {actual_column} {operator} {value}. {len(filtered_df)} lignes restantes.',
                        'operation': 'filter',
                        'refresh_needed': True
                    }
            
            return {
                'success': False,
                'message': 'Format de filtre non reconnu. Utilisez: "Filtre colonne > valeur"'
            }
        except Exception as e:
            return {'success': False, 'message': f'Erreur: {str(e)}'}

# Initialisation des processeurs
excel_processor = ExcelProcessor()
ai_processor = AICommandProcessor(api_key=Config.OPENAI_API_KEY)
ai_processor.set_processor(excel_processor)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Endpoint pour uploader un fichier Excel ou CSV"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Aucun fichier fourni'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Aucun fichier sélectionné'}), 400
        
        # Vérifier l'extension
        allowed_extensions = {'.xlsx', '.xls', '.csv'}
        file_ext = os.path.splitext(file.filename)[1].lower()
        
        if file_ext not in allowed_extensions:
            return jsonify({'error': 'Format de fichier non supporté. Utilisez .xlsx, .xls ou .csv'}), 400
        
        # Sauvegarder le fichier
        filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        
        # Charger dans le processeur
        file_type = 'csv' if file_ext == '.csv' else 'xlsx'
        if excel_processor.load_file(file_path, file_type):
            global current_filename
            current_filename = filename
            
            data = excel_processor.get_data_for_frontend()
            return jsonify({
                'success': True,
                'message': 'Fichier chargé avec succès',
                'data': data,
                'filename': filename
            })
        else:
            return jsonify({'error': 'Erreur lors du chargement du fichier'}), 500
            
    except Exception as e:
        logger.error(f"Erreur upload: {str(e)}")
        return jsonify({'error': f'Erreur serveur: {str(e)}'}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    """Endpoint pour récupérer les données actuelles"""
    try:
        data = excel_processor.get_data_for_frontend()
        if data:
            return jsonify({'success': True, 'data': data})
        else:
            return jsonify({'error': 'Aucune donnée chargée'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/update-cell', methods=['POST'])
def update_cell():
    """Endpoint pour mettre à jour une cellule"""
    try:
        data = request.get_json()
        row_id = data.get('rowId')
        column = data.get('column')
        value = data.get('value')
        
        if excel_processor.update_cell(row_id, column, value):
            return jsonify({'success': True, 'message': 'Cellule mise à jour'})
        else:
            return jsonify({'error': 'Erreur lors de la mise à jour'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ai-command', methods=['POST'])
def process_ai_command():
    """Endpoint pour traiter les commandes IA en langage naturel"""
    try:
        data = request.get_json()
        command = data.get('command', '')
        
        if not command:
            return jsonify({'error': 'Commande vide'}), 400
        
        # Informations sur le DataFrame actuel
        df_info = {
            'columns': list(excel_processor.df.columns) if excel_processor.df is not None else [],
            'shape': excel_processor.df.shape if excel_processor.df is not None else (0, 0)
        }
        
        # Traiter la commande
        result = ai_processor.interpret_command(command, df_info)
        
        # Si une actualisation est nécessaire, renvoyer les nouvelles données
        if result.get('refresh_needed'):
            result['data'] = excel_processor.get_data_for_frontend()
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Erreur commande IA: {str(e)}")
        return jsonify({'error': f'Erreur serveur: {str(e)}'}), 500

@app.route('/api/export', methods=['POST'])
def export_file():
    """Endpoint pour exporter le fichier modifié"""
    try:
        data = request.get_json()
        filename = data.get('filename', f'export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx')
        
        export_path = excel_processor.export_to_excel(filename)
        
        if export_path and os.path.exists(export_path):
            return send_file(
                export_path,
                as_attachment=True,
                download_name=filename,
                mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            )
        else:
            return jsonify({'error': 'Erreur lors de l\'export'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/status', methods=['GET'])
def get_status():
    """Endpoint pour vérifier le statut de l'application"""
    return jsonify({
        'status': 'active',
        'has_data': excel_processor.df is not None,
        'current_file': current_filename,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Démarrage du serveur Flask...")
    print("📊 Application d'édition Excel avec IA")
    print("🌐 Interface disponible sur: http://localhost:5000")
    print("📝 API endpoints:")
    print("   - POST /api/upload : Upload de fichier")
    print("   - GET  /api/data : Récupération des données")
    print("   - POST /api/update-cell : Mise à jour de cellule")
    print("   - POST /api/ai-command : Commandes IA")
    print("   - POST /api/export : Export Excel")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
