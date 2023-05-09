let handler = async (m, { conn, text }) => {
    let tes = `Halo kamu berhasil tes kode.... ^_^`
        m.reply(`${tes}`) // Membalas langsung ke penerima.
        //conn.reply(m.from, tes) // Kalo mau mengirim ke nomor lain ganti m.from dengan nomor yang dituju (@c.us)
    
    
    }
    handler.command = ['']
    handler.tags = ['']
    handler.command = /^(tes)$/i
    handler.register = true
    module.exports = handler