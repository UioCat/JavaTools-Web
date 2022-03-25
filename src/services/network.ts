const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL
  : import.meta.env.VITE_DEV_URL;

const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

export const get = (path: string, absolute: boolean = false) => {
  const url = absolute ? path : baseURL + path;
  return fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers,
  });
};

export const post = (path: string, data: object, absolute: boolean = false) => {
  const url = absolute ? path : baseURL + path;
  return fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers,
    body: JSON.stringify(data),
  });
};
