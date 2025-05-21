import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getFiles() {
  const res = await axios.get(`${API_ENDPOINT}/get-url`);
  return res.data;
}

export async function getLockStatus() {
  const res = await axios.get(`${API_ENDPOINT}/status`);
  return res.data;
}

export async function getUsers() {
  const res = await axios.get(`${API_ENDPOINT}/users`);
  return res.data;
}

export async function lockFile(filename, username) {
  await axios.post(`${API_ENDPOINT}/lock`, { filename, username });
}

export async function unlockFile(filename, username) {
  await axios.post(`${API_ENDPOINT}/unlock`, { filename, username });
}
