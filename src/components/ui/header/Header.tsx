/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { ReactComponent as Instagram } from "@svgs/instagram.svg";

export default function Header() {
  return (
    <header css={header}>
      <h1 css={title}>MagazineGenerator</h1>
      <div css={title_desc_container}>
        <Instagram />
      </div>
    </header>
  );
}

const header = (theme: any) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${theme.padding.md};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.bt};
`;

const title_desc_container = (theme: any) => css`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    * {
      fill: ${theme.colors.wh};
    }
  }
`;

const title = (theme: any) => css`
  color: ${theme.colors.wh};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};

  @media (${theme.mediaQuery.md}) {
    font-size: ${theme.fontSize.md};
  }
`;
