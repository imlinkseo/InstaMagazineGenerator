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

export function GreetingText(prop: IText) {
  const theme = useTheme() as CustomTheme;
  const greeting_text = (theme: CustomTheme) => css`
    display: block;
    text-transform: uppercase;
    font-family: "Lexend", serif;
    font-size: ${theme.fontSize.lg};
    text-align: center;
    font-weight: ${theme.fontWeight.black};

    @media (${theme.mediaQuery.ml}) {
      font-size: ${theme.fontSize.ml};
    }
    @media (${theme.mediaQuery.ms}) {
      font-size: ${theme.fontSize.md};
    }
  `;

  return <p css={greeting_text(theme)}>{prop.text}</p>;
}

interface IHowtoText {
  text: string;
  windowWidth: number;
}

export function HowtoText(prop: IHowtoText) {
  const { text, windowWidth } = prop;
  const theme = useTheme() as CustomTheme;

  const howto_style = (theme: CustomTheme) => css`
    color: ${theme.colors.bl};
    font-weight: ${theme.fontWeight.normal};
    text-align: center;
    line-height: 1.5em;
    white-space: pre-wrap;
    font-size: ${windowWidth / 30}px;
  `;

  return <p css={[howto_style(theme)]}>{text}</p>;
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
    @media (${theme.mediaQuery.sm}) {
      font-size: ${theme.fontSize.sm};
    }
  `;

  return <p css={button_text(theme)}>{prop.text}</p>;
}

interface ILocationText {
  text: string | null;
  windowWidth: number;
  replace: string;
}

export function LocationText(prop: ILocationText) {
  const { text, windowWidth, replace } = prop;
  const theme = useTheme() as CustomTheme;

  const location_text = (theme: CustomTheme, windowWidth: number) => css`
    position: relative;
    padding-left: 1em;
    font-size: ${windowWidth / 30}px;
    line-height: 1.5em;
    color: ${theme.colors.wh};
    white-space: nowrap;

    &:before {
      position: absolute;
      content: "";
      left: 0.5em;
      top: 50%;
      transform: translate(-0.25em, -50%);
      display: block;
      width: 1px;
      height: 50%;
      background-color: ${theme.colors.wh};
    }

    @media (${theme.mediaQuery.md}) {
      font-size: ${theme.fontSize.ms};
    }
    @media (${theme.mediaQuery.sm}) {
      font-size: ${theme.fontSize.sm};
    }
  `;

  return <p css={location_text(theme, windowWidth)}>{text ?? replace}</p>;
}

interface ITagText {
  text: string | null;
  windowWidth: number;
  replace: string;
}

export function TagText(prop: ITagText) {
  const { text, windowWidth, replace } = prop;
  const theme = useTheme() as CustomTheme;

  const tag_text = (theme: CustomTheme, windowWidth: number) => css`
    font-size: ${windowWidth / 30}px;
    color: ${theme.colors.bl};
    white-space: nowrap;
    padding: ${windowWidth / 92}px ${windowWidth / 46}px;
    background-color: ${theme.colors.wh};
    border-radius: ${windowWidth / 24}px;

    @media (${theme.mediaQuery.md}) {
      font-size: ${theme.fontSize.ms};
    }
    @media (${theme.mediaQuery.sm}) {
      font-size: ${theme.fontSize.sm};
    }
  `;

  return <p css={tag_text(theme, windowWidth)}># {text ?? replace}</p>;
}

export function CaptionText(prop: IText) {
  const theme = useTheme() as CustomTheme;
  const caption_text = (theme: CustomTheme) => css`
    font-family: "Lexend", serif;
    font-size: ${theme.fontSize.ms};
    line-height: 1em;
    color: ${theme.colors.bt};
    white-space: nowrap;

    @media (${theme.mediaQuery.sm}) {
      font-size: ${theme.fontSize.sm};
    }
  `;

  return <p css={caption_text(theme)}>{prop.text}</p>;
}

interface IWaterMarkText extends IText {
  windowWidth: number;
}

export function WaterMarkText(prop: IWaterMarkText) {
  const { windowWidth } = prop;
  const theme = useTheme() as CustomTheme;

  const water_mark_text = (theme: CustomTheme, windowWidth: number) => css`
    font-family: "Lexend", serif;
    text-transform: uppercase;
    font-size: ${windowWidth / 60}px;
    line-height: 1em;
    color: ${theme.colors.wh};
    white-space: nowrap;
  `;

  return <p css={water_mark_text(theme, windowWidth)}>{prop.text}</p>;
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

    @media (${theme.mediaQuery.md}) {
      display: none;
    }
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

interface IPreviewText {
  text: string | null;
  template: TTemplate;
  windowWidth: number;
  replace: string;
}

export function TitleText(prop: IPreviewText) {
  const { text, template, windowWidth, replace } = prop;
  const theme = useTheme() as CustomTheme;

  const title_color = (template: TTemplate) => {
    switch (template) {
      case "front":
        return css`
          color: ${theme.colors.wh};
        `;
      case "content":
        return css`
          color: ${theme.colors.wh};
        `;
      case "back":
        return css`
          color: ${theme.colors.wh};
        `;
      default:
        return css`
          color: ${theme.colors.wh};
        `;
    }
  };

  const title_style = (theme: CustomTheme) => css`
    text-overflow: ellipsis;
    white-space: pre-wrap;
    line-height: 1.5em;
    font-weight: ${theme.fontWeight.bold};
    overflow: hidden;
    text-transform: capitalize;
  `;

  const title_size = (template: TTemplate, windowWidth: number) => {
    switch (template) {
      case "front":
        return css`
          font-size: ${windowWidth / 12}px;
        `;
      case "content":
        return css`
          font-size: ${windowWidth / 24}px;
        `;
      case "back":
        return css`
          font-size: ${windowWidth / 15}px;
        `;
    }
  };

  return (
    <p
      css={[
        title_color(template),
        title_style(theme),
        title_size(template, windowWidth),
      ]}
    >
      {text ?? replace}
    </p>
  );
}

export function DescText(prop: IPreviewText) {
  const { text, template, windowWidth, replace } = prop;
  const theme = useTheme() as CustomTheme;

  const desc_style = (theme: CustomTheme) => css`
    color: ${theme.colors.wh};
    font-weight: ${theme.fontWeight.normal};
    line-height: 1.5em;
    white-space: pre-wrap;
    text-transform: capitalize;
  `;

  const desc_size = (template: TTemplate, windowWidth: number) => {
    switch (template) {
      case "front":
        return css`
          font-size: ${windowWidth / 15}px;
        `;
      case "content":
        return css`
          font-size: ${windowWidth / 30}px;
        `;
      case "back":
        return css`
          font-size: ${windowWidth / 15}px;
          text-align: center;
        `;
    }
  };

  return (
    <p css={[desc_style(theme), desc_size(template, windowWidth)]}>
      {text ?? replace}
    </p>
  );
}
