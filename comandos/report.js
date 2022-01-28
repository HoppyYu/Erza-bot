const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'report',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {
  const member2 = client.users.cache.get('924332536715436062');

    const erro = args.join(' ');

    if (!erro) return message.reply(`:x: - Escreva o erro/bug.`);

    const abc = new MessageEmbed()
      .setColor('RED')
      .setTitle('Novo Erro/Bug reportado!')
      .addFields(
        {
          name: `Autor:`,
          value: message.author.tag.toString(),
        },
        {
          name: 'Servidor:',
          value: message.guild.name,
        },
        {
          name: 'Server Id:',
          value: message.guild.id,
        },
        {
          name: 'Erro:',
          value: erro,
        },
      )
      .setTimestamp();

    member2.send({ embeds: [abc] });

const embed = new MessageEmbed()
      .setTitle('✅ || Sucesso!')
      .setDescription(`**${message.author} Olá! Agradeço seu report! isso me ajuda a corrigir erros e etc! aguarde até o erro ser arrumado! 😉**`)    
      .setColor("RANDOM")
      .setTimestamp()

      message.channel.send({ embeds: [embed] });
  
}
}