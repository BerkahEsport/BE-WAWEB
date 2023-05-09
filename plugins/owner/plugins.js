const fs = require('fs');
let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw m.reply(`Hmm.. Teksnya mana?\n\nPenggunaan:\n${usedPrefix + command} [teks]\n\nContoh:\n${usedPrefix + command} tes.js| import fetch from "node-fetch \nAtau balas pesan dan ketik nama pluginnya.`)
    try {
        let path = `./plugins/${text}`
        let quoted = await m.quotedMsg.body
        await fs.writeFileSync(path, quoted)
        m.reply(`Tersimpan di ${quoted}`)
    } catch {
        if (!text.includes('|')) throw m.reply(`Hmm.. Teksnya mana?\n\nPenggunaan:\n${usedPrefix + command} [teks]\n\nContoh:\n${usedPrefix + command} tes.js| import fetch from "node-fetch`)
        let path = `./plugins/${text.split('|')[0]}.js`
        let isi = text.split('|')[1]
        await fs.writeFileSync(path, isi)
        m.reply(`Tersimpan di ${path}`) 
    }
     } 
handler.help = ['sf'].map(v => v + ' [teks]')
handler.tags = ['owner']
handler.command = /^sf$/i

handler.rowner = true

module.exports = handler 

// <===== Buat nambahin plugin lewat chat BOT =====>
// Credit @moexti