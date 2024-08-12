import "./CreateDevSpaceModal.scss";
import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { DevSpaceContext } from "../DevSpaceProviders";

export const UpdateFileTitleModal = () => {
  const modalFeatures = useContext(ModalContext);
  const { editFileTitle } = useContext(DevSpaceContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };
  const onSubmitModal = (e) => {
    e.preventDefault();
    // console.log(e.target?.folderName?.value);
    const fileName = e.target.fileName.value;
    console.log({ fileName });

    editFileTitle(
      fileName,
      modalFeatures.modalPayload.folderId,
      modalFeatures.modalPayload.fileId
    );
    // console.log(fileName);
    closeModal();
  };

  return (
    <div className="modal-container">
      <form
        className="modal-body"
        style={styles.mainContainer}
        onSubmit={onSubmitModal}
      >
        <span className="material-icons close" onClick={closeModal}>
          close
        </span>
        {/* <button className="modal-heading">Update File Name</button> */}
        <div className="folder-creation">
          <div className="item">
            {/* <span>Enter File Name</span> */}
            <input name="fileName" required placeholder="Enter New File Name" />
          </div>

          <div className="item" style={styles.updateFileBtn}>
            <button type="submit">Update File</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  updateFileBtn: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  mainContainer: {
    gap: 20,
  },
};
