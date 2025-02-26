/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { RefObject, SetStateAction, useMemo } from "react";
import { InfoText } from "@components/ui/text/Text";
import { ConfirmModal } from "@components/ui/modal/Modal";
import { ButtonRound } from "@components/ui/button/Button";
import { useIsDone } from "@hooks/useIsDone";
import { InputTextArea, InputFile, InputText } from "@components/ui/form/Input";
import { ReactComponent as Plus } from "@svgs/plus.svg";
import { ReactComponent as Minus } from "@svgs/minus.svg";

interface IForm {
  template: TTemplate;
  contentTemplate: TContentTemplate;
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
  content: TContent<TTemplate, TContentTemplate>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  handleTitleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleDescChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleLocationChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelContent: () => void;
  handleSaveContent: () => void;
}

export function Generator(prop: IForm) {
  const {
    template,
    contentTemplate,
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
    handleLocationChange,
    handleTagChange,
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
  const location_ = "location";
  const location_placeholder = "fill location!";
  const tag_ = "tag";
  const tag_placeholder = "fill tag!";
  const accept_ = `image/*`;
  const confirm_ = "save";
  const cancel = "delete";
  const info_ = "fill";

  const renderFrontTemplateContent = useMemo(() => {
    if (
      template !== "front" ||
      handleTitleChange === undefined ||
      content === null ||
      !("title" in content)
    )
      return null;

    return (
      <InputTextArea
        name={title_}
        id={title_}
        placeholder={title_placeholder}
        value={content.title ?? ""}
        onChange={handleTitleChange}
      />
    );
  }, [template, content]);

  const renderContentTemplateContent = useMemo(() => {
    if (template !== "content" || contentTemplate === null || content === null)
      return null;

    return (
      <>
        {handleTitleChange && "title" in content && (
          <InputTextArea
            name={title_}
            id={title_}
            placeholder={title_placeholder}
            value={content.title ?? ""}
            onChange={handleTitleChange}
          />
        )}
        {contentTemplate === "location" &&
          handleLocationChange &&
          "location" in content && (
            <InputText
              name={location_}
              id={location_}
              placeholder={location_placeholder}
              value={content.location ?? ""}
              onChange={handleLocationChange}
            />
          )}
        {contentTemplate === "tag" && handleTagChange && "tag" in content && (
          <InputText
            name={tag_}
            id={tag_}
            placeholder={tag_placeholder}
            value={content.tag ?? ""}
            onChange={handleTagChange}
          />
        )}
        {handleDescChange && "desc" in content && (
          <InputTextArea
            name={desc_}
            id={desc_}
            placeholder={desc_placeholder}
            value={content.desc ?? ""}
            onChange={handleDescChange}
          />
        )}
      </>
    );
  }, [contentTemplate, template, content]);

  const renderBackTemplateContent = useMemo(() => {
    if (
      template !== "back" ||
      handleDescChange === undefined ||
      content === null ||
      !("desc" in content)
    )
      return null;

    return (
      <InputTextArea
        name={desc_}
        id={desc_}
        placeholder={desc_placeholder}
        value={content.desc ?? ""}
        onChange={handleDescChange}
      />
    );
  }, [template, content]);

  const { handleIsContentDone } = useIsDone();
  const isContentDone = useMemo(() => {
    return handleIsContentDone(template, contentTemplate, content);
  }, [template, contentTemplate, content]);

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
        isDone={logo !== null && image !== null && isContentDone}
      />
      {template !== "content" && (
        <>
          <ButtonRound
            text={logo_}
            icon={logo ? <Minus /> : <Plus />}
            isAvailable={logo !== null}
            onClick={handleLogoClick}
          />
          <InputFile
            name={logo_}
            id={logo_}
            accept={accept_}
            ref={logoRef}
            onChange={handleLogoChange}
          />
        </>
      )}
      <ButtonRound
        text={image_}
        icon={image ? <Minus /> : <Plus />}
        isAvailable={image !== null}
        onClick={handleImageClick}
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
        icon={isContentDone ? <Minus /> : <Plus />}
        isAvailable={isContentDone}
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
        {template === "front" && renderFrontTemplateContent}
        {template === "content" && renderContentTemplateContent}
        {template === "back" && renderBackTemplateContent}
      </ConfirmModal>
    </form>
  );
}
