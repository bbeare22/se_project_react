import { checkResponse } from "./checkResponse";

const baseUrl = "http://localhost:3001";

export const fetchClothingItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addClothingItem = ({ name, link, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weather }),
  }).then(checkResponse);
};

export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};
