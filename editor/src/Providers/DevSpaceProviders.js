import { createContext, useContext, useEffect, useState } from "react";
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
        language: "JavaScript",
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
const defaultCode = {
  Java: `public class Main {
public static void main(String[] args) {
greet("World");
        
int sum = add(5, 7);
System.out.println("Sum: " + sum);
}
    
public static void greet(String name) {
 System.out.println("Hello, " + name + "!");
}
    
public static int add(int a, int b) {
return a + b;
   }
}
`,
  JavaScript: `function greet(name) {
    console.log("Hello, " + name + "!");
}

function add(a, b) {
    return a + b;
}

greet("World");

let sum = add(5, 7);
console.log("Sum: " + sum);
`,
  "C++": `#include <iostream>

void greet(const std::string &name) {
    std::cout << "Hello, " << name << "!" << std::endl;
}

int add(int a, int b) {
    return a + b;
}

int main() {
    greet("World");

    int sum = add(5, 7);
    std::cout << "Sum: " << sum << std::endl;

    return 0;
}
`,
  C: `#include <stdio.h>

void greet(const char *name) {
    printf("Hello, %s!\n", name);
}

int add(int a, int b) {
    return a + b;
}

int main() {
    greet("World");

    int sum = add(5, 7);
    printf("Sum: %d\n", sum);

    return 0;
}
`,
  "C#": `using System;

class Program {
    static void Main() {
        Greet("World");

        int sum = Add(5, 7);
        Console.WriteLine("Sum: " + sum);
    }

    static void Greet(string name) {
        Console.WriteLine("Hello, " + name + "!");
    }

    static int Add(int a, int b) {
        return a + b;
    }
}
`,
  Python: `def greet(name):
    print(f"Hello, {name}!")

def add(a, b):
    return a + b

if __name__ == "__main__":
    greet("World")
    sum = add(5, 7)
    print("Sum:", sum)
`,
};

export const DevSpaceProviders = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    // Load initial data from localStorage if available
    const savedData = localStorage.getItem("devSpaceData");
    return savedData ? JSON.parse(savedData) : initialData;
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
          code_snippet: defaultCode[language],
        },
      ],
    });
    localStorage.setItem("devSpaceData", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  useEffect(() => {
    localStorage.setItem("devSpaceData", JSON.stringify(folders));
  }, []);

  const devSpaceFeatures = {
    folders,
    createNewDevSpace,
  };

  return (
    <DevSpaceContext.Provider value={devSpaceFeatures}>
      {children}
    </DevSpaceContext.Provider>
  );
};
