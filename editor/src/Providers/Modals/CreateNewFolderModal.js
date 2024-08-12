import "./CreateDevSpaceModal.scss";
import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { DevSpaceContext } from "../DevSpaceProviders";

export const CreateNewFolderModal = () => {
  const modalFeatures = useContext(ModalContext);
  const { createNewFolder } = useContext(DevSpaceContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };
  const onSubmitModal = (e) => {
    e.preventDefault();
    // console.log(e.target?.folderName?.value);
    const folderName = e.target.folderName.value;
    console.log({ folderName });

    createNewFolder(folderName);
    // console.log(folderName);
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
        {/* <button className="modal-heading">Create New Folder</button> */}
        <div className="folder-creation">
          <div className="item">
            {/* <span>Enter Folder Name</span> */}
            <input name="folderName" required placeholder="Enter Folder Name" />
          </div>

          <div className="item" style={styles.createFolderBtn}>
            <button type="submit">Create Folder</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  createFolderBtn: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  mainContainer: {
    gap: 20,
  },
};
