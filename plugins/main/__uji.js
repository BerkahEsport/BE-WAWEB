const fs = require('fs');
let handler = async (m, { conn, text }) => {
 //m.reply(  `aaaa`)
    let gambar = await fs.readFileSync(`./src/access_ditolak.jpg`)
 conn.sendMessage(m.from, 
    gambar, 
    { caption: 'aaa'})

}
handler.command = ['']
handler.tags = ['']
handler.command = /^(bbb)$/i
// handler.register = true
// handler.login = true
// handler.text = true
module.exports = handler;