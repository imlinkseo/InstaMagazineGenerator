export const useIsDone = () => {
  const handleIsContentDone = (template: TTemplate, content: Tcontent) => {
    switch (template) {
      case "front":
        return content.title !== null;
      case "back":
        return content.desc !== null;
      case "content":
        return content.title && content.desc ? true : false;
      default:
        return content.title && content.desc ? true : false;
    }
  };

  const handleIsAllDone = (
    content: Tcontent,
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
