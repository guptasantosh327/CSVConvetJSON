const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

exports.parseCSV = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(process.env.CSV_PATH, (err, file) => {
      if (err) {
        reject(err);
      }

      const data = file.toString();

      const lines = data.split("\n");

      const headers = lines[0].split(",");

      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(",");

        headers.forEach((header, index) => {
          const keys = header.trim().split(".");
          let tempObj = obj;
          for (let j = 0; j < keys.length - 1; j++) {
            if (!tempObj[keys[j]]) tempObj[keys[j]] = {};
            tempObj = tempObj[keys[j]];
          }
          tempObj[keys[keys.length - 1]] = currentLine[index].trim();
        });

        result.push(obj);
      }
      resolve(result);
    });
  });
};
