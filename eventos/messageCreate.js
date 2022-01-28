const client = require("../index");
var config = require("../config.json");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const db = require("quick.db")





const globPromise = promisify(glob);
client.on('messageCreate', async message => {

if(message.channel.type == "dm") return





let prefix =   db.get(`prefix_${message.guild.id}`)
if(prefix == null) prefix = config.prefix
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;


	
			if (
				message.author.bot ||
				!message.guild ||
				!message.content.toLowerCase().startsWith(prefix)
			)
				return;



try{
			const [cmd, ...args] = message.content
				.slice(prefix.length)
				.trim()
				.split(" ");
			const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
		
			if (!command) return;


			await command.run(client, message, args);
	
} catch(err) {
  console.log("[ ERR ] \n", err)
}
		  })
