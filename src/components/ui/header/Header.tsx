/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Generate } from "@svgs/generate.svg";
import { ReactComponent as Instagram } from "@svgs/instagram.svg";

export default function Header() {
  return (
    <header css={header}>
      <Generate css={icon} />
      {/* <h1 css={title}>MagazineGenerator</h1> */}
      <div css={title_desc_container}>{/* <Instagram /> */}</div>
    </header>
  );
}

const header = (theme: any) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${theme.padding.md} ${theme.padding.lg};
  border-radius: ${theme.borderRadius.xl};
  background-color: ${theme.colors.wh};
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
  color: ${theme.colors.bt};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};

  @media (${theme.mediaQuery.md}) {
    font-size: ${theme.fontSize.md};
  }
`;

const icon = (theme: any) => css`
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
`;
