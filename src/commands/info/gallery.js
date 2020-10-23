const Command = require('../Command.js');
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');
const art = [
  'https://cdn.discordapp.com/icons/740853470571266139/99ca1f28d7b321b4aebbc873c2d29150.png',
  'https://cdn.discordapp.com/avatars/389897621747007489/5d4e24099dc0b2ef57e9cdd7e6cfe7c7.png',
  'https://media.discordapp.net/attachments/740853471003279402/768588195452420116/AATXAJwFFyd5SNOAUJHFhrGCZkAcraS_1-pCU9Mn_eAVs176-c-k-c0x00ffffff-no-rj.png',
  'https://media.discordapp.net/attachments/745866355622019174/768588671258722324/unknown.png',
  'https://media.discordapp.net/attachments/745866355622019174/768588832500744272/AATXAJxlFzjz6ufUwA0dgOjvXS68xiDe1uaHp0UENGjaZgs176-c-k-c0x00ffffff-no-rj.png'
];

module.exports = class GalleryCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'gallery',
      aliases: ['art'],
      usage: 'gallery',
      description: 'Displays a gallery of Bam\'s pictures.',
      type: client.types.INFO,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS']
    });
  }
  run(message) {
    let n = 0;
    const embed = new MessageEmbed()
      .setTitle('Profile pictures')
      .setDescription('Profile pictures courtesy of BAM.')
      .setImage(art[n])
      .setFooter(
        'Expires after three minutes.\n' + message.member.displayName,  
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor('#f342ff');
    const json = embed.toJSON();
    const previous = () => {
      (n <= 0) ? n = art.length - 1 : n--;
      return new MessageEmbed(json).setImage(art[n]);
    };
    const next = () => {
      (n >= art.length - 1) ? n = 0 : n++;
      return new MessageEmbed(json).setImage(art[n]);
    };

    const reactions = {
      '◀️': previous,
      '▶️': next,
      '⏹️': null,
    };

    const menu = new ReactionMenu(
      message.client,
      message.channel,
      message.member,
      embed,
      null,
      null,
      reactions,
      180000
    );

    menu.reactions['⏹️'] = menu.stop.bind(menu);
    
  }
};