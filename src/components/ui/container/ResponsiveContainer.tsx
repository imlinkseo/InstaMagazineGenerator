/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface IResponsiveContainer {
  children?: React.ReactNode;
}

export default function ResponsiveContainer(prop: IResponsiveContainer) {
  const { children } = prop;
  return <div css={container}>{children}</div>;
}

const container = (theme: any) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 0 auto;
  padding: ${theme.padding.md};

  width: 100%;
  max-width: ${theme.maxWidth};
  height: 100%;
  min-height: 100vh;

  background-color: ${theme.colors.bg};
`;
