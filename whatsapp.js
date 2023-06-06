const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const EventEmitter = require("events");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
  authStrategy: new LocalAuth(),
});
const eventEmitter = new EventEmitter();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Web está listo!");
});

client.on("message_create", async (message) => {
  if (message.body.includes("[Discord]")) return;

  if (message.type === "image") {
    const mediafile = await message.downloadMedia();
    console.log(mediafile.mimetype, mediafile.data.length);
    //How to save that object as a file? =====================================

    fs.writeFile(
      "./public/upload/" + message.timestamp + ".png",
      mediafile.data,
      "base64",
      (err) => {
        if (err) {
          console.log(err);
        }
        const text = `/public/upload/${message.timestamp}.png`;
        eventEmitter.emit("whatsappMessageMedia", text);
      }
    );
  } else if (message.type === "chat") {
    const text = `[WhatsApp] ${message.from}: ${message.body}`;
    eventEmitter.emit("whatsappMessage", text);
  }
});

client.initialize();

module.exports = {
  client,
  eventEmitter,
};
