const fs = require("fs");
const zipFolder = require("zip-a-folder");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

//passsing directoryPath
function getDir(dir) {
  var fileName = null;
  var files = [];

  files = fs.readdirSync(dir);
  //listing first occurance of img file using find
  fileName = files.find((file) => {
    // Do whatever you want to do with the file
    if (
      file &&
      file.split(".")[1] &&
      ["jpg", "png", "jpeg", "tiff", "gif", "eps"].includes(
        file.split(".")[1].toLocaleLowerCase()
      )
    )
      return file;
  });
  return fileName;
}

class ZipAFolder {
  static main(src, path1, path2) {
    zipFolder.zipFolder(src, `${path1}${path2}`, function (err) {
      if (err) {
        console.log("Something went wrong!", err);
      }
    });
  }
}

// module.exports = ZipAFolder;
// module.exports = jsonReader;
// module.exports = getDir;
module.exports = {
  Zip: ZipAFolder,
  getDir,
  jsonReader,
};
