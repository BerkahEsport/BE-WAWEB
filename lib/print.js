const chalk = require('chalk');
const PhoneNumber = require('awesome-phonenumber');

module.exports = async(client, m) => {
    let chats = await m.getChat();
    let user = await m.getContact();

    let colors = [
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
        "cyanBright",
    ];

    // The header of the chat
    let header_client = chalk.red("~ " + client.info.pushname + " " + PhoneNumber("+" + client.info.wid.user).getNumber("international")) + " " + chalk.black(chalk.bgGreenBright(client.info.platform.replace(/^./, (v) => v.toUpperCase()))) + " " + chalk.black(chalk.bgYellow((m.timestamp ? new Date(1000 * (m.timestamp.low || m.timestamp)) : new Date).toTimeString()))
    let header_sender = chalk[pickRandom(colors)]("~ " + user.pushname + " " + PhoneNumber("+" + user.number).getNumber("international")) + " to " + chalk.green(m.from + " " + chats.name) + " " +  chalk.black(chalk.bgYellow(m.type.replace(/^./, (v) => v.toUpperCase())))
    let text = m.isCommand ? chalk.yellow(m.body) : m.body
    if (m.mentionedIds) for (let users of m.mentionedIds) text = text.replace('@' + users.split`@`[0], chalk.blueBright("@" + await (await client.getContactById(users)).pushname))
    console.log(header_client + "\n" + header_sender + "\n" + text + '\n')
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

let file = require.resolve(__filename);
let fs = require('fs');
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'lib/print.js'"));
  delete require.cache[file];
  require(file);
});