const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: '8ball',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {
  var respostas = [ //Coloque as resposta entre esses "[]"
            'sim', 'não', 'será ?', 'talvez', 'seu corno',
            'sai fora', 'me deixa em paz!', 'certeza', 'certeza absoluta',
            'vai encher o saco de outra!', 'sai cão!', 'eh é bb ?', 'você é fraco, lhe falta QI',
            'Quem sabe ?', 'Isso é um mistério...', 'Mais e claro', 'claro que não',
            'NUNCA', 
            'Não posso te contar', 'pergunta la no posto ipiranga', 'eu sempre soube...'

        ]

        if (!args[0]) return message.reply(`Sua cabeça está tão cheia que não consegue pensar em uma pergunta? Volte quando pensar em algo.😅`)
        if(args[0].length < 1) return message.channel.send("Você precisa fazer uma pergunta")

        let y = respostas[Math.floor(respostas.length * Math.random())]

        message.reply(`${y}`)

      
}
}
