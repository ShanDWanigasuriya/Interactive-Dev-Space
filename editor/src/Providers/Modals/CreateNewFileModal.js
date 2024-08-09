import { useContext } from "react";
import "./CreateDevSpaceModal.scss";
import { ModalContext } from "../ModalProvider";
import { defaultCodes, DevSpaceContext } from "../DevSpaceProviders";
import { v4 } from "uuid";

export const CreateNewFileModal = () => {
  const modalFeatures = useContext(ModalContext);
  const devSpaceFeatures = useContext(DevSpaceContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };
  const onSubmitModal = (e) => {
    e.preventDefault();

    const fileName = e.target.fileName.value;
    const language = e.target.language.value;

    const file = {
      id: v4(),
      file_title: fileName,
      language,
      code_snippet: defaultCodes[language],
    };

    devSpaceFeatures.createNewFile(modalFeatures.modalPayload, file);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        <button className="modal-heading">Create New File</button>
        <div className="item">
          <span>Enter File Name</span>
          <input name="fileName" required />
        </div>
        <div className="item">
          <select name="language" required>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="python">Python</option>
          </select>
          <button type="submit">Create File</button>
        </div>
      </form>
    </div>
  );
};
