const axios = require("axios");

let handler = async (m, { text }) => {
  const response = await axios.get(
    `https://sh.xznsenpai.xyz/api/openai?text=${text}&apikey=Rippanteq`,
    {
      responseType: "json",
    }
  );
  const v = response.data;
  m.reply(v.result);
  //conn.reply(m.from, tes)
};
handler.command = ["chatgpt", "openai"];
handler.tags = ["tools"];
handler.command = /^(ai)$/i;
handler.register = true;
module.exports = handler;
