let URL_ENDPOINT = "https://mapi.harmoney.dev/api/v1/messages/";

const getAllMessgaes = async () => {
  let headersList = {
    Authorization: "2tioN3If7V6C_bnU",
  };

  let data = await fetch(URL_ENDPOINT, {
    method: "GET",
    headers: headersList,
  });

  return data.json();
};

const postMessage = async (message) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "2tioN3If7V6C_bnU",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    text: message,
  });

  let response = await fetch(URL_ENDPOINT, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  console.log(data);
};

const deleteMessage = async (id) => {
  let headersList = {
    Authorization: "2tioN3If7V6C_bnU",
  };

  await fetch(URL_ENDPOINT + `${id}`, {
    method: "DELETE",
    headers: headersList,
  });

};

export const apiService = {
  getAllMessgaes,
  postMessage,
  deleteMessage,
};
