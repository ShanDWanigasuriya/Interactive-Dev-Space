import { useContext } from "react";
import "./index.scss";
import { DevSpaceContext } from "../../../Providers/DevSpaceProviders";

const Folder = ({ folderTitle, cards }) => {
  // console.log("Folder component received cards:", cards); // Log cards
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
          <span className="material-icons">delete</span>
          <span className="material-icons">edit</span>
          <div>
            <button className="new-dev-button">
              <span className="material-icons">add</span>
              <span>New Dev_Space</span>
            </button>
          </div>
        </div>
      </div>
      <div className="cards-container">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards?.map((file, index) => {
            let extension = "";
            if (file?.language === "Java") {
              extension = "java";
            } else if (file?.language === "JavaScript") {
              extension = "js";
            } else if (file?.language === "Python") {
              extension = "py";
            } else if (file?.language === "C++") {
              extension = "cpp";
            } else if (file?.language === "C") {
              extension = "c";
            } else if (file?.language === "C#") {
              extension = "cs";
            }

            return (
              <div className="card" key={index}>
                <div className="card-info">
                  <span className="material-icons">code</span>
                  <div>
                    <span>{file?.file_title}</span>
                    <span>.{extension}</span>
                  </div>
                </div>
                <div className="file-info">
                  <span className="material-icons">delete</span>
                  <span className="material-icons">edit</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>No files available</p>
        )}
      </div>
    </div>
  );
};

export const RightComponent = () => {
  const { folders } = useContext(DevSpaceContext);

  return (
    <div className="right-container">
      <div className="header">
        <div className="header-title">
          <span>My</span> Dev_Space
        </div>
        <button className="add-folder">
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
            />
          );
        })
      ) : (
        <p>No folders available</p>
      )}
    </div>
  );
};
