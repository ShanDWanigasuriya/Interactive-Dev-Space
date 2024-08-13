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
          <img src="DEVSPARK.png" />
          {/* <h1>DEV_SPARK</h1> */}
          <h2>YOUR INTERACTIVE DEV_SPACE</h2>
          <h2>CODE --&gt; COMPILE --&gt; RUN</h2>
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
