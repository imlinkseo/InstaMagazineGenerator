/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { CaptionText } from "../text/Text";

export default function Footer() {
  const caption1_ = "go to github";
  const caption1_url = "https://github.com/imlinkseo/MagazineGenerator";
  const caption2_ = "imlinkseo@gmail.com";
  const version = `ver.${process.env.REACT_APP_VERSION}`;
  const theme = useTheme() as CustomTheme;

  return (
    <footer css={footer(theme)}>
      <Link to={caption1_url}>
        <CaptionText text={caption1_} />
      </Link>
      <CaptionText text={version as string} />
      <CaptionText text={caption2_} />
    </footer>
  );
}

const footer = (theme: CustomTheme) => css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  height: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  padding: ${theme.padding.xs} ${theme.padding.sm};
  background-color: ${theme.colors.wh};
  border-top: 1px solid ${theme.colors.bt};
`;
