import { marked } from "marked";

export const Preview = (props) => {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, {
          renderer: marked.Renderer(props.markdown)
        })
      }}
    />
  );
};
