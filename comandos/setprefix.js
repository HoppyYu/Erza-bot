const Discord = require("discord.js");
const config  = require("../config.json")
const db = require("quick.db")
 
module.exports = {
    name: 'setprefix',
    description: "Seta meu prefix",
    author: "Pani Kaz#88",
run: (client, message, args) => {
  let p = args[0]
  if(!p) return message.reply("Você deve falar o novo prefix")
    if(p.length > 5) return message.reply("O prefix não pode ser maior que 5 caracteres")

  db.set(`prefix_${message.guild.id}`, p)
  message.reply(`Prefixo setado para : ${p}`)

}
}