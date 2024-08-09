const languageCodeMap = {
  java: 91,
  javascript: 93,
  cpp: 54,
  c: 50,
  csharp: 51,
  python: 92,
};

async function getSubmission(tokenId, callback) {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": "7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    callback({
      apiStatus: "error",
      message: JSON.stringify(error),
    });
  }
}

export async function makeSubmission({ code, language, callback, stdin }) {
  //make submission & handle the status of the submission
  const url =
    "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "application/json",
      "x-rapidapi-key": "7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
    body: JSON.stringify({
      language_id: languageCodeMap[language],
      source_code: btoa(code),
      stdin: btoa(stdin),
    }),
  };

  /*
  generic response from this function
  {
    apiStatus: 'loading', 'error', 'success'
    data: response,
    message: 'Runtime error', 'Compilation error'
  }
  */

  try {
    callback({ apiStatus: "loading" });
    const response = await fetch(url, options);
    const result = await response.json();
    const tokenId = result.token;
    let apiSubmissionResult;

    let statusCode = 1;
    while (statusCode === 1 || statusCode === 2) {
      try {
        apiSubmissionResult = await getSubmission(tokenId);
        statusCode = apiSubmissionResult.status.id;
      } catch (error) {
        callback({
          apiStatus: "error",
          message: JSON.stringify(error),
        });
        return;
      }
    }

    if (apiSubmissionResult) {
      callback({
        apiStatus: "success",
        data: apiSubmissionResult,
      });
    }
  } catch (error) {
    callback({
      apiStatus: "error",
      message: JSON.stringify(error),
    });
  }
}
