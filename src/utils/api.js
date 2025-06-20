const baseUrl = "http://localhost:3001";

export const fetchClothingItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const addClothingItem = ({ name, link, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link, weather }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
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
