let cp = require("child_process");
let { promisify } = require("util");
let exec = promisify(cp.exec).bind(cp);
let handler = async (msg, { client, isOwner, command, text }) => {
  if (global.client.info.wid.user != client.info.wid.user) return;
  msg.reply("Executing...");
  let o;
  try {
    o = await exec(command.trimStart() + " " + text.trimEnd());
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;
    if (stdout.trim()) msg.reply(stdout);
    if (stderr.trim()) msg.reply(stderr);
  }
};
handler.customPrefix = /^[$] /;
handler.command = new RegExp();
handler.rowner = true;
module.exports = handler;
