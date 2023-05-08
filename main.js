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
}).child({author: `@moexti`});

//Jika terjadi error
process.on("uncaughtException", console.error);

// Membuka PLUGINS
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
logger.info("Berhasil memuat semua plugins.");

global.reload = async (_event, filename) => {
  if (pluginFile(filename)) {
    let subdirs = await fs.readdirSync(pluginFolder);
    subdirs.forEach((files) => {
      let dir = path.join(pluginFolder, files, filename);
      if (fs.existsSync(dir)) {
        if (dir in require.cache) {
          delete require.cache[dir];
          if (fs.existsSync(dir))
            logger.info(`- Perubahan plugin '${filename}'`);
          else {
            logger.warn(`- Menghapus plugin '${filename}'`);
            return delete global.plugins[filename];
          }
        } else logger.info(`- Menambah plugin '${filename}'`);
        let err = syntaxerror(fs.readFileSync(dir), filename);
        if (err)
          logger.error(`Sintax error ketika dimuat '${filename}'\n${err}`);
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

// <----- Prefix BOT ----->>
global.prefix = new RegExp("^[" + "‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

// <----- DATABASE BOT ----->>
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

    // <----- Menghubungkan koneksi WAWEB ----->
    client.on('loading_screen', (percent) => {
        logger.info(`Mengubungkan, membuka situs... Berjalan: ${percent}%`);
    });

    // <----- Membuat QR untuk di scan Perangkat tertaut ----->
    client.on('qr', qr => {
        QRCode.generate(qr, { small: true });
        logger.info("Scan QR Code dibawah ini agar terhubung ke WaWeb...");
    });

    // <----- BOT sudah terhubung ke Whatsapp ----->
    client.on('ready', async () => {
        if (global.db.data == null) await loadDatabase();
        logger.info("Membuka koneksi ke WaWeb...")
        logger.info("Klien bot sudah siap!!");
    });

    // <----- Penghubung pesan fitur PLUGINS ----->
    client.on('message', require('./handler').handler.bind(client));

    // <----- Menginisiasi Whatsapp ke BOT ----->
    client.initialize();
    logger.info("Mencoba koneski ke WaWeb...")

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
