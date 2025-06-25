const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return res.json();
}

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
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res;
  });
};
