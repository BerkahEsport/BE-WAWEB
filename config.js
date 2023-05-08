/*============== WATERMARK ==============*/
global.wm = '                「 ꧁༒☬𝓑𝓔𝓡𝓚𝓐𝓔𝓢𝓟𝓞𝓡𝓣.𝓘𝓓☬༒꧂ 」' //Main Watermark
global.wm2 = '🅱🅴🆁🅺🅰🅴🆂🅿🅾🆁🆃.🅸🅳'
global.wm3 = '⫹⫺ ★彡[ʙᴇʀᴋᴀᴇꜱᴘᴏʀᴛ.ɪᴅ]彡★'
global.author = '                「 *@爪ㄖ乇乂ㄒ丨* 」'

/*============== PERINGATAN ==============*/
global.nsfw = 'Fitur NSFW Dimatikan\nKetik *!enable* *nsfw* untuk menggunakan fitur ini!\n“Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandanganya, dan memelihara kemaluannya; … Katakanlah kepada wanita yang beriman: Hendaklah mereka menahan pandangannya, dan kemaluannya, dan janganlah mereka Menampakkan perhiasannya, kecuali yang (biasa) nampak dari padany,” \n(TQS. Al-Nur [24]: 30-31).'
global.subs = 'Jangan liat doang, subscribe dulu dong.. \n https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w'
global.ty = '💭 ɪɴɪ ʜᴀꜱɪʟɴʏᴀ... \nᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ꜱᴜᴘᴘᴏʀᴛ ɪɢ @ʙᴇʀᴋᴀʜᴇꜱᴘᴏʀᴛ.ɪᴅ ʏᴀᴋ...  \n👍 ᴛʜᴀɴᴋꜱ ʏᴏᴜ...'

/*============== LOGO ==============*/
global.thumb = 'https://telegra.ph/file/47b3652155f158b931bda.jpg' //Main Thumbnail
global.imagebot = 'https://raw.githubusercontent.com/BerkahEsport/api-be/main/tmp/gmbr/logo2.png' //Logo BE

/*============== TEXT ==============*/
global.wait = '```「▰▰▰▰▱▱▱▱▱▱」Loading...```'
global.waits = ['```「▰▱▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▰▱▱▱▱▱」Loading...```']
global.eror = '```404 error```'




global.owner = [
    // [nomor kamu, nama kamu, developer bukan?]
    ["62895375950107", "berkahesport", true],
]

global.sticker = {
  packname: "nama packname stikermu",
  author: "nama kamu"
}


//------ JANGAN DIUBAH -----
let file = require.resolve(__filename);
let fs = require('fs');
let chalk = require('chalk');
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});


// <----- BERKAHESPORT.ID OFC ----->>
/* Whatsapp bot versi WAWEB ini mohon digunakan dengan bijak
Terimakasih Untuk ALLAH S.W.T.
Serta junjungan kami nabi Muhammad S.A.W

Base created by @moexti 08 Mei 2023
- Silahkan tambah disini bro...
-
-

Jangan ubah yak mending ditambah... ^_^
*/