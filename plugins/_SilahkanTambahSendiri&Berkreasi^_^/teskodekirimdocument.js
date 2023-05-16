const pkg = require('whatsapp-web.js') // Untuk BOT
const { MessageMedia } = pkg // Membuffer gambar
let handler = async (m, { conn, text }) => {
    const media = MessageMedia.fromFilePath(`./src/Credit by @moexti.zip`)
    conn.sendMessage(m.from, media , { sendMediaAsDocument: true })


     
    
}
handler.help = ['']
handler.tags = ['']
handler.command = /^(tesdoc)$/i
handler.register = true
module.exports = handler

//Silahkan berkreasi. ^_^
// @moexti