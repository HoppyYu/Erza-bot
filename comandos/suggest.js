const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'suggest',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {
  let prefixo = ("!")
    let channelSUGERIR = db.fetch(`channelSUGERIR_${message.guild.id}`)
    if (!channelSUGERIR) return message.reply(`:x: **|** Este servidor não setou nem um canal de sugestões... \`${prefixo}setsugerir <#canal>\``);
    let sugerirENVIAR = client.channels.cache.get(channelSUGERIR)
    let sugest茫o = args.slice(0).join(" ");
    if(!sugest茫o) return message.reply(`:x: **|** Você deve inserir uma sugestão, ${prefixo}sugerir <sugestão>.`);
    if (sugest茫o.length > 425) return interaction.reply(`:x: **|** A sugestão não pode ultrapassar 425 caracteres.`);
    let sugerirEMBED = new Discord.MessageEmbed()
    .setTitle(`⚠️ **-** Uma nova sugestão foi entregue!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`**Sugestão:**\n${sugestão}`)
    .setColor(`#2f3136`)
    .setFooter(`${message.guild.name}`, message.guild.iconURL())

      message.reply(`✅ **|** Certo, enviei sua sugestão, confira em ${sugerirENVIAR}.`)
      sugerirENVIAR.send({ content: `${message.author}`, embeds: [sugerirEMBED] }).then(msg => {

  msg.react('✅')
  msg.react('❌')
})
}
}