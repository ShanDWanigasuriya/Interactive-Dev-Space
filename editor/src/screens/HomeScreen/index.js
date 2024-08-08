import { useContext } from "react";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss";
import { RightComponent } from "./RightComponent";
import { modalConstants, ModalContext } from "../../Providers/ModalProvider";

export const HomeScreen = () => {
  const modalFeatures = useContext(ModalContext);
  const openCreateDevSpaceModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_DEVSPACE);
  };

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="items-container">
          <img src="logo.jpg" />
          <h1>DevSpark</h1>
          <h2>Code.Compile.Debug</h2>
          <button onClick={openCreateDevSpaceModal}>
            <span className="material-icons">add</span>
            <span>Create a Dev_Space</span>
          </button>
        </div>
      </div>
      <RightComponent />
      <Modal />
    </div>
  );
};
