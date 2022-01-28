const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'setsuggest',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`${message.author} **Voce não possui permissão para esse comando.**`);

      
    let channelMENTIONED = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channelMENTIONED) return message.reply(`:x: **|** Você não inseriu um canal válido, mencione o canal ou coloque o ID.`);

      await db.set(`channelSUGERIR_${message.guild.id}`, `${channelMENTIONED.id}`)
      message.reply(`✅ **|** Certo, setei o canal de sugestões para ${channelMENTIONED}`);

}
}