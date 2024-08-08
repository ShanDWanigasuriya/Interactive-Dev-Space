import "./CreateDevSpaceModal.scss";
import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { DevSpaceContext } from "../DevSpaceProviders";

export const UpdateFolderTitleModal = () => {
  const modalFeatures = useContext(ModalContext);
  const { editFolderTitle } = useContext(DevSpaceContext);

  const closeModal = () => {
    modalFeatures.closeModal();
  };
  const onSubmitModal = (e) => {
    e.preventDefault();
    // console.log(e.target?.folderName?.value);
    const folderName = e.target.folderName.value;
    console.log({ folderName });

    editFolderTitle(folderName, modalFeatures.modalPayload);
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
        <button className="modal-heading">Update Folder Name</button>
        <div className="item">
          <span>Enter Folder Name</span>
          <input name="folderName" required placeholder="Enter Folder Name" />
        </div>

        <div className="item" style={styles.updateFolderBtn}>
          <button type="submit">Update Folder</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  updateFolderBtn: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
  },
  mainContainer: {
    gap: 20,
  },
};
