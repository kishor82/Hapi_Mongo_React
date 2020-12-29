import { Stream } from 'stream';
import fs from 'fs';
import Path from 'path';

const uploadFile = (fileStream: Stream, dirPath: string, fileName: string, callback: any) => {
  return new Promise(function (resolve, reject) {
    const outStream = fs.createWriteStream(Path.join(dirPath, fileName));
    fileStream.pipe(outStream);
    outStream.on('error', (err) => {
      reject(callback(err));
    });
    outStream.on('finish', function () {
      resolve(callback(null, fileName));
    });
  });
};

export default uploadFile;
