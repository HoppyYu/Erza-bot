const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'avatar',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {

  let user = message.mentions.users.first() || message.author
let embed = new Discord.MessageEmbed()
.setTitle(`🖼️ ${user.username}`)
.setDescription(`*Aqui está o avatar de:* \`${user.tag}\`\n**Baixe** [aqui](${user.displayAvatarURL({dynamic: true, size: 2048})})`)
  .setColor("PURPLE")
.setImage(user.displayAvatarURL({dynamic: true, size: 2048}))

  message.reply({ embeds : [embed] })
  
}
}