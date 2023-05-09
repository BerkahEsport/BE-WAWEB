let handler = async (m, { conn, text }) => {
    let tes = `Halo kamu berhasil tes kode.... ^_^` // Isi aja sesuai keinginanmu.
        m.reply(`${tes}`) // Membalas langsung ke penerima.
        //conn.reply(m.from, tes) // Kalo mau mengirim ke nomor lain ganti m.from dengan nomor yang dituju (@c.us)
    
    
    }
    handler.help = [''] // Jika diisi maka di menu bot akan tampil, samakan dengan handler.command ya.
    handler.tags = [''] // Jika diisi maka fitur ini akan dikelompokan sesuai dengan yang kamu isi.
    handler.command = /^(tes)$/i // Ketika chat bot sama teksnya maka akan menjalankan fitur ini. (Diawali dengan prefix .)
    // handler.rowner = true // Hanya bisa diakses Pemilik paling utama. Di file config.js
    // handler.owner = true // Hanya bisa diakses Owner tambahan & Owner utama
    // handler.group = true // Hanya bisa diakses di group
    // handler.owner = true // Hanya bisa diakses oleh admin group
    // handler.botAdmin = true // Hanya bisa diakses jika bot menjadi Admin group.
    module.exports = handler