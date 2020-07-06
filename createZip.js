const zipFolder = require("zip-a-folder");

class ZipAFolder {
  static main(src, path1, path2) {
    zipFolder.zipFolder(src, `${path1}${path2}`, function (err) {
      if (err) {
        console.log("Something went wrong!", err);
      }
    });
  }
}

module.exports = ZipAFolder;
