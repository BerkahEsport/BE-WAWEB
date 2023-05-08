let handler = async (msg, { client, text, isAdmin, isGroup }) => {
    if (!msg.hasQuotedMsg) {
        msg.react('⚠️');
        return msg.reply('Reply pesan bot untuk menghapus pesan!')
    } else if (msg.hasQuotedMsg) {
        var q = await msg.getQuotedMessage();
        if (q.fromMe || isGroup && isAdmin) q.delete(true); 
        else {
            msg.react("⚠️");
            return msg.reply("Maaf, saya hanya bisa menghapus pesan saya sendiri atau hapus pesan orang lain dalam grup apabila saya admin.")
        }
    }
}

handler.help = ['delete <reply message>', 'del <reply message>']
handler.tags = ['tools']
handler.command = /^del(ete)?$/i

module.exports = handler;