export const handleResponse = response => {
  if (response.status >= 400 && response.status < 600) {
    throw new Error('Bad response from server');
  }

  return response.json();
};
