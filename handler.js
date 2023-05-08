require('./config.js');
var isNumber = x => typeof x === 'number' && !isNaN(x);
module.exports = {
    async handler(msg) {
        if (!msg) return;
        let chats = await msg.getChat();
        let users = await msg.getContact();
        try {

            // Fungsi Database
            try {
                let user = global.db.data.users[msg.author || msg.from]
                if (typeof user !== 'object') global.db.data.users[msg.author || msg.from] = {}
                if (user) {
                    if (!('name' in user)) user.name = users.pushname
                } else global.db.data.users[msg.author || msg.from] = {
                    name: users.pushname
                }
            } catch (e) {
                console.log("DatabaseError:", e)
            }

            // Untuk akses plugins kamu
            let isGroup = msg.from.endsWith("@g.us");
            let isROwner = [this.info.me.user, ...global.owner.map(([number]) => number)].map((v) => v?.replace(/[^0-9]/g, "") ).includes((isGroup ? msg.author : msg.from).split("@")[0]);
            let isOwner = isROwner || msg.fromMe;

            let groupMetadata = isGroup ? chats.groupMetadata : {};
            let participants = isGroup ? groupMetadata.participants : [];

            let user = isGroup ? participants.find(u => u.id.user == users.number) : {};
            let bot = isGroup ? participants.find(u => u.id.user == client.info.me.user) : {};

            let isAdmin = isGroup ? (user.isAdmin || user.isSuperAdmin) : false;
            let isBotAdmin = isGroup ? (bot.isAdmin || bot.isSuperAdmin) : false;

            // Untuk menjalankan plugin prefix dan cmd kamu
            let usedPrefix;
            for (let name in global.plugins) {
              let plugin = global.plugins[name];
              if (!plugin) continue;
              const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
              let _prefix = plugin.customPrefix ? plugin.customPrefix : client.prefix ? client.prefix : global.prefix;
              let match = (
                _prefix instanceof RegExp // RegExp Mode?
                    ? [[_prefix.exec(msg.body), _prefix]]
                    : Array.isArray(_prefix) // Array?
                    ? _prefix.map((p) => {
                        let re =
                        p instanceof RegExp // RegExp in Array?
                          ? p
                          : new RegExp(str2Regex(p));
                        return [re.exec(msg.body), re];
                    })
                    : typeof _prefix === "string" // String?
                    ? [
                      [
                        new RegExp(str2Regex(_prefix)).exec(msg.body),
                        new RegExp(str2Regex(_prefix)),
                      ],
                    ]
                    : [[[], new RegExp()]]
                ).find((p) => p[1]);
                if ((usedPrefix = (match[0] || "")[0])) {
                let noPrefix = msg.body.replace(usedPrefix, "");
                let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
                args = args || [];
                let _args = noPrefix.trim().split` `.slice(1);
                let text = _args.join` `;
                command = (command || "").toLowerCase();
                let isAccept =
                    plugin.command instanceof RegExp // RegExp Mode?
                    ? plugin.command.test(command)
                    : Array.isArray(plugin.command) // Array?
                    ? plugin.command.some((cmd) =>
                        cmd instanceof RegExp // RegExp in Array?
                            ? cmd.test(command)
                            : cmd === command
                        )
                    : typeof plugin.command === "string" // String?
                    ? plugin.command === command
                    : false;
        
                if (!isAccept) continue;
                msg.plugin = name;
      
                // Fungsi untuk pengecualian akses plugin cmd
                if (plugin.rowner && !isROwner) {
                    msg.reply("This command can only executed by the real owner!")
                    continue;
                }
                if (plugin.owner && !isOwner) {
                    msg.reply("This command can only executed by the owner.")
                    continue;
                }
                if (plugin.admin && !isAdmin) {
                    msg.reply("This command can only executed by the administrators.");
                    continue;
                }
                if (plugin.botAdmin && !isBotAdmin) {
                    msg.reply("Make sure bot is admin before executing this command!");
                    continue;
                }
                if (plugin.private && isGroup) {
                    msg.reply("This commnd can only executed on private chat.")
                }
      
                msg.isCommand = true;
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    client: this,
                    msg,
                    users,
                    isGroup,
                    isAdmin
                };
                try {
                    await plugin.call(this, msg, extra);
                } catch (e) {
                    console.log(e);
                }
                }
            }
        } finally {
            // Hasil dilihat pada console.log
            require("./lib/print")(this, msg).catch((e) => console.log(e));
        }
    }
}
