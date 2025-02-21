export {};

declare global {
  type Tcontent = {
    title: string | null;
    desc: string | null;
  };
  type TTemplate = "front" | "content" | "back" | null;
}
