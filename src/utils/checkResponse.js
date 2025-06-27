export const checkResponse = async (res) => {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }
  return res.json();
};
