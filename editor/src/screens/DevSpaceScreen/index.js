import { useParams } from "react-router-dom";
import "./index.scss";
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { makeSubmission } from "./service";

export const DevSpaceScreen = () => {
  const params = useParams();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const { folderId, fileId } = params;

  const showTryAgainToast = () => {
    toast.error("Invalid file type", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const showEmptyOutputToast = () => {
    toast.error("Output is Empty", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };

  const importInputs = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        setInput(e.target.result);
      };
    } else {
      showTryAgainToast(); // Show toast message if file is not of type text
    }
  };

  const exportOutput = (e) => {
    const outPutValue = output.trim();
    if (!outPutValue) {
      showEmptyOutputToast();
      return;
    }

    const blob = new Blob([outPutValue], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `output.txt`;
    link.click();
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleOutputChange = (e) => {
    setOutput(e.target.value);
  };

  const callback = ({ apiStatus, data, message }) => {
    if (apiStatus === "loading") {
      setShowLoader(true);
    } else if (apiStatus === "error") {
      setShowLoader(false);
      setOutput("Something Went Wrong");
    } else {
      setShowLoader(false);
      //apiStatus === success
      if (data.status.id === 3) {
        setOutput(atob(data.stdout));
      } else {
        setShowLoader(false);

        setOutput(atob(data.stderr));
        // console.log(data.status.description);
      }
    }
  };

  const runCode = useCallback(
    ({ code, language }) => {
      makeSubmission({ code, language, callback, stdin: input });
    },
    [input]
  );

  return (
    <div className="devspace-container">
      <div className="header-container">
        <img src="/logo.jpg" alt="Logo" />
      </div>
      <div className="bottom-container">
        <div className="editor-container">
          <EditorContainer
            // file_title={file_title}
            fileId={fileId}
            folderId={folderId}
            runCode={runCode}
          />
        </div>
        <div className="utility-container">
          <div className="input-console-container">
            <div className="input-console-header">
              <div>
                <button className="utility-name">Inputs</button>
              </div>
              <label htmlFor="input-file" className="icon-container">
                <span className="material-icons">cloud_download</span>
                <button>Import Inputs</button>
              </label>
              <input
                type="file"
                style={{ display: "none" }}
                id="input-file"
                onChange={importInputs}
              />
            </div>
            <textarea value={input} onChange={handleInputChange}></textarea>
          </div>
          <div className="input-console-container">
            <div className="input-console-header">
              <div>
                <button className="utility-name">Console</button>
              </div>
              <div className="icon-container" onClick={exportOutput}>
                <span className="material-icons">cloud_upload</span>
                <button>Export Outputs</button>
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              onChange={handleOutputChange}
            ></textarea>
          </div>
        </div>
      </div>
      {showLoader && (
        <div className="fullpage-loader">
          <div className="loader"></div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
