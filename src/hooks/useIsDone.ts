export const useIsDone = () => {
  const handleIsContentDone = (template: TTemplate, content: TContent) => {
    if (!content) return false;

    switch (template) {
      case "front":
        if ("title" in content) {
          return content?.title !== null;
        } else {
          return false;
        }

      case "back":
        if ("desc" in content) {
          return content?.desc !== null;
        } else {
          return false;
        }
      case "content":
        if ("title" in content && "desc" in content) {
          return content?.desc !== null && content?.title !== null;
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  const handleIsAllDone = (
    content: TContent,
    template: TTemplate,
    logo: string | null,
    image: string | null
  ) => {
    if (template) {
      const isContentDone = handleIsContentDone(template, content);
      if (template === "content") {
        if (isContentDone && image) {
          return true;
        } else {
          return false;
        }
      } else {
        if (isContentDone && template && logo && image) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  return { handleIsContentDone, handleIsAllDone };
};
