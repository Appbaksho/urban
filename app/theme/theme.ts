import { Platform } from 'react-native';
import {configureFonts, MD3LightTheme as MDTheme} from 'react-native-paper'




export const theme = {
  ...MDTheme,
  myOwnProperty: true,
  fonts: configureFonts({config:{
    titleSmall: {
      fontFamily: "poppins",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    titleMedium: {
      fontFamily: "poppinsMedium",
      fontSize: 18,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 24,
    },
    titleLarge: {
      fontFamily: "poppins",
      fontSize: 20,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 28,
    },
    bodySmall: {
      fontFamily: "poppins",
      fontSize: 13,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    bodyMedium: {
      fontFamily: "poppins",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.1,
      lineHeight: 24,
    },
    bodyLarge: {
      fontFamily: "poppins",
      fontSize: 18,
      fontWeight: "400",
      letterSpacing: 0.1,
      lineHeight: 28,
    },
    caption: {
      fontFamily: "poppins",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.1,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: "poppinsMedium",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    displayLarge:{
      fontFamily: "poppinsBold",
      fontSize: 32,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 40,
    },
    labelSmall: {
      fontFamily: "poppinsMedium",
      fontSize: 13,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    }
  },isV3:true}),
  colors: {
    primary: "#111111", // Black
    secondary: "#F5F5F5", // White
    tertiary: "#FF0000", // Red
    outlineVariant: "#CCCCCC", // Light Gray
    textInvert: "#FFFFFF", // White
    backdrop: "#F5F5F5", // Light Gray
  },
  roundness:10
};