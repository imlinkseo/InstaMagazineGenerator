/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { useHeaderFooterHeight } from "../headerFooterProvider/HeaderFooterProvider";

export interface IResponsiveContainer {
  children?: React.ReactNode;
}

export default function ResponsiveInnerContainer(prop: IResponsiveContainer) {
  const { children } = prop;

  const { headerHeight, footerHeight } = useHeaderFooterHeight();

  const theme = useTheme() as CustomTheme;

  return (
    <div css={container(theme, headerHeight, footerHeight)}>{children}</div>
  );
}

const container = (
  theme: CustomTheme,
  headerHeight: number,
  footerHeight: number
) => css`
  padding-top: ${headerHeight}px;
  width: 100%;
`;
