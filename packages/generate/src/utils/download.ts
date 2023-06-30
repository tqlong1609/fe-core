import axios from 'axios';
import path from 'path';
import fs from 'fs';

// Function to download a file
export const downloadFile = async (url: string, filePath: string) => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  fs.writeFileSync(filePath, response.data);
};

// Function to download a folder
export const downloadFolder = async (
  folderUrl: string,
  localFolderPath: string
) => {
  const response = await axios.get(folderUrl);
  const files = response.data;

  if (!fs.existsSync(localFolderPath)) {
    fs.mkdirSync(localFolderPath);
  }

  for (const file of files) {
    const filePath = path.join(localFolderPath, file.name);

    if (file.type === 'dir') {
      await downloadFolder(file.url, filePath);
    } else {
      await downloadFile(file.download_url, filePath);
    }
  }
};

// Function to download a file with url
export const downloadFileUrl = async (
  folderUrl: string,
  localFolderPath: string
) => {
  const response = await axios.get(folderUrl);
  const files = response.data;

  await downloadFile(files.download_url, localFolderPath);
};
