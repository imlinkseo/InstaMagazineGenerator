import { Theme } from "@emotion/react";

export const theme: Theme = {
  maxWidth: "720px",
  mediaQuery: {
    xs: "(max-width: 280px)",
    sm: "(max-width: 320px)",
    md: "(max-width: 420px)",
    lg: "(max-width: 580px)",
    xl: "(max-width: 720px)",
  },
  colors: {
    bl: "#383838",
    wh: "#FFFFFF",
    bg: "#F9F9F9",
    wt: "rgba(255,255,255,.5)",
    bt: "rgba(0,0,0,.9)",
    pc: "#FFB03B",
  },
  fontSize: {
    xs: "0.6rem",
    sm: "0.8rem",
    md: "1rem",
    lg: "1.2rem",
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
  },
};
