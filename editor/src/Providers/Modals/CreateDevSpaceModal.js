import { useContext } from "react";
import "./CreateDevSpaceModal.scss";
import { ModalContext } from "../ModalProvider";
import { DevSpaceContext } from "../DevSpaceProviders";

export const CreateDevSpaceModal = () => {
  const modalFeatures = useContext(ModalContext);
  const devSpaceFeatures = useContext(DevSpaceContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };
  const onSubmitModal = (e) => {
    e.preventDefault();
    // console.log(e.target?.folderName?.value);
    const folderName = e.target.folderName.value;
    const fileName = e.target.fileName.value;
    const language = e.target.language.value;
    // console.log(folderName, fileName, language);

    devSpaceFeatures.createNewDevSpace({ folderName, fileName, language });
    // console.log(folderName, fileName, language);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form className="modal-body" onSubmit={onSubmitModal}>
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        <button className="modal-heading">Create New Dev_Space</button>
        <div className="item">
          <span>Enter Folder Name</span>
          <input name="folderName" />
        </div>
        <div className="item">
          <span>Enter File Name</span>
          <input name="fileName" />
        </div>
        <div className="item">
          <select name="language">
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="C++">C++</option>
            <option value="C">C</option>
            <option value="C#">C#</option>
            <option value="Python">Python</option>
          </select>
          <button type="submit">Create Dev_Space</button>
        </div>
      </form>
    </div>
  );
};
