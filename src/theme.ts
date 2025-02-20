import { Theme as EmotionTheme } from "@emotion/react";

export interface CustomTheme extends EmotionTheme {
  maxWidth: string;
  mediaQuery: {
    xs: string;
    sm: string;
    ms: string;
    md: string;
    ml: string;
    lg: string;
    xl: string;
  };
  colors: {
    bl: string;
    wh: string;
    bg: string;
    b2: string;
    wt: string;
    bt: string;
    pc: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    ms: string;
    md: string;
    ml: string;
    lg: string;
    xl: string;
  };
  fontWeight: {
    black: string;
    bold: string;
    normal: string;
    light: string;
  };
  padding: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
}

export const theme: CustomTheme = {
  maxWidth: "720px",
  mediaQuery: {
    xs: "(max-width: 280px)",
    sm: "(max-width: 320px)",
    ms: "(max-width: 360px)",
    md: "(max-width: 420px)",
    ml: "(max-width: 580px)",
    lg: "(max-width: 680px)",
    xl: "(max-width: 720px)",
  },
  colors: {
    bl: "#383838",
    wh: "#FFFFFF",
    bg: "#F1F1F1",
    b2: "rgba(231,231,231)",
    wt: "rgba(255,255,255,.5)",
    bt: "rgba(0,0,0,.9)",
    pc: "rgb(255, 107, 229)",
  },
  fontSize: {
    xs: "0.4rem",
    sm: "0.6rem",
    ms: "0.8rem",
    md: "1rem",
    ml: "1.2rem",
    lg: "1.4rem",
    xl: "1.6rem",
  },
  fontWeight: {
    black: "800",
    bold: "600",
    normal: "400",
    light: "300",
  },
  padding: {
    xs: "0.5rem",
    sm: "0.8rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  borderRadius: {
    xs: "0.6rem",
    sm: "0.8rem",
    md: "1rem",
    lg: "2rem",
    xl: "3rem",
    full: "50%",
  },
};
