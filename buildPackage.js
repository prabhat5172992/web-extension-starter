const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { Zip } = require("./helper");
const { jsonReader } = require("./helper");
const { getDir } = require("./helper");

const directoryPath = path.join(__dirname, "src/img");
// FILENAMES
const manifestFileName = "manifest.json";
const img = getDir(directoryPath);
// const img = "greet.png";

// DIRECTORIES
const buildDir = "./build/";
const extensionDir = "./extras/";
const outputs = "./";
const imagePath = "./src/img/";

// OUTPUTS
const chromeOutput = "greetings-chrome.zip";

console.log("Building Extension Packages");

console.log("***COPYING MANIFEST FILE***\n\n");
execSync(
  `cp ${extensionDir}${manifestFileName} ${buildDir}${manifestFileName}`
);
execSync(`cp ${imagePath}${img} ${buildDir}${img}`);

console.log("***IMAGE COPIED SUCCESSFULLY***");

if (fs.existsSync(buildDir) && `${buildDir}${manifestFileName}`) {
  jsonReader(`${buildDir}${manifestFileName}`, (err, manifest) => {
    if (err) {
      console.log("Error reading file:", err);
      return;
    }
    // Add logo
    manifest.icons = {
      "128": img,
    };
    fs.writeFile(
      `${buildDir}${manifestFileName}`,
      JSON.stringify(manifest, null, 2),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
  });
  console.log("***MANIFEST JSON SUCCESSFULLY EDITED***");
  Zip.main(buildDir, outputs, chromeOutput);
}

console.log("***CHROME BUILT SUCCESSFULLY***\n\n");

execSync(`web-ext build -s ${buildDir} -a ${outputs} --overwrite-dest`);
console.log("***FIREFOX BUILT SUCCESSFULLY***");
