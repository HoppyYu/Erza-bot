const Discord = require("discord.js");
const config = require("../config.json")
module.exports = {
    name: 'say',
    run: async (client, message, args) => {
      if(!message.member.roles.cache.get("897821778645237831")) return

      let embed = new Discord.MessageEmbed()
.setTitle("```p!say <#canal> <frase>```")
let canal = message.mentions.channels.first()
if(!canal) return message.reply({embeds: [embed]})
let msg = args.slice(1).join(' ');

if(!msg) return message.reply({embeds: [embed]})

let name = (`${message.author.username}`);
 let user = message.author       


 let imagem = `${message.author.avatarURL()}`

 let avatar = {avatar: imagem}





 canal.createWebhook(name, avatar).then(webhook => { 
 webhook.send(msg).then(() => webhook.delete())})
     message.reply("Enviado!")
    }

}