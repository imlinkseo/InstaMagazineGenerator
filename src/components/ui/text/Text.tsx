/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";

interface IText {
  text: string;
}

export function LogoTextOver680(prop: IText) {
  const theme = useTheme() as CustomTheme;
  const logo_text = (theme: CustomTheme) => css`
    text-transform: capitalize;
    font-family: "Lexend", serif;
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.black};
    white-space: nowrap;

    @media (${theme.mediaQuery.lg}) {
      display: none;
    }
  `;

  return <p css={logo_text(theme)}>{prop.text}</p>;
}

export function LogoTextUnder680(prop: IText) {
  const theme = useTheme() as CustomTheme;
  const logo_text = (theme: CustomTheme) => css`
    display: block;
    text-transform: uppercase;
    font-family: "Lexend", serif;
    font-size: ${theme.fontSize.lg};
    font-weight: ${theme.fontWeight.black};
    white-space: nowrap;

    @media (min-width: 680px) {
      display: none;
    }

    @media (${theme.mediaQuery.ml}) {
      font-size: ${theme.fontSize.ml};
    }
    @media (${theme.mediaQuery.ms}) {
      font-size: ${theme.fontSize.md};
    }
  `;

  return <p css={logo_text(theme)}>{prop.text}</p>;
}
export function ButtonText(prop: IText) {
  const theme = useTheme() as CustomTheme;
  const button_text = (theme: CustomTheme) => css`
    text-transform: uppercase;
    font-family: "Lexend", serif;
    font-size: ${theme.fontSize.md};
    line-height: 1em;
    color: ${theme.colors.bt};
    white-space: nowrap;

    @media (${theme.mediaQuery.md}) {
      font-size: ${theme.fontSize.ms};
    }
    @media (${theme.mediaQuery.xs}) {
      font-size: ${theme.fontSize.sm};
    }
  `;

  return <p css={button_text(theme)}>{prop.text}</p>;
}

interface ITextStep extends IText {
  isDone: boolean;
}

export function InfoText(prop: ITextStep) {
  const { text, isDone } = prop;
  const theme = useTheme() as CustomTheme;

  const container = css`
    position: relative;
    display: flex;
  `;

  const button_text = (theme: CustomTheme) => css`
    margin-left: 1rem;
    text-transform: capitalize;
    font-family: "Lexend", serif;
    font-size: ${theme.fontSize.md};
    font-weight: ${theme.fontWeight.bold};
    line-height: 1em;
    color: ${theme.colors.bt};
    white-space: nowrap;

    @media (${theme.mediaQuery.md}) {
      font-size: ${theme.fontSize.ms};
    }
    @media (${theme.mediaQuery.xs}) {
      font-size: ${theme.fontSize.sm};
    }
  `;

  const bar = (theme: CustomTheme, isDone: boolean) => css`
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 4px;
    height: 1.25em;
    background-color: ${isDone ? theme.colors.pc : theme.colors.bt};

    transition: 0.3s ease-in-out;
  `;

  return (
    <div css={container}>
      <div css={bar(theme, isDone)}></div>
      <p css={button_text(theme)}>{text}</p>
    </div>
  );
}
