// @ts-ignore - Capacitor CLI sera installé plus tard
const config = {
  appId: 'com.ouattaratech.smartexcel',
  appName: 'SMART-EXCEL',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    allowNavigation: [
      'localhost:5000',
      '192.168.1.*',
      '10.0.2.2:5000'  // Pour émulateur Android
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#667eea",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#667eea"
    },
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
