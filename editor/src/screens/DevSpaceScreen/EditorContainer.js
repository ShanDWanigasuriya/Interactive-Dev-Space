import { useState, useEffect } from "react";
import "./EditorContainer.scss";
import Editor, { loader } from "@monaco-editor/react";
import nightOwl from "monaco-themes/themes/Night Owl.json";
import oceanicNext from "monaco-themes/themes/Oceanic Next.json";
import githubDark from "monaco-themes/themes/GitHub Dark.json";
import monokai from "monaco-themes/themes/Monokai.json";
import tomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import nord from "monaco-themes/themes/Nord.json";
import cobalt2 from "monaco-themes/themes/Cobalt2.json";

const editorOptions = {
  wordWrap: "on",
  fontSize: 14,
};

export const EditorContainer = () => {
  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("night-owl");

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("night-owl", nightOwl);
      monaco.editor.defineTheme("oceanic-next", oceanicNext);
      monaco.editor.defineTheme("github-dark", githubDark);
      monaco.editor.defineTheme("monokai", monokai);
      monaco.editor.defineTheme("tomorrow-night-blue", tomorrowNightBlue);
      monaco.editor.defineTheme("nord", nord);
      monaco.editor.defineTheme("cobalt2", cobalt2);
    });
  }, []);

  const onChangeLanguage = (e) => {
    setLanguage(e.target.value.toLowerCase());
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="root-editor-container">
      <div className="editor-header">
        <div className="left-header-container">
          <button className="file-name-container">
            {"FileName.Extension"}
          </button>
        </div>
        <div className="right-header-container">
          <select
            className="language-set"
            onChange={onChangeLanguage}
            value={language}
          >
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="python">Python</option>
          </select>
          <select className="theme-set" onChange={onChangeTheme} value={theme}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs">vs</option>
            <option value="hc-black">hc-black</option>
            <option value="night-owl">Night Owl</option>
            <option value="oceanic-next">Oceanic Next</option>
            <option value="github-dark">GitHub Dark</option>
            <option value="monokai">Monokai</option>
            <option value="tomorrow-night-blue">Tomorrow Night Blue</option>
            <option value="nord">Nord</option>
            <option value="cobalt2">Cobalt2</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          key={`${language}-${theme}`}
          height="100%"
          language={language}
          options={editorOptions}
          theme={theme}
        />
      </div>
      <div className="editor-footer">
        <button className="footer-btn-fullScreen">
          <span className="material-icons">fullscreen</span>
          <span>Full Screen</span>
        </button>
        <button className="footer-btn-import">
          <label htmlFor="input" className="icon-container">
            <span className="material-icons">cloud_upload</span>
            <span>Import Code</span>
          </label>
        </button>
        <input type="file" style={{ display: "none" }} id="input" />

        <button className="footer-btn-export">
          <span className="material-icons">cloud_download</span>
          <span>Export Code</span>
        </button>

        <button className="footer-btn-run">
          <span className="material-icons">play_arrow</span>
          <span>Run Code</span>
        </button>

        <button className="footer-btn-save">
          <span className="material-icons">save</span>
          <span>Save Code</span>
        </button>
      </div>
    </div>
  );
};
