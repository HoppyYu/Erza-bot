const Discord = require("discord.js");
const config = require("../config.json")
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "help",


    run: async(client, message, args) => {


        let embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle('🗃️ || Help')
        .setDescription(`Menu de ajuda!\n\n — Informações Aplicação:\nNome: Erza\nComandos: 23\nAplicação: Bot\nStatus: Online\nVersão: Teste\nPrefixo: !\n\nStatus Comandos:\n***Siga estas instruções dos comandos***\n\🟢 — Comando online!\n\🟠 — Comando em atualização!\n🔴 — Comando não funcionando!\n\n**Use o painel para ver meus comandos**`)
    


        let pani_1 = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId('menu')
        .setPlaceholder('Clique aqui.') 
        .addOptions([
               {
                    label: 'Geral',
                    description: 'Pagina 1',
                    emoji: '💬',
                    value: '1',
               },
               {
                label: 'Pag 2 ',
                description: 'PAG 2',
                emoji: '2️⃣',
                value: '2',
               },
              {
                label: 'Pag 3 ',
                description: 'PAG 3',
                emoji: '3️⃣',
                value: '3',
               },
                     {
                label: 'Pag 4 ',
                description: 'PAG 4',
                emoji: '4️⃣',
                value: '4',
               },
            ])

        );


        message.channel.send({ embeds: [embed], components: [pani_1] }).then(msg => {


            const pani_2 = (interaction) => 
            interaction.isSelectMenu()
      
          const coletor = msg.createMessageComponentCollector({
            pani_2, time: 30000
          });
      

          coletor.on('collect', async (collected) => {

            let valor = collected.values[0]
            collected.deferUpdate()




            if (valor === "1") {


        let embed_1 = new Discord.MessageEmbed()
        .setColor(
          config.embed
        )
        .setTitle('💬 || Categoria: Geral')
        .setDescription(`\🟢 !help\n\🟢 !setprefix\n\🟢 !news\n\🟢 !avatar`)
msg.edit({embeds: [embed_1]})



            }
                   if (valor === "2") {


        let embed_1 = new Discord.MessageEmbed()
        .setColor(
          config.embed
        )
        .setDescription(`PAG 2`)
msg.edit({embeds: [embed_1]})



            }
                   if (valor === "3") {


        let embed_1 = new Discord.MessageEmbed()
        .setColor(
          config.embed
        )
        .setDescription(`PAG 3`)
msg.edit({embeds: [embed_1]})



            }
       if (valor === "4") {


        let embed_1 = new Discord.MessageEmbed()
        .setColor(
          config.embed
        )
        .setDescription(`PAG 4`)
msg.edit({embeds: [embed_1]})



            }


           
                
            


          })

          
            coletor.on('end', () => {    let embeds = new Discord.MessageEmbed()
            .setDescription("Esse painel expirou")
             msg.edit({ 
          
              embeds: [embeds], components: [] }); });    

        });

        

    }
              }