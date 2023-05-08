  // <----- BERKAHESPORT.ID OFC ----->>
  // Kalo error hubungi kami wa.me/62895375950107
const chalk = require('chalk');
const PhoneNumber = require('awesome-phonenumber');

module.exports = async(conn, m) => {
    let chats = await m.getChat();
    let user = await m.getContact();

     // Keluaran di terminal (ConsoleLog)
    let text = m.isCommand ? chalk.yellowBright(m.body) : m.body
    if (m.mentionedIds) for (let users of m.mentionedIds) text = text.replace('@' + users.split`@`[0], chalk.blueBright("@" + await (await conn.getContactById(users)).pushname))
    let print = `\n👤 ${chalk.redBright(conn.info.pushname)}
    │📱 ${chalk.green(PhoneNumber("+" + conn.info.wid.user).getNumber("international"))}
    │👫 ${chalk.blue(chalk.bgGreen(user.pushname + " " + PhoneNumber("+" + user.number).getNumber("international")) )}
    │🏠 ${chalk.yellow(m.from + " " + chats.name)}
    │💾 ${chalk.blue(m.type.replace(/^./, (v) => v.toUpperCase()))}
    │💬 ${chalk.magenta(chalk.bgYellow(m.isCommand ? chalk.yellow(m.body) : m.body))}
    │⏰ ${chalk.cyan(chalk.bgYellow(m.timestamp ? new Date(1000 * (m.timestamp.low || m.timestamp)) : new Date).toTimeString())}\
    │♻️ ${chalk.redBright(conn.info.platform.replace(/^./, (v) => v.toUpperCase()))}`.trim()
    
    console.log(print)
}

let file = require.resolve(__filename);
let fs = require('fs');
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'lib/print.js'"));
  delete require.cache[file];
  require(file);
});


/*
Data warna chalk
        "red",
        "green",
        "blue",
        "yellow",
        "magenta",
        "cyan",
        "redBright",
        "greenBright",
        "blueBright",
        "yellowBright",
        "magentaBright",
        "cyanBright"
*/