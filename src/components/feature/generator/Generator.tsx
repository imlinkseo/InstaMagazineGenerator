/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { RefObject, SetStateAction } from "react";
import { InfoText } from "@components/ui/text/Text";
import { ConfirmModal } from "@components/ui/modal/Modal";
import { ButtonRound } from "@components/ui/button/Button";
import { TTemplate } from "@components/feature/template/Template";
import { useIsDone } from "@hooks/useIsDone";
import { InputText, InputTextArea, InputFile } from "@components/ui/form/Input";
import { ReactComponent as Plus } from "@svgs/plus.svg";
import { ReactComponent as Minus } from "@svgs/minus.svg";

export type Tcontent = {
  title: string | null;
  desc: string | null;
};

interface IForm {
  template: TTemplate;
  logo: string | null;
  handleLogoClick: () => void;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogoDelete: () => void;
  logoRef: RefObject<HTMLInputElement>;
  image: string | null;
  handleImageClick: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageDelete: () => void;
  imageRef: RefObject<HTMLInputElement>;
  content: Tcontent;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  handleTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCancelContent: () => void;
  handleSaveContent: () => void;
}

export function Generator(prop: IForm) {
  const {
    template,
    logo,
    handleLogoClick,
    handleLogoChange,
    handleLogoDelete,
    logoRef,
    image,
    handleImageClick,
    handleImageChange,
    handleImageDelete,
    imageRef,
    content,
    isModalOpen,
    setIsModalOpen,
    handleTitleChange,
    handleDescChange,
    handleCancelContent,
    handleSaveContent,
  } = prop;

  const logo_ = "logo";
  const image_ = "image";
  const content_ = "content";
  const title_ = "title";
  const title_placeholder = "fill title!";
  const desc_ = "desc";
  const desc_placeholder = "fill description!";
  const accept_ = `image/*`;
  const confirm_ = "save";
  const cancel = "delete";
  const info_ = "fill";

  const { handleIsContentDone } = useIsDone();

  const form = (theme: CustomTheme) => css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    padding: ${theme.padding.xs} ${theme.padding.sm};
    background-color: ${theme.colors.wh};
    border-bottom: 1px solid ${theme.colors.bt};
  `;

  const theme = useTheme() as CustomTheme;

  return (
    <form css={form(theme)}>
      <InfoText
        text={info_}
        isDone={
          logo !== null &&
          image !== null &&
          handleIsContentDone(template, content)
        }
      />
      <ButtonRound
        text={logo_}
        icon={logo ? <Minus /> : <Plus />}
        isAvailable={logo !== null}
        onClick={logo ? handleLogoDelete : handleLogoClick}
      />
      <InputFile
        name={logo_}
        id={logo_}
        accept={accept_}
        ref={logoRef}
        onChange={handleLogoChange}
      />

      <ButtonRound
        text={image_}
        icon={image ? <Minus /> : <Plus />}
        isAvailable={image !== null}
        onClick={image ? handleImageDelete : handleImageClick}
      />
      <InputFile
        name={image_}
        id={image_}
        accept={accept_}
        ref={imageRef}
        onChange={handleImageChange}
      />
      <ButtonRound
        text={content_}
        icon={handleIsContentDone(template, content) ? <Minus /> : <Plus />}
        isAvailable={handleIsContentDone(template, content)}
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        confirmText={confirm_}
        onConfirm={handleSaveContent}
        cancelText={cancel}
        onCancel={handleCancelContent}
      >
        {template === "front cover" && handleTitleChange && (
          <InputText
            name={title_}
            id={title_}
            placeholder={title_placeholder}
            value={content.title ?? ""}
            onChange={handleTitleChange}
          />
        )}
        {template === "content default" &&
          handleTitleChange &&
          handleDescChange && (
            <>
              <InputText
                name={title_}
                id={title_}
                placeholder={title_placeholder}
                value={content.title ?? ""}
                onChange={handleTitleChange}
              />
              <InputTextArea
                name={desc_}
                id={desc_}
                placeholder={desc_placeholder}
                value={content.desc ?? ""}
                onChange={handleDescChange}
              />
            </>
          )}
        {template === "back cover" && handleDescChange && (
          <InputTextArea
            name={desc_}
            id={desc_}
            placeholder={desc_placeholder}
            value={content.desc ?? ""}
            onChange={handleDescChange}
          />
        )}
      </ConfirmModal>
    </form>
  );
}
