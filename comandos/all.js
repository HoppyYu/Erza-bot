module.exports = {
    name: "removerall",
    run: async (client, message, args) => {
        message.guild.members.cache.filter(m => m.send).map(m => {
m.roles.remove("Id do cargo")
         
})
message.reply("Cargos removidos")
    },
};