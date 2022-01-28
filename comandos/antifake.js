// Comando feito por PH#2771



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
    name: 'antifake',
    description: "",
    author: "Hoppy",
    
    run: (client, message, args) => {
 
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.react("❌");
        let anti = db.fetch(`antifake_${message.guild.id}`) 
        if( anti === null || anti === "off" ) {
            anti = "off"
            id = "on"
            label = "Ativar"
            style = "SUCCESS"
        } else {
            id = "off"
            label = "Desativar"
            style = "DANGER" 
        }
        let loganti = db.fetch(`logantifake_${message.guild.id}`)
        if( loganti == null ) {
            loganti = "Nenhum canal definido"
            nomebutton = "Setar canal"
        } else {
            loganti = `<#${loganti}>`
            nomebutton = "Editar canal"
        }

        const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId(`${id}`)
            .setLabel(`${label}`)
            .setStyle(`${style}`),
            new MessageButton()
            .setCustomId("canal")
            .setLabel(`${nomebutton}`)
            .setStyle("SECONDARY"),
        )

        const embed = new  MessageEmbed()
        .setTitle("Bem vindo ao painel do sistema ⚠️ anti—fake")
        .addField(`**No momento o sistema se encontra:**`, `\`${anti}\``)
        .addField(`**Canal de log:**`, `${loganti}`)
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor(message.guild.me.displayHexColor)

        const on = new  MessageEmbed()
        .setTitle("Sucesso o sistema foi ativado")
        .addField(`✅ **Agora o sistema se encontra:**`, `\`on\``)
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor("GREEN")

        const off = new  MessageEmbed()
        .setTitle("❌ Sucesso o sistema foi desativado")
        .addField(`**Agora o sistema se encontra:**`, `\`off\``)
        .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setColor("RED")

        let filter1 = (m) => m.author.id === message.author.id;

        const msg = message.channel.send({ embeds: [embed], components: [button]})

        const collector = msg.createMessageComponentCollector({ componentType: "BUTTON" })

        collector.on("collect", interaction => {
            if( message.author.id != interaction.user.id ) return interaction.reply({ content: `Apenas ${message.author} pode reagir em algum button`, ephemeral: true })
            switch(interaction.customId) {
                case 'off':
                    db.set(`antifake_${message.guild.id}`, "off")
                    msg.edit({ embeds: [off], components: []})
                break;
                case 'on':
                    db.set(`antifake_${message.guild.id}`, "on")
                    msg.edit({ embeds: [on], components: [] })
                break;
                case 'canal':
                    interaction.reply({
                        content: "**SETAR CANAL DE LOGS** opção foi selecionada! Agora, forneça um canal de log.",
                        ephemeral: true 
                         })
                    const collector = interaction.channel.createMessageCollector({ max: 1, filter: filter1})
                    collector.on("collect", async(m) => {
                        const canal = m.mentions.channels.first() || m.guild.channels.cache.get(args[0]) || m.guild.channels.cache.find(
                            r => r.name.toLowerCase() === m.content.toLocaleLowerCase())
                        if(!canal || canal.type === "GUILD_VOICE") {
                            return message.channel.send({ content: "Canal invalido" })
                        }
                        db.set(`logantifake_${message.guild.id}`, canal.id)
                        const sucessomsg = message.channel.send({ content: `Sucesso o canal ${canal} foi setado!`})

                        const embed1 = new  MessageEmbed()
                        .setTitle("Bem vindo ao painel do sistema antifake")
                        .addField(`**No momento o sistema se encontra:**`, `\`${anti}\``)
                        .addField(`**Canal de log:**`, `${canal}`)
                        .setThumbnail(m.author.avatarURL({ dynamic: true, size: 2048 }))
                        .setFooter(m.guild.name, m.guild.iconURL({ dynamic: true, size: 2048 }))
                        .setColor("#D0D2D3")
                        msg.edit({ embeds: [embed1], components: [button] })
                        setTimeout( () => {
                            sucessomsg.delete();
                            m.delete();
                        }, 5000)
                    })
                break;
            }
        })
    },
};
