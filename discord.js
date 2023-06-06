const { Client, GatewayIntentBits } = require("discord.js");
const { eventEmitter } = require("./whatsapp.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", () => {
  console.log(`Conectado como ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const text = `[Discord] ${message.author.username}: ${message.content}`;
  eventEmitter.emit("discordMessage", text);
});

client.login(process.env.DC_TOKEN);

module.exports = {
  client,
  eventEmitter,
};
