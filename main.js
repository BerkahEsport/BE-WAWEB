const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const syntaxerror = require('syntax-error');
const _ = require('lodash');
const logger = require('pino')({
    transport: {
        target: "pino-pretty",
        options: {
            levelFirst: true,
            ignore: "hostname",
            translateTime: true,
        }
    }
}).child({ creator: "xyzuniverse" });

// Prevent to crash if error occured
process.on("uncaughtException", console.error);

// Plugin loader
const pluginFolder = path.join(__dirname, "plugins");
const pluginFilter = fs
  .readdirSync(pluginFolder, { withFileTypes: true })
  .filter((v) => v.isDirectory());
const pluginFile = (filename) => /\.js$/.test(filename);

pluginFilter.map(async ({ name }) => {
  global.plugins = {};
  let files = await fs.readdirSync(path.join(pluginFolder, name));
  for (let filename of files) {
    try {
      global.plugins[filename] = require(path.join(
        pluginFolder,
        name,
        filename
      ));
      fs.watch(pluginFolder + "/" + name, global.reload);
    } catch (e) {
      logger.error(e);
      delete global.plugins[filename];
    }
  }
});
logger.info("All plugins has been loaded.");

global.reload = async (_event, filename) => {
  if (pluginFile(filename)) {
    let subdirs = await fs.readdirSync(pluginFolder);
    subdirs.forEach((files) => {
      let dir = path.join(pluginFolder, files, filename);
      if (fs.existsSync(dir)) {
        if (dir in require.cache) {
          delete require.cache[dir];
          if (fs.existsSync(dir))
            logger.info(`re - require plugin '${filename}'`);
          else {
            logger.warn(`deleted plugin '${filename}'`);
            return delete global.plugins[filename];
          }
        } else logger.info(`requiring new plugin '${filename}'`);
        let err = syntaxerror(fs.readFileSync(dir), filename);
        if (err)
          logger.error(`syntax error while loading '${filename}'\n${err}`);
        else
          try {
            global.plugins[filename] = require(dir);
          } catch (e) {
            logger.error(e);
          } finally {
            global.plugins = Object.fromEntries(
              Object.entries(global.plugins).sort(([a], [b]) =>
                a.localeCompare(b)
              )
            );
          }
      }
    });
  }
};
Object.freeze(global.reload);

// Bot prefix
global.prefix = new RegExp("^[" + "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

// Database
var low
try {
  low = require('lowdb');
} catch {
  low = require('./lib/lowdb');
}
const { Low, JSONFile } = low
global.db = new Low(
  new JSONFile('database.json')
)

async function ClientConnect() {
    global.client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
            args: ["--no-sandbox", "--disable-gpu"]
        }
    });

    // Webloading event
    client.on('loading_screen', (percent) => {
        logger.info(`Connecting, loading web... Status: ${percent}%`);
    });

    // QR event
    client.on('qr', qr => {
        QRCode.generate(qr, { small: true });
        logger.info("Scan QR code to continue.");
    });

    // Tell the user if client is ready
    client.on('ready', async () => {
        if (global.db.data == null) await loadDatabase();
        logger.info("Opened connection to WA Web")
        logger.info("Client bot is ready!");
    });

    // Message event
    client.on('message', require('./handler').handler.bind(client));

    // Initialize the client
    client.initialize();
    logger.info("Connecting to WA Web")

    return client;

}

// Load database if database didn't load properly
loadDatabase()
async function loadDatabase() {
  await global.db.read()
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}

// Save database every minute
setInterval(async () =>{
  if (global.db) await global.db.write();
}, 30 * 1000)

ClientConnect()
.catch(e => console.error(e))
