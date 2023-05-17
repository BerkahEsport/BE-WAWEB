let fetch = require('node-fetch')
const pkg = require('whatsapp-web.js')
const { MessageMedia} = pkg 
const { pinterest } = require('@xct007/frieren-scraper')
const FileType = require('file-type')
let handler = async (m, { args, usedPrefix, command }) => {
    if (!args || !args[0]) return m.reply(`Input URL:\n${usedPrefix + command} https://www.instagram.com/p/Cp9u9aou7lK`);
    const data = await pinterest.v1(args[0])
    if (data.error) m.reply(`${data.message}`) 
    else await m.reply(new MessageMedia((await FileType.fromBuffer(buff)).mime, buff.toString("base64")))
    }
  
    handler.help = ['pinterest']
    handler.tags = ['image']
    handler.command = /^(pinterest)$/i
    handler.register = true
    module.exports = handler