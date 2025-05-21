import React, { useEffect, useState } from "react";
import FileTable from "./components/FileTable";
import { listFiles } from "./services/s3";
import { getLocks } from "./services/api";

function App() {
  const [files, setFiles] = useState([]);
  const [locks, setLocks] = useState({});

  useEffect(() => {
    async function fetchData() {
      const s3Files = await listFiles();
      const lockData = await getLocks();
      const lockMap = {};
      lockData.forEach(lock => {
        lockMap[lock.fileKey] = lock;
      });
      setFiles(s3Files);
      setLocks(lockMap);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>S3 File Lock UI</h1>
      <FileTable files={files} locks={locks} />
    </div>
  );
}

export default App;
