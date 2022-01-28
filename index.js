const Discord = require("discord.js");
const client = new Discord.Client({intents: 32767,});
const config = require("./config.json")
const {MessageEmbed} = require("discord.js")

{client.login("OTI1NDg3OTg0OTc4MDU5MzE2.Yct12g.4f64EfSZQkXCjUqWQ-be4p9IAwk") 
 console.log("foi")}

module.exports = client;
client.commands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);


const ms = require("ms")
const db = require("quick.db")



client.on("guildMemberAdd", async (member) => {
    let minAge = ms("30 days")
    let createdAt = new Date(member.user.createdAt).getTime();
    let diff = new Date() - createdAt
    let antifake = db.fetch(`antifake_${member.guild.id}`)
    if( antifake === null ) antifake = "off"
    let dias = Math.floor( diff / 86400000)
    let loganti = db.fetch(`logantifake_${member.guild.id}`)

    let embed = new MessageEmbed()
    .setAuthor(`${member.user.tag} / (${member.user.id})`)
    .setDescription(`**${member.user.tag} foi expulso**`)
    .addField(`**Motivo:**`, `> \`Filtro anti fake ativado\``)
    .addField(`**Conta criada há:**`, `> \`${dias} dias\``)
    .setThumbnail( member.user.avatarURL({ dynamic: true, size: 2048 }))
    .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setColor("RED")
    .setTimestamp();

    if( antifake === "off" ) return;

    if( antifake === "on" ) {
        if( minAge > diff ) {
            member.kick();
            if(loganti == null ) return;
            const log = client.channels.cache.get(loganti)
            log.send({ embeds:[embed]})        
        }
    }
})



client.on("guildMemberAdd", (member) => {
    let autorole = db.fetch(`autorole_${member.guild.id}`)
    let cargo = db.get(`autorolec_${member.guild.id}`)
    if( cargo == null ) return;
    if( autorole == null ) autorole = "off"
    if( autorole === "off" ) return;
    if( autorole === "on" ) member.roles.add(cargo)
})

client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.channel.type == 'DM')
    return
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Erza`)
    .setDescription(`Meu prefixo é \`${prefix}\` Obtenha ajuda com \`.help\``)

    return message.reply({ embeds: [embed] })
    }
    });