global.owner = [
    // [number, name, isDev?]
    ["62895375950107", "berkahesport", true],
]

global.sticker = {
  packname: "nama packname stikermu",
  author: "nama kamu"
}

let file = require.resolve(__filename);
let fs = require('fs');
let chalk = require('chalk');
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});