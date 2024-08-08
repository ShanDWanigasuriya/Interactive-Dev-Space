import { useParams } from "react-router-dom";
import "./index.scss";
import { EditorContainer } from "./EditorContainer";

export const DevSpaceScreen = () => {
  const params = useParams();
  const { folderId, fileId } = params;

  return (
    <div className="devspace-container">
      <div className="header-container">header</div>
      <div className="bottom-container">
        <div className="editor-container">
          <EditorContainer />
        </div>
        <div className="utility-container">
          <div className="input-console-container">
            <div className="input-console-header">
              <div>
                <button className="utility-name">Input</button>
              </div>
              <label htmlFor="input" className="icon-container">
                <span className="material-icons">cloud_upload</span>
                <button>Import Inputs</button>
              </label>
              <input type="file" style={{ display: "none" }} id="input" />
            </div>
            <textarea />
          </div>
          <div className="input-console-container">
            <div className="input-console-header">
              <div>
                <button className="utility-name">Console</button>
              </div>
              <div className="icon-container">
                <span className="material-icons">cloud_download</span>
                <button>Export Outputs</button>
              </div>
            </div>
            <textarea readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};
