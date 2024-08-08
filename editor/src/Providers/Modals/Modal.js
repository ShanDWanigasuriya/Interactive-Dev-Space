import { useContext } from "react";
import { modalConstants, ModalContext } from "../ModalProvider";
import { CreateDevSpaceModal } from "./CreateDevSpaceModal";
import { CreateNewFolderModal } from "./CreateNewFolderModal";
import { UpdateFolderTitleModal } from "./UpdateFolderTitleModal";
import { UpdateFileTitleModal } from "./UpdateFileTitleModal";
import { CreateNewFileModal } from "./CreateNewFileModal";

export const Modal = () => {
  const modalFeatures = useContext(ModalContext);
  console.log(modalFeatures.activeModal);

  return (
    <>
      {modalFeatures.activeModal === modalConstants.CREATE_DEVSPACE && (
        <CreateDevSpaceModal />
      )}
      {modalFeatures.activeModal === modalConstants.CREATE_FOLDER && (
        <CreateNewFolderModal />
      )}
      {modalFeatures.activeModal === modalConstants.UPDATE_FOLDER_TITLE && (
        <UpdateFolderTitleModal />
      )}
      {modalFeatures.activeModal === modalConstants.UPDATE_FILE_TITLE && (
        <UpdateFileTitleModal />
      )}
      {modalFeatures.activeModal === modalConstants.CREATE_FILE && (
        <CreateNewFileModal />
      )}
    </>
  );
};
