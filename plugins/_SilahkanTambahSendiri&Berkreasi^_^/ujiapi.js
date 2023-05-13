let axios = require('axios')
let handler = async (m, { conn, text }) => {
    let restapi = global.API('lolhuman','api/superhero', 'apikey', `query=${text}`) 
    // global.API('isi di config.js','api sambungan apa?', {query: text}, `apikey`) // query bisa disesuaikan kadang url atau teks
    
    await stringify(restapi)


// <----- JSON stringify ----->
async function stringify(url, options = {}) {
try {
let data = await axios(url, {
method: "get",
headers: {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    origin: url,
    referer: url
},
responseType: 'json'
})

return m.reply(`${JSON.stringify(data?.data)}`)
} catch (e) {
return m.reply(`${JSON.stringify(e)}`)
}
}
}
handler.command = /^(api)$/i
module.exports = handler
                