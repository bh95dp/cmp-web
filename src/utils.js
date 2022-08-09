export async function postFormData(url, method, body = null, headers = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return await response.json();
}
