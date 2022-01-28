const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'calc',
    description: "",
    author: "Hoppy",
run: (client, message, args) => {
  let calculadora_entrada = args.slice().join(" ")
        let calculadora_mensagem_erro = 'Atenção!, você não colocou um calculo'
        if(!calculadora_entrada) return message.channel.send(calculadora_mensagem_erro)
        let calculadora_resultado = math_js.evaluate(calculadora_entrada)
        let calculadora_usuario = message.author
        let calculadora_mensagem_saida = new MessageEmbed()
        .setTitle(`📟 Calc! `)
        .addField(`Pergunta:`, `\`\`\`js\n${calculadora_entrada}\`\`\``)
        .addField(`Resultado:`, `\`\`\`js\n${calculadora_resultado}\`\`\``)
        .setColor('GREEN')
        .setThumbnail(calculadora_usuario.displayAvatarURL({dynamic: true}))
        let calculadora_canal = message.channel
        calculadora_canal.send({embeds: [calculadora_mensagem_saida]});
      
}
}