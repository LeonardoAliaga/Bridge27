const { eventEmitter, client: whatsappClient } = require("./whatsapp.js");
const { client: discordClient } = require("./discord.js");
require("dotenv").config();

eventEmitter.on("whatsappMessage", (message) => {
  const channelId = `${process.env.DC_CHANNEL_ID}`; // Reemplaza con el ID de tu canal de Discord
  const channel = discordClient.channels.cache.get(channelId);
  channel.send(message);
});
eventEmitter.on("whatsappMessageMedia", async (message) => {
  const channelId = `${process.env.DC_CHANNEL_ID}`; // Reemplaza con el ID de tu canal de Discord
  console.log(message);
  try {
    const channel = discordClient.channels.cache.get(channelId);

    await channel.send({
      content: "Aqui esta la imagen:",
      files: [__dirname + `${message}`],
    });
  } catch (error) {
    console.error("Error al enviar la imagen:", error);
  }
});

eventEmitter.on("discordMessage", (message) => {
  console.log("mensaje enviado");
  const chatId = "51928750742@c.us"; // Reemplaza con tu número de teléfono
  whatsappClient.sendMessage(chatId, message);
});
