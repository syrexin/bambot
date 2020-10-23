const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class InviteMeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'inviteme',
      aliases: ['invite', 'invme', 'im'],
      usage: 'inviteme',
      description: 'Generates a link you can use to invite Bam Bot to your own server.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('Invite Me')
      .setThumbnail('https://cdn.discordapp.com/icons/740853470571266139/99ca1f28d7b321b4aebbc873c2d29150.png')
      .setDescription(oneLine`
        Click [here](https://discord.com/api/oauth2/authorize?client_id=768267784425439243&permissions=8&scope=bot)
        to invite me to your server!
      `)
      .addField('Other Links', 
        '**[Support Server](https://discord.gg/dK28KCp) | ' +
        '[The Bam Fam](https://discord.gg/WjBx2sB)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('#ff3cff')
    message.channel.send(embed);
  }
};
