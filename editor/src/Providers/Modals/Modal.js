import { useContext } from "react";
import { ModalContext } from "../ModalProvider";
import { CreateDevSpaceModal } from "./CreateDevSpaceModal";

export const Modal = () => {
  const modalFeatures = useContext(ModalContext);
  console.log(modalFeatures.activeModal);

  return (
    <>
      {modalFeatures.activeModal === "CREATE_DEVSPACE" && (
        <CreateDevSpaceModal />
      )}
    </>
  );
};
