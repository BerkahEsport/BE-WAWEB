require('./config.js');
let fs = require('fs')
const chalk = require('chalk');
var isNumber = x => typeof x === 'number' && !isNaN(x);
module.exports = {
    async handler(m) {
        if (!m) return;
        let chats = await m.getChat();
        let users = await m.getContact();
        try {

            // Fungsi Database
            try {
                let user = global.db.data.users[m.author || m.from]
                if (typeof user !== 'object') global.db.data.users[m.author || m.from] = {}
                if (user) {                    
                    if (!user.registered) {
                        if (!('name' in user)) user.name = users.pushname
                        if (!isNumber(user.age)) user.age = -1;
                        if (!isNumber(user.regTime)) user.regTime = -1;
                  }
                    if (!("premium" in user)) user.premium = false;
                    if (!"banned" in user) user.banned = false;
                    if (!"mute" in user) user.mute = false;
                    if (!"afkReason" in user) user.afkReason = "";
                    if (!("registered" in user)) user.registered = false;
                    if (!("lastIstigfar" in user)) user.lastIstigfar = true;
                    if (!isNumber(user.healt)) user.healt = 0;
                    if (!isNumber(user.stamina)) user.stamina = 100;
                    if (!isNumber(user.level)) user.level = 0;
                    if (!isNumber(user.exp)) user.exp = 0;
                    if (!isNumber(user.limit)) user.limit = 10;
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0;
                    if (!isNumber(user.money)) user.money = 0;
                    if (!isNumber(user.premiumTime)) user.premiumTime = 0;
                    if (!isNumber(user.warn)) user.warn = 0;
                    if (!isNumber(user.afk)) user.afk = -1;
                } else global.db.data.users[m.author || m.from] = {
                    name: users.pushname,
                    age: -1,
                    regTime: -1,
                    premium: false,
                    premium: false,
                    banned: false,
                    mute: false,
                    afkReason: "",
                    registered: false,
                    lastIstigfar: true,
                    healt: 100,
                    stamina: 100,
                    level: 0,
                    exp: 0,
                    limit: 10,
                    lastclaim: 0,
                    money: 0,
                    premiumTime: 0,
                    warn: 0,
                    afk: -1
                }
            } catch (e) {
                console.log("DATABASE RUSAK", e)
            }

            // Untuk akses plugins kamu
            let isGroup = m.from.endsWith("@g.us");
            let isROwner = [this.info.me.user, ...global.owner.map(([number]) => number)].map((v) => v?.replace(/[^0-9]/g, "") ).includes((isGroup ? m.author : m.from).split("@")[0]);
            let isOwner = isROwner || m.fromMe;
            let participants = isGroup ? (await m.getChat()).participants  : [];
            let AdminFilter = isGroup ? participants.filter(v => v.isAdmin).map(v => v.id.user) : '';
            let isAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(m.author ? m.author : m.from) : '';
            let isBotAdmin = isGroup ? AdminFilter.map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(conn.info.me._serialized) : '';

            // Untuk menjalankan plugin prefix dan cmd kamu
            let usedPrefix;
            for (let name in global.plugins) {
              let plugin = global.plugins[name];
              if (!plugin) continue;
              const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
              let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix;
              let match = (
                _prefix instanceof RegExp // RegExp Mode?
                    ? [[_prefix.exec(m.body), _prefix]]
                    : Array.isArray(_prefix) // Array?
                    ? _prefix.map((p) => {
                        let re =
                        p instanceof RegExp // RegExp in Array?
                          ? p
                          : new RegExp(str2Regex(p));
                        return [re.exec(m.body), re];
                    })
                    : typeof _prefix === "string" // String?
                    ? [
                      [
                        new RegExp(str2Regex(_prefix)).exec(m.body),
                        new RegExp(str2Regex(_prefix)),
                      ],
                    ]
                    : [[[], new RegExp()]]
                ).find((p) => p[1]);
                if ((usedPrefix = (match[0] || "")[0])) {
                let noPrefix = m.body.replace(usedPrefix, "");
                let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
                args = args || [];
                let _args = noPrefix.trim().split` `.slice(1);
                let text = _args.join` `;
                command = (command || "").toLowerCase();
                let fail = plugin.fail || global.dfail // When failed
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
                m.plugin = name;
      
                // Fungsi untuk pengecualian akses plugin cmd
                if (plugin.rowner && !isROwner) {
                    fail('rowner', m, conn)
                    continue;
                }
                if (plugin.owner && !isOwner) {
                    fail('owner', m, conn)
                    continue;
                }
                if (plugin.admin && !isAdmin) {
                    fail('admin', m, conn)
                    continue;
                }
                if (plugin.botAdmin && !isBotAdmin) {
                    fail('botAdmin', m, conn)
                    continue;
                }
                if (plugin.private && isGroup) {
                    fail('private', m, conn)
                }
      
                m.isCommand = true;
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    m,
                    users,
                    isGroup,
                    isAdmin
                };
                try {
                    await plugin.call(this, m, extra);
                } catch (e) {
                    console.log(e);
                }
                }
            }
        } finally {
            // Hasil dilihat pada console.log
            require("./lib/print")(this, m).catch((e) => console.log(e));
        }
    }
}


global.dfail = (type, m, conn) => {
    //let gambar = fs.readFileSync(`./src/access_ditolak.jpg`)
    let msg = {
      rowner: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔻𝔼𝕍𝔼𝕃𝕆ℙ𝔼ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴅᴇᴠᴇʟᴏᴘᴇʀ ʙᴏᴛ",
      owner: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝕆𝕎ℕ𝔼ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ ʙᴏᴛ",
      mods: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝕄𝕆𝔻𝔼ℝ𝔸𝕋𝕆ℝ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴍᴏᴅᴇʀᴀᴛᴏʀ ʙᴏᴛ",
      premium: "*𝕂ℍ𝕌𝕊𝕌𝕊 ℙℝ𝔼𝕄𝕀𝕌𝕄* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴘʀᴇᴍɪᴜᴍ ᴜsᴇʀ",
      group: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔾ℝ𝕆𝕌ℙ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ",
      private: "*𝕂ℍ𝕌𝕊𝕌𝕊 ℂℍ𝔸𝕋 ℙℝ𝕀𝔹𝔸𝔻𝕀* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪᴘᴀᴋᴀɪ ᴅɪᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ",
      admin: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔸𝔻𝕄𝕀ℕ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴀᴅᴍɪɴ ɢʀᴏᴜᴘ",
      botAdmin: "*𝕂ℍ𝕌𝕊𝕌𝕊 𝔹𝕆𝕋 𝔸𝔻𝕄𝕀ℕ* • ᴄᴏᴍᴍᴀɴᴅ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴋᴇᴛɪᴋᴀ ʙᴏᴛ ᴍᴇɴᴊᴀᴅɪ ᴀᴅᴍɪɴ",
      restrict: "*𝕄𝔼ℕ𝕌 𝔸𝔻𝕄𝕀ℕ* • ʀᴇsᴛʀɪᴄᴛ ʙᴇʟᴜᴍ ᴅɪɴʏᴀʟᴀᴋᴀɴ ᴅɪᴄʜᴀᴛ ɪɴɪ",
      nsfw: `*ℙ𝔸ℝ𝔸ℍ 𝕃𝕌!!!* • ɴᴀᴋ ᴋᴀᴍᴜ ʙᴇʟᴜᴍ ᴄᴜᴋᴜᴘ ᴜᴍᴜʀ. ᴊᴀɴɢᴀɴ ᴍᴀᴋꜱᴀ!!!`,
      text: `*𝕋𝔼𝕂𝕊 𝕃𝕀𝕄𝕀𝕋𝔼𝔻* • ᴛᴇᴋꜱ ʏᴀɴɢ ᴋᴀᴍᴜ ᴍᴀꜱᴜᴋᴋᴀɴ ᴛᴇʀʟᴀʟᴜ ʙᴀɴʏᴀᴋ! ᴍᴀᴋꜱ. 1500 ᴋᴀʀᴀᴋᴛᴇʀ. ` 
    }[type];
    if (msg) return conn.sendMessage(m.from,  msg
  )}