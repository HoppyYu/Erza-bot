const client = require("../index");
const config = require("../config.json")
    const Discord = require("discord.js")
const db = require("quick.db")
const pa = require("../package.json")
client.on("ready", () => { 
let dono = client.users.cache.get(config.owner)
if(!dono) dono = "Não foi setado!!!"

const cc = new Discord.WebhookClient({id:"911630490820284437", token: "xg0SapGyO1aUwnjAO3ok6vtvGmqmRny2j8sJ5vbQ_fnbgRd2PHspFf21O6S_VVzCQafG"})
let embed = new Discord.MessageEmbed()
.setDescription(`\`\`\`
Iniciado em: ${client.user.username}
Id: ${client.user.id}
Servers: ${client.guilds.cache.size}
Users: ${client.users.cache.size}
Bot: ${pa.name}
Meu dono: ${dono.tag} \`\`\``)
.setImage(client.user.avatarURL())
.addField("Convite:", `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)


cc.send({embeds: [embed] })

  
    console.log(`Estou on`);
    client.user.setActivity("Atualizando || 😅")

    



  
});


