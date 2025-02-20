/** @jsxImportSource @emotion/react */
import { CustomTheme } from "src/theme";
import { css, useTheme } from "@emotion/react";
import { SetStateAction } from "react";

interface IModal {
  children?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function Modal(prop: IModal) {
  const { children, isOpen, setIsOpen } = prop;

  const handleModalOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleStepPropagation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const theme = useTheme() as CustomTheme;

  const modal_bg = (theme: CustomTheme, isOpen: boolean) => css`
    display: ${isOpen ? "block" : "none"};

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    margin: 0 auto;
    max-width: ${theme.maxWidth};

    background-color: rgba(0, 0, 0, 0.2);
  `;

  const modal = (theme: CustomTheme, isOpen: boolean) => css`
    display: ${isOpen ? "flex" : "none"};
    flex-direction: column;
    gap: 1rem;

    max-width: calc(720px - 100px);
    min-width: 200px;
    width: calc(100% - 100px);
    border-radius: ${theme.borderRadius.lg};
    padding: ${theme.padding.md};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    background-color: ${theme.colors.wh};
  `;

  return (
    <div css={modal_bg(theme, isOpen)} onClick={handleModalOpen}>
      <div css={modal(theme, isOpen)} onClick={handleStepPropagation}>
        {children}
      </div>
    </div>
  );
}

interface ConfirmModal extends IModal {
  confirmText: string;
  onConfirm: () => void;
  cancelText: string;
  onCancel: () => void;
}

export function ConfirmModal(prop: ConfirmModal) {
  const {
    confirmText,
    onConfirm,
    cancelText,
    onCancel,
    isOpen,
    setIsOpen,
    children,
  } = prop;

  const button_container = (theme: CustomTheme) => css`
    width: 100%;
    display: flex;
    gap: 1rem;
  `;

  const modal_button = (theme: CustomTheme) => css`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    padding: ${theme.padding.sm};
    border-radius: ${theme.borderRadius.xl};

    transition: 0.3s ease-in-out;

    font-size: ${theme.fontSize.ml};
    font-family: "Lexend", serif;
    text-transform: uppercase;
  `;

  const modal_button_bg_cancel = (theme: CustomTheme) => css`
    background-color: ${theme.colors.b2};
  `;
  const modal_button_bg_confirm = (theme: CustomTheme) => css`
    background-color: ${theme.colors.pc};
  `;

  const theme = useTheme() as CustomTheme;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {children}
      <div css={button_container(theme)}>
        <button
          css={[modal_button(theme), modal_button_bg_cancel(theme)]}
          onClick={onCancel}
        >
          {cancelText}
        </button>
        <button
          css={[modal_button(theme), modal_button_bg_confirm(theme)]}
          onClick={onConfirm}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
