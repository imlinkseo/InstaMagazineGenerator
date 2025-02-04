/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useRef } from "react";
import { ReactComponent as Image } from "@svgs/image.svg";
import { ReactComponent as Delete } from "@svgs/delete.svg";

export default function Generator() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("handleBackgroundImageChange");
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  const handleBackgroundImageDelete = () => {
    if (backgroundRef.current) {
      backgroundRef.current.value = "";
    }
    setBackgroundImage(null);
  };

  const handleBackgroundImageClick = () => {
    backgroundRef.current?.click();
  };

  const handleLogoImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoImage(imageUrl);
    }
  };

  const handleLogoImageDelete = () => {
    if (logoRef.current) {
      logoRef.current.value = "";
    }
    setLogoImage(null);
  };

  const handleLogoImageClick = () => {
    logoRef.current?.click();
  };

  const upload = "업로드";
  const del = "삭제";

  console.log(backgroundImage);

  return (
    <div css={container}>
      <div
        className="preview"
        css={(theme) => preview_container(theme, backgroundImage)}
      ></div>
      <form className="form" css={file_form_container}>
        <div css={file_input_container}>
          <label
            htmlFor="logoImage"
            onClick={logoImage ? handleLogoImageDelete : handleLogoImageClick}
            css={label}
          >
            로고
          </label>
          <input
            type="file"
            name="logoImage"
            id="logoImage"
            accept="image/*"
            ref={logoRef}
            onChange={handleLogoImageChange}
            css={display_none}
          />
          <button
            type="button"
            onClick={logoImage ? handleLogoImageDelete : handleLogoImageClick}
            css={image_upload_button}
          >
            {logoImage ? <Delete /> : <Image />}
            <p>로고 이미지 {logoImage ? del : upload}</p>
          </button>
        </div>
        <div css={file_input_container}>
          <label
            htmlFor="backgroundImage"
            onClick={
              backgroundImage
                ? handleBackgroundImageDelete
                : handleBackgroundImageClick
            }
            css={label}
          >
            사진
          </label>
          <input
            type="file"
            name="backgroundImage"
            id="backgroundImage"
            accept="image/*"
            ref={backgroundRef}
            onChange={handleBackgroundImageChange}
            css={display_none}
          />
          <button
            type="button"
            onClick={
              backgroundImage
                ? handleBackgroundImageDelete
                : handleBackgroundImageClick
            }
            css={image_upload_button}
          >
            {backgroundImage ? <Delete /> : <Image />}
            <p>배경 이미지 {backgroundImage ? del : upload}</p>
          </button>
        </div>
      </form>
      <form className="form" css={text_form_container}>
        <div css={text_input_container}>
          <label htmlFor="title" css={label}>
            제목
          </label>
          <input type="text" name="title" id="title" css={text_input} />
        </div>
        <div css={textarea_input_container}>
          <label htmlFor="desc" css={label}>
            설명
          </label>
          <textarea name="desc" id="desc" css={textarea_input} />
        </div>
      </form>
    </div>
  );
}

const display_none = css`
  display: none;
`;

const container = (theme: any) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const preview_container = (theme: any, backgroundImage: string | null) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: ${theme.padding.xl};

  width: 100%;
  aspect-ratio: 4/5;
  border-radius: ${theme.borderRadius.sm};

  background-color: ${theme.colors.bg};
  background-image: ${backgroundImage ? `url(${backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
`;

const text_form_container = (theme: any) => css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  padding: ${theme.padding.md};
  border-radius: ${theme.borderRadius.sm};

  background-color: ${theme.colors.bt};
`;
const file_form_container = (theme: any) => css`
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  gap: 1rem;

  width: fit-content;
  padding: ${theme.padding.md} ${theme.padding.lg};
  border-radius: ${theme.borderRadius.xl};

  background-color: ${theme.colors.bt};
`;

const file_input_container = (theme: any) =>
  css`
    display: flex;
    gap: 1rem;
    align-items: center;
  `;

const text_input_container = (theme: any) => css`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  input {
    width: 100%;
  }
`;

const textarea_input_container = (theme: any) => css`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  textarea {
    width: 100%;
  }
`;

const label = (theme: any) => css`
  color: ${theme.colors.wh};
  font-size: ${theme.fontSize.md};
  white-space: nowrap;
`;

const text_input = (theme: any) => css`
  height: 3rem;

  border: none;
  border-radius: ${theme.borderRadius.xs};
`;
const textarea_input = (theme: any) => css`
  height: 6rem;

  border: none;
  border-radius: ${theme.borderRadius.xs};
`;

const image_upload_button = (theme: any) => css`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: ${theme.padding.xs};
  background-color: ${theme.colors.wt};
  border-radius: ${theme.borderRadius.sm};

  svg {
    width: 1rem;
    height: 1rem;
  }

  p {
    font-family: "Pretendard", sans-serif;
  }
`;
