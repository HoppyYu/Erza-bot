const { MessageEmbed } = require('discord.js')
const ms = require('ms');
const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'setvip',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {
  if(!message.guild.me.permissions.has("ADMINISTRATOR")) return message.reply({ content:`Você precisa da permissão de Administrador para usar este comando.` });
  const Member = message.mentions.members.first() || ( message.guild.members.cache.get (args[0]));
                     let User = message.mentions.members.first();
                     let role = message.mentions.roles.first();
                     let Time = args[2];
                         if(!User) return message.reply({ content:`Mencione o usuário que desejar setar o vip.`});
                         if(!role) return message.reply({ content:`Mencione o vip que desejar estar setando.`});
           
               const EmbedPremium = new MessageEmbed().setColor('#ff0000').setTimestamp()
                   .setTitle(" Vip Adicionado ")
                   .setDescription(`**⭐⭐⭐⭐⭐Vip adicionado⭐⭐⭐⭐⭐ \n Vip, ${role} \n Duração, 1M**`)
             let VIP = message.guild.roles.cache.find(r => r.id === role.id);
                 User.roles.add(VIP)
                     message.channel.send({ embeds: [EmbedPremium] }).then(message => {
                         setTimeout(() => { User.roles.remove(VIP)
                         message.channel.send({ content: `**${User} O tempo do seu vip esgotou!.**`})
                     }, ms(Time))
                 })

  
}
}