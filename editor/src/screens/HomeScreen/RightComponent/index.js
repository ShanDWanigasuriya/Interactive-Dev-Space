import { useContext } from "react";
import "./index.scss";
import { DevSpaceContext } from "../../../Providers/DevSpaceProviders";
import { modalConstants, ModalContext } from "../../../Providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards, folderId }) => {
  // console.log("Folder component received cards:", cards); // Log cards
  const { deleteFolder, deleteFile } = useContext(DevSpaceContext);
  const modalFeatures = useContext(ModalContext);
  const navigate = useNavigate();

  const onDeleteFolder = () => {
    deleteFolder(folderId);
  };
  const onEditFolderTitle = () => {
    modalFeatures.setModalPayload(folderId);
    modalFeatures.openModal(modalConstants.UPDATE_FOLDER_TITLE);
  };

  const openCreateNewFileModal = () => {
    modalFeatures.setModalPayload(folderId);
    modalFeatures.openModal(modalConstants.CREATE_FILE);
  };

  return (
    <div className="folder-container">
      <div className="folder-header">
        <div className="folder-name">
          <span className="material-icons" style={{ color: "#FFCA28" }}>
            folder
          </span>
          <span>{folderTitle}</span>
        </div>
        <div className="edit-delete">
          <span className="material-icons" onClick={onDeleteFolder}>
            delete
          </span>
          <span className="material-icons" onClick={onEditFolderTitle}>
            edit
          </span>
          <div>
            <button className="new-dev-button" onClick={openCreateNewFileModal}>
              <span className="material-icons">add</span>
              <span>New File</span>
            </button>
          </div>
        </div>
      </div>
      <div className="cards-container">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards?.map((file, index) => {
            const onEditFileTitle = () => {
              modalFeatures.setModalPayload({
                fileId: file.id,
                folderId: folderId,
              });
              modalFeatures.openModal(modalConstants.UPDATE_FILE_TITLE);
            };

            const onDeleteFile = () => {
              deleteFile(folderId, file.id);
            };

            let extension = "";
            if (file?.language === "java") {
              extension = "java";
            } else if (file?.language === "javascript") {
              extension = "js";
            } else if (file?.language === "python") {
              extension = "py";
            } else if (file?.language === "cpp") {
              extension = "cpp";
            } else if (file?.language === "c") {
              extension = "c";
            } else if (file?.language === "csharp") {
              extension = "cs";
            }

            const naviageToDevSpaceScreen = () => {
              navigate(`/devSpace/${folderId}/${file.id}`);
            };

            return (
              <div className="card" key={index}>
                <div className="card-info" onClick={naviageToDevSpaceScreen}>
                  <span className="material-icons">code</span>
                  <div>
                    <span>{file?.file_title}</span>
                    <span>.{extension}</span>
                  </div>
                </div>
                <div className="file-info">
                  <span className="material-icons" onClick={onDeleteFile}>
                    delete
                  </span>
                  <span className="material-icons" onClick={onEditFileTitle}>
                    edit
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="noFolder">No files available</p>
        )}
      </div>
    </div>
  );
};

export const RightComponent = () => {
  const { folders } = useContext(DevSpaceContext);
  const modalFeatures = useContext(ModalContext);
  const openCreteNewFolderModal = () => {
    modalFeatures.openModal(modalConstants.CREATE_FOLDER);
  };

  return (
    <div className="right-container">
      <div className="header">
        <div className="header-title">
          <span>My</span> DEV_SPACE
        </div>
        <button className="add-folder" onClick={openCreteNewFolderModal}>
          <span className="material-icons">add</span>
          <span>New Folder</span>
        </button>
      </div>
      {Array.isArray(folders) && folders.length > 0 ? (
        folders.map((folder, index) => {
          return (
            <Folder
              folderTitle={folder?.folder_title}
              cards={folder?.files}
              key={index}
              folderId={folder.id}
            />
          );
        })
      ) : (
        <p className="noFolder">No folders available</p>
      )}
    </div>
  );
};
