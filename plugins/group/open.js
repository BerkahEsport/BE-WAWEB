let handler = async (m, { conn, usedPrefix, command, args, text }) => {
	let chat = await m.getChat();
	//if (chat.groupMetadata.announce) return await chat.setMessagesAdminsOnly(false)
	await chat.setMessagesAdminsOnly(false)
}

handler.help = ['opengc']
handler.tags = ['group']
handler.command = /^opengc$/i

handler.admin = true
handler.group = true
handler.botAdmin = true

module.exports = handler;