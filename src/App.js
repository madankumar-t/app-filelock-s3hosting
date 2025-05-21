import React, { useEffect, useState } from "react";
import FileTable from "./components/FileTable";
import { getFiles, getLockStatus, getUsers } from "./services/api";

function App() {
  const [files, setFiles] = useState([]);
  const [locks, setLocks] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    async function fetchData() {
      const [fileList, lockData, userMap] = await Promise.all([
        getFiles(),
        getLockStatus(),
        getUsers()
      ]);

      const lockMap = {};
      lockData.forEach(lock => {
        lockMap[lock.filename] = {
          ...lock,
          locked_by_full_name: userMap?.[lock.locked_by]?.full_name || lock.locked_by
        };
      });

      setFiles(fileList);
      setLocks(lockMap);
      setUsers(userMap);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>S3 File Lock UI</h1>
      <FileTable files={files} locks={locks} username="adminUser" />
    </div>
  );
}

export default App;
