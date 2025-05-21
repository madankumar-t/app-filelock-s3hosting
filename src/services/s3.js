import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const REGION = process.env.REACT_APP_REGION;
const BUCKET = process.env.REACT_APP_S3_BUCKET;

const s3 = new S3Client({ region: REGION });

export async function listFiles() {
  const command = new ListObjectsV2Command({ Bucket: BUCKET });
  const response = await s3.send(command);
  return response.Contents.map(obj => obj.Key);
}
