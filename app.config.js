import "dotenv/config";

export default {
  expo: {
    name: "Undergrow",
    slug: "Undergrow",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: "./assets/images/undergrow-icon-nobg.png",

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tuorganizacion.undergrow",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/undergrow-icon-nobg.png",
        backgroundColor: "#FFFFFF",
      },
      package: "com.tuorganizacion.undergrow",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "54d6a289-99f0-4f17-874e-0f1f28c2d176",
      },
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
};
