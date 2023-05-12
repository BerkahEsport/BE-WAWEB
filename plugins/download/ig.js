let fetch = require('node-fetch') //Buat ngambil link gambar...
const pkg = require('whatsapp-web.js') // Untuk BOT
const { MessageMedia } = pkg // Membuffer gambar

let handler = async (m, { conn, text }) => {
    // let media = MessageMedia.fromFilePath('./src/access_denied.jpg') Jika mengirim gambar lewat lokasi file internal.
    let url = `https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4` // Ganti dengan link gambar yang kamu tampilkan. (https://...)
    const media = await MessageMedia.fromUrl(url)
    let tesmedia = `Halo kamu berhasil tes media gambar.... ^_^` // Ganti teks yang ingin ditampilkan.
    await conn.sendMessage(m.from, media, {caption: tesmedia})
    
    
    }
    handler.help = ['']
    handler.tags = ['downloader']
    handler.command = /^(ig)$/i
    handler.register = true
    module.exports = handler