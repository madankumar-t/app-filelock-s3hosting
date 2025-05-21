import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function getLocks() {
  const res = await axios.get(\`\${API_ENDPOINT}/locks\`);
  return res.data;
}

export async function lockFile(fileKey) {
  await axios.post(\`\${API_ENDPOINT}/lock\`, { fileKey });
}

export async function unlockFile(fileKey) {
  await axios.post(\`\${API_ENDPOINT}/unlock\`, { fileKey });
}
