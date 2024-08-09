import { createContext, useEffect, useState } from "react";
import { v4 } from "uuid";
export const DevSpaceContext = createContext();

const initialData = [
  {
    id: v4(),
    folder_title: "JavaScript",
    files: [
      {
        id: v4(),
        file_title: "JsFundementals",
        language: "javaScript",
        code_snippet: `
            function greet(name) {
                console.log("Hello, " + name + "!");
            }
  
            function add(a, b) {
                return a + b;
            }
  
            greet("World");
  
            let sum = add(5, 7);
            console.log("Sum: " + sum);`,
      },
    ],
  },
];
export const defaultCodes = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
  javascript: `// Define a function to print Hello, World!
function printMessage() {
    const message = "Hello, World!";
    console.log(message);
}

// Call the function
printMessage();
`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin>>a>>b;
    int sum = 0;
    for(int i = a; i <= b; i++){
        sum += i;
    }
    cout << "Sum between a and b is "<< sum;
    return 0;
}
`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}
`,
  csharp: `using System;

class HelloWorld {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}
`,
  python: `# Define a function to print Hello, World!
def print_message():
    message = "Hello, World!"
    print(message)

# Call the function
print_message()
`,
};

export const DevSpaceProviders = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    // Load initial data from localStorage if available
    const savedData = localStorage.getItem("devSpaceData");
    const data = JSON.parse(savedData);
    return savedData ? data : initialData;
  });

  const createNewDevSpace = (newDevSpace) => {
    const { folderName, fileName, language } = newDevSpace;
    const newFolders = [...folders];
    newFolders.push({
      id: v4(),
      folder_title: folderName,
      files: [
        {
          id: v4(),
          file_title: fileName,
          language: language,
          code_snippet: defaultCodes[language],
        },
      ],
    });
    localStorage.setItem("devSpaceData", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const createNewFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      folder_title: folderName,
      files: [],
    };

    const allFolders = [...folders, newFolder];
    localStorage.setItem("devSpaceData", JSON.stringify(allFolders));
    setFolders(allFolders);
  };

  const deleteFolder = (id) => {
    const updateFolderList = folders.filter((folderItem) => {
      return folderItem.id !== id;
    });

    localStorage.setItem("devSpaceData", JSON.stringify(updateFolderList));
    setFolders(updateFolderList);
  };

  const editFolderTitle = (newFolderName, id) => {
    const updatedFoldersList = folders.map((folderItem) => {
      if (folderItem.id === id) {
        folderItem.folder_title = newFolderName;
      }
      return folderItem;
    });
    localStorage.setItem("devSpaceData", JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList);
  };

  const editFileTitle = (newFileName, folderId, fileId) => {
    // console.log(newFileName, folderId, fileId);
    const copiedFolders = [...folders];
    // console.log(copiedFolders);
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        const files = copiedFolders[i].files;
        // console.log(files);
        for (let j = 0; j < files.length; j++) {
          if (files[j].id === fileId) {
            files[j].file_title = newFileName;
            break;
          }
        }
        break;
      }
    }

    localStorage.setItem("devSpaceData", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const deleteFile = (folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        const files = [...copiedFolders[i].files];
        copiedFolders[i].files = files.filter((file) => {
          return file.id !== fileId;
        });
        break;
      }
    }

    localStorage.setItem("devSpaceData", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const createNewFile = (folderId, file) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        copiedFolders[i].files.push(file);
        break;
      }
    }

    localStorage.setItem("devSpaceData", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const getDefaultCode = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.code_snippet;
          }
        }
      }
    }
  };

  const getLanguage = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.language;
          }
        }
      }
    }
  };

  const updateLanguage = (fileId, folderId, language) => {
    const newFolders = [...folders];
    for (let i = 0; i < newFolders.length; i++) {
      if (newFolders[i].id === folderId) {
        for (let j = 0; j < newFolders[i].files.length; j++) {
          const currentFile = newFolders[i].files[j];
          if (fileId === currentFile.id) {
            newFolders[i].files[j].code_snippet = defaultCodes[language];
            newFolders[i].files[j].language = language;
          }
        }
      }
    }
    localStorage.setItem("devSpaceData", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const saveCode = (fileId, folderId, newCode) => {
    const newFolders = [...folders];
    for (let i = 0; i < newFolders.length; i++) {
      if (newFolders[i].id === folderId) {
        for (let j = 0; j < newFolders[i].files.length; j++) {
          const currentFile = newFolders[i].files[j];
          if (fileId === currentFile.id) {
            newFolders[i].files[j].code_snippet = newCode;
          }
        }
      }
    }
    localStorage.setItem("devSpaceData", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  useEffect(() => {
    localStorage.setItem("devSpaceData", JSON.stringify(folders));
  }, []);

  const devSpaceFeatures = {
    folders,
    createNewDevSpace,
    createNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createNewFile,
    getDefaultCode,
    getLanguage,
    updateLanguage,
    saveCode,
  };

  return (
    <DevSpaceContext.Provider value={devSpaceFeatures}>
      {children}
    </DevSpaceContext.Provider>
  );
};
