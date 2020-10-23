const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SupportServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'supportserver',
      aliases: ['support', 'ss'],
      usage: 'supportserver',
      description: 'Displays the invite link to Calypso\'s Discord Support Server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Support Server')
      .setThumbnail('https://cdn.discordapp.com/icons/740853470571266139/99ca1f28d7b321b4aebbc873c2d29150.png')
      .setDescription('Click [here](https://discord.gg/dK28KCp) to join the Bam bot Support Server!')
      .addField('Other Links', 
        '**[Invite Me](https://discord.com/oauth2/authorize?client_id=768267784425439243&permissions=8&scope=bot) | ' +
        '[The Bam Fam](https://discord.gg/WjBx2sB)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
