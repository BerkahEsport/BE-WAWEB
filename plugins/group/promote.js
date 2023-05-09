let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let user = m._data.mentionedJidList
	if (m.hasQuotedMsg) await user.push((await m.getQuotedMessage()).author)
	if (user.length === 0) return m.reply(`Sebutkan orangnya ${usedPrefix + command} @user`);
	let chat = await m.getChat();
	await chat.promoteParticipants(user)
}

handler.help = ['promote'].map(v => v + ' [@tag]')
handler.tags = ['group']
handler.command = /^(promote|admin|\^|↑)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler;