import { useState, useEffect, useRef, useContext } from "react";
import "./EditorContainer.scss";
import Editor, { loader } from "@monaco-editor/react";
import nightOwl from "monaco-themes/themes/Night Owl.json";
import oceanicNext from "monaco-themes/themes/Oceanic Next.json";
import githubDark from "monaco-themes/themes/GitHub Dark.json";
import monokai from "monaco-themes/themes/Monokai.json";
import tomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import nord from "monaco-themes/themes/Nord.json";
import cobalt2 from "monaco-themes/themes/Cobalt2.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DevSpaceContext } from "../../Providers/DevSpaceProviders";

const editorOptions = {
  wordWrap: "on",
  fontSize: 16,
};

const fileExtensionsMapping = {
  java: "java",
  javascript: "js",
  python: "py",
  cpp: "cpp",
  c: "c",
  csharp: "cs",
};

export const EditorContainer = ({ fileId, folderId, runCode }) => {
  const { getDefaultCode, getLanguage, updateLanguage, saveCode } =
    useContext(DevSpaceContext);
  const [theme, setTheme] = useState("night-owl");

  const [language, setLanguage] = useState(() => {
    return getLanguage(fileId, folderId);
  });

  const [code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  const codeRef = useRef(code);

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
    updateLanguage(fileId, folderId, e.target.value);
    const newCode = getDefaultCode(fileId, folderId);
    setCode(newCode);
    codeRef.current = newCode;
    setLanguage(e.target.value);
  };

  const onChangeTheme = (e) => {
    setTheme(e.target.value);
  };

  const onChangeCode = (newCode) => {
    codeRef.current = newCode;
  };

  const showTryAgainToast = () => {
    toast.error("Try again with a program file", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const importCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
      };
    } else {
      showTryAgainToast(); // Show toast message if file is not of type text
    }
  };

  const showEmptyCodeToast = () => {
    toast.error("There is nothing to export", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const exportCode = () => {
    const codeValue = codeRef.current?.trim();
    if (!codeValue) {
      showEmptyCodeToast();
    } else {
      //Create a blob/instant file in the memory
      const codeBlob = new Blob([codeValue], { type: "text/plain" });

      //Create the downloadable URL with blob data
      const downloadUrl = URL.createObjectURL(codeBlob);

      //Create a clickable link to download the blob/file
      const link = document.createElement("a");
      link.href = downloadUrl;

      link.download = `code.${fileExtensionsMapping[language]}`;
      link.click();
    }
  };

  const showCodeSaveToast = () => {
    toast.success("Code Saved Succesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const onSaveCode = () => {
    saveCode(fileId, folderId, codeRef.current);

    //without timeout it gives error
    setTimeout(() => {
      showCodeSaveToast();
    }, 0); // Delay can be adjusted as needed
  };

  const onRunCode = () => {
    runCode({
      code: codeRef.current,
      language,
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="root-editor-container">
      <div className="editor-header">
        <div className="left-header-container">
          <button className="file-name-container">
            {"Code"}.{fileExtensionsMapping[language]}
          </button>
        </div>
        <div className="right-header-container">
          <select
            className="language-set"
            onChange={onChangeLanguage}
            value={language}
          >
            <option value="java">Java (JDK 17.0.6)</option>
            <option value="javascript">JavaScript (Node.js 18.15.0)</option>
            <option value="cpp">C++ (GCC 9.2.0)</option>
            <option value="c">C (GCC 9.2.0)</option>
            <option value="csharp">C# (Mono 6.6.0.161)</option>
            <option value="python">Python (3.11.2)</option>
          </select>
          <select className="theme-set" onChange={onChangeTheme} value={theme}>
            <option value="night-owl">Night Owl</option>
            <option value="vs-dark">vs-dark</option>
            <option value="vs">vs</option>
            <option value="vs-light">vs-light</option>
            <option value="hc-black">hc-black</option>
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
          onChange={onChangeCode}
          value={code}
        />
      </div>
      <div className="editor-footer">
        <button className="footer-btn-fullScreen" onClick={toggleFullscreen}>
          <span className="material-icons">
            {isFullscreen ? "fullscreen_exit" : "fullscreen"}
          </span>
          <span>{isFullscreen ? "Minimize" : "Full Screen"}</span>
        </button>
        <button className="footer-btn-import">
          <label htmlFor="input" className="icon-container">
            <span className="material-icons">cloud_download</span>
            <span>Import Code</span>
          </label>
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          id="input"
          onChange={importCode}
        />

        <button className="footer-btn-export" onClick={exportCode}>
          <span className="material-icons">cloud_upload</span>
          <span>Export Code</span>
        </button>

        <button className="footer-btn-run" onClick={onRunCode}>
          <span className="material-icons">play_arrow</span>
          <span>Run Code</span>
        </button>

        <button className="footer-btn-save" onClick={onSaveCode}>
          <span className="material-icons">save</span>
          <span>Save Code</span>
        </button>
      </div>

      {/* Add ToastContainer here */}
      <ToastContainer />
    </div>
  );
};
