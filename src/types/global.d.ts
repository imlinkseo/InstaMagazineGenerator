export {};

declare global {
  type TFrontContent = {
    title: string | null;
  };
  type TBackContent = {
    desc: string | null;
  };
  type TContentDefault = {
    title: string | null;
    desc: string | null;
  };
  type TContentLocation = {
    title: string | null;
    desc: string | null;
    location: string | null;
  };
  type TContentTag = {
    title: string | null;
    desc: string | null;
    tag: string | null;
  };
  type TContent =
    | TFrontContent
    | TBackContent
    | TContentDefault
    | TContentLocation
    | TContentTag
    | null;
  type TTemplate = "front" | "content" | "back" | null;
  type TContentTemplate = "default" | "location" | "tag" | null;
}
