let fetch = require('node-fetch') //Buat ngambil link gambar...
const pkg = require('whatsapp-web.js') // Untuk BOT
const { MessageMedia } = pkg // Membuffer gambar

let handler = async (m, { conn, text }) => {
    let url = thumb // Ganti dengan link gambar yang kamu mau. (https://...)
    const media = await MessageMedia.fromUrl(url)
    let tesmedia = `Halo kamu berhasil tes media gambar.... ^_^`
    await conn.sendMessage(m.from, media, {caption: tesmedia})
    
    
    }
    handler.command = ['']
    handler.tags = ['']
    handler.command = /^(tesgambar)$/i
    handler.register = true
    module.exports = handler