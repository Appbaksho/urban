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
      fontSize: 20,
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
      fontFamily: "poppinsMedium",
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
      fontSize: 20,
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
  },isV3:true}),
  colors: {
    primary:"#E81046",
    secondary:"#FF0E5A",
    tertiary:"#AC002B",
    outlineVariant:"#d7d7d7",
    textInvert:"#FFFAFA",
    backdrop:"#FFFFFF",
  },
  roundness:10
};