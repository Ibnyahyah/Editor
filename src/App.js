import "./styles.scss";
import { marked } from "marked";
import { Preview } from "./Preview";
import { Editor } from "./Editor";
import { ToolsBar } from "./Toolbar";
import { useEffect, useState } from "react";

// Set options
// `highlight` example uses https://highlightjs.org
export default function App() {
  const [markdown, setMarkDown] = useState("");

  const placeholder = `##Hello World`;
  // marked.setOptions({
  //   breaks: true,
  //   highlight: function (code) {
  //     return Prism.highlight(code, Prism.language, "javascript");
  //   }
  // });
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const hljs = require("highlight.js");
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });

  function HandleChange(e) {
    setMarkDown(e.target.value);
  }

  useEffect(() => {
    setMarkDown(placeholder);
  }, [placeholder]);

  return (
    <div className="app-container">
      <div className="header">Editor And Previewer</div>
      <div className="editor">
        <ToolsBar text="Editor" />
        <Editor
          onChange={HandleChange}
          placeholder={placeholder}
          markdown={markdown}
        />
      </div>
      <div className="preview">
        <ToolsBar text="Preview" />
        <Preview markdown={markdown} />
      </div>
    </div>
  );
}
