const { 

    Message, 
    Client, 
    MessageActionRow, 
    MessageButton, 
    MessageEmbed,
    Interaction,
} = require("discord.js");
const db = require("quick.db")
const Discord = require("discord.js");
const config  = require("../config.json")

 
module.exports = {
    name: 'autorole',
    description: "",
    author: "Hoppy",
    run: (client, message, args) => {
  
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.react("❌");
        let autorole = db.fetch(`autorole_${message.guild.id}`) 
        if( autorole == null || autorole === "off"  ) {
            autorole = "off"
            customid = "on"
            label = "Ativar"
            style = "SUCCESS"
        } else {
            customid = "off"
            label = "Desativar"
            style = "DANGER"  
        }
        let cargo = db.get(`autorolec_${message.guild.id}`)
        if( cargo == null ) {
            cargo = "Nenhum cargo definido"
            nomebutton = "Setar cargo"
        } else {
            cargo = `<@&${cargo}>`
            nomebutton = "Editar cargo"
        }

        const button = new MessageActionRow().addComponents(

            new MessageButton()
            .setCustomId(`${customid}`)
            .setLabel(`${label}`)
            .setStyle(`${style}`),

            new MessageButton()
            .setCustomId("cargo")
            .setLabel(`${nomebutton}`)
            .setStyle("SECONDARY"),
        )

        const embed = new  MessageEmbed()
        .setTitle("Bem vindo ao painel do sistema autorole")
        .addField(`**No momento o sistema se encontra:**`, `> \`${autorole}\``)
        .addField(`Cargo setado:`, `> ${cargo}`)
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor("#D0D2D3")

        const on = new  MessageEmbed()
        .setTitle("Sucesso o sistema foi ativado")
        .addField(`**Agora o sistema se encontra:**`, `\`on\``)
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor("GREEN")

        const off = new  MessageEmbed()
        .setTitle("Sucesso o sistema foi desativado")
        .addField(`**Agora o sistema se encontra:**`, `\`off\``)
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor("RED")
        
        let filter1 = (m) => m.author.id === message.author.id;

        const msg = message.channel.send({ embeds: [embed], components: [button]})

        const collector = msg.createMessageComponentCollector({ componentType: "BUTTON" })

        collector.on("collect", async (interaction) => {
            if( message.author.id != interaction.user.id ) return interaction.reply({ content: `Apenas o(a) ${message.author} pode interagir nos botões!`, ephemeral: true })
            if(interaction.customId === "off") {
                if( autorole === "off" ) return interaction.reply({ content: "O sistema ja se encontra desativado", ephemeral: true })
                db.set(`autorole_${message.guild.id}`, "off")
                msg.edit({
                    embeds: [off],
                    components: []
                })
            }
            if(interaction.customId === "on") {
                if( cargo === "Nenhum cargo definido" ) return interaction.reply({ content: "Você precisa definir o cargo do autorole antes", ephemeral: true})
                if( message.author.id != interaction.user.id ) return interaction.reply({ content: `Apenas o(a) ${message.author} pode interagir nos botões!`, ephemeral: true })
                db.set(`autorole_${message.guild.id}`, "on")
                msg.edit({
                    embeds: [on],
                    components: []
                })
            }
            if(interaction.customId === "cargo") {
                interaction.reply({
                    content: "**AUTOROLE** opção foi selecionada! Agora, forneça um cargo para o autorole.",
                    ephemeral: true 
                     })
                let colletor = interaction.channel.createMessageCollector({ max: 1, filter: filter1 })
                colletor.on("collect", async (message) => {
                    const cargosetado = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
                    if(!cargosetado) return message.channel.send({ content: "Marque um cargo valido"})
                    if ( cargosetado.position >= message.guild.me.roles.highest.position )  {
                        let erromsg = message.channel.send({ content: `Meu cargo deve ser superior ao de **${cargosetado}**!`})
                        setTimeout(() => {
                            erromsg.delete();
                            message.delete();
                        }, 5000);
                        return;
                    }
                    db.set(`autorolec_${message.guild.id}`, cargosetado.id)
                    const msg2 = message.channel.send({ content: `Sucesso o cargo ${cargosetado} foi setado no autorole`})

                    const embededit = new  MessageEmbed()
                    .setTitle("Bem vindo ao painel do sistema autorole")
                    .addField(`**No momento o sistema se encontra:**`, `> \`${autorole}\``)
                    .addField(`Cargo setado:`, `> ${cargosetado}`)
                    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
                    .setColor("#D0D2D3")

                    msg.edit({
                        embeds: [embededit]
                    })
                        setTimeout(() => {
                            msg2.delete();
                            message.delete();
                        }, 5000);
                    
                })
            }
        })
    },
};
