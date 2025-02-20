/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";

export interface IResponsiveContainer {
  children?: React.ReactNode;
}

export default function ResponsiveContainer(prop: IResponsiveContainer) {
  const { children } = prop;

  const theme = useTheme() as CustomTheme;

  return <div css={container(theme)}>{children}</div>;
}

const container = (theme: CustomTheme) => css`
  display: flex;
  flex-direction: column;

  margin: 0 auto;

  width: 100%;
  max-width: ${theme.maxWidth};
  height: 100%;
  min-height: 100vh;

  background-color: ${theme.colors.b2};
`;
