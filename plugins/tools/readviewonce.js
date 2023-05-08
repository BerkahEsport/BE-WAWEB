let handler = async (msg, { client, text }) => {
    if (!msg.hasQuotedMsg) return msg.reply("Reply a view-onced message!")
    let q = await msg.getQuotedMessage();
    if (q.hasMedia && q._data.isViewOnce) {
        msg.react("⏳");
        let media = await q.downloadMedia();
        if (media) {
            msg.react("✅");
            return msg.reply(media, null);
        } else {
            msg.react("⚠️");
            return msg.reply("Getting media failed! Please try again.");
        }
    } else return msg.reply("This is not a view-once message!");
};

handler.help = ['readviewonce <reply msg with viewoncemessage>'];
handler.tags = ['tools'];

handler.command = /^(readviewonce)$/i

module.exports = handler;