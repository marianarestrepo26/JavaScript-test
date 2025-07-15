const URL = "http://localhost:3000";

const HEADERS = { "Content-Type": "application/json" };

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`Ocurrio un error al procesar la petición.`);
  }
  return response;
}

export const getData = async (ENDPOINT) => {
  return fetch(`${URL}/${ENDPOINT}`)
    .then(checkResponse)  
    .then(response => response.json());
  };
  console.log(getData);

export const createData = async (ENDPOINT, data) => {
  return fetch(`${URL}/${ENDPOINT}`, {
    headers : HEADERS,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
}

export const updateData = async (ENDPOINT, data, id) => {
  return fetch(`${URL}/${ENDPOINT}/${id}`, {
    headers : HEADERS,
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
};

export const patchData = async (ENDPOINT, data, id) => {
  return fetch(`${URL}/${ENDPOINT}/${id}`, {
    headers : HEADERS,
    method: 'PATCH',
    body: JSON.stringify(data)
  }).then(checkResponse)
    .then(response => response.json());
};

export const deleteData = async (ENDPOINT, id) => {
  return fetch(`${URL}/${ENDPOINT}/${id}`, {
    method: 'DELETE',
  }).then(checkResponse)
    .then(response => response.json());
};