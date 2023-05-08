let handler = async (m, { client, text }) => {
    if (!m.hasQuotedm) return m.reply("Reply a view-onced message!")
    let q = await m.getQuotedMessage();
    if (q.hasMedia && q._data.isViewOnce) {
        m.react("⏳");
        let media = await q.downloadMedia();
        if (media) {
            m.react("✅");
            return m.reply(media, null);
        } else {
            m.react("⚠️");
            return m.reply("Getting media failed! Please try again.");
        }
    } else return m.reply("This is not a view-once message!");
};

handler.help = ['readviewonce <reply m with viewoncemessage>'];
handler.tags = ['tools'];

handler.command = /^(readviewonce)$/i

module.exports = handler;