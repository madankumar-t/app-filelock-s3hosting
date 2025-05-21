import React from "react";
import { lockFile, unlockFile } from "../services/api";

function FileTable({ files, locks }) {
  const handleLock = async (fileKey) => {
    await lockFile(fileKey);
    window.location.reload();
  };

  const handleUnlock = async (fileKey) => {
    await unlockFile(fileKey);
    window.location.reload();
  };

  return (
    <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "2rem" }}>
      <thead>
        <tr>
          <th>File Name</th>
          <th>Status</th>
          <th>Locked By</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => {
          const lock = locks[file];
          return (
            <tr key={file}>
              <td>{file}</td>
              <td>{lock ? "🔒 Locked" : "🔓 Unlocked"}</td>
              <td>{lock ? lock.lockedBy : "-"}</td>
              <td>
                {!lock ? (
                  <button onClick={() => handleLock(file)}>Lock</button>
                ) : (
                  <button onClick={() => handleUnlock(file)}>Unlock</button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default FileTable;
