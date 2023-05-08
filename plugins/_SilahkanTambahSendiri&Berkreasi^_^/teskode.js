let handler = async (m, { conn, text }) => {
    let tes = `Halo kamu berhasil tes kode.... ^_^`
        m.reply(`${tes}`)
        //conn.reply(m.from, tes)
    
    
    }
    handler.command = ['']
    handler.tags = ['']
    handler.command = /^(tes)$/i
    handler.register = true
    module.exports = handler