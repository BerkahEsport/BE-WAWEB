let handler = async (msg, { client, text, command }) => {
    let packname = text.split('|')[0] ? text.split('|')[0] : global.sticker.packname
    let author = text.split('|')[1] ? text.split('|')[1] : global.sticker.author
    let q = msg.hasQuotedMsg ? await msg.getQuotedMessage() : msg
    var isMedia = q.hasMedia && q.type.includes('image') || q.hasMedia && q.type.includes('video') || q.hasMedia && q.type.includes('gif');
    if (isMedia) {
        msg.react("⏳");
        var media = await q.downloadMedia();
        if (media) {
            msg.react("✅");
            await msg.reply(media, undefined, { sendMediaAsSticker: true, stickerName: packname, stickerAuthor: author });
        } else {
            msg.react("⚠️");
            msg.reply("Conversion into sticker failed, please try again or report to owner for fixing it.");
        }   
    }
}

handler.help = ['stiker (caption|reply media)', 'stikergif (caption|reply media)']
handler.tags = ['tools']
handler.command = /^s(tic?ker)?(gif)?$/i
module.exports = handler