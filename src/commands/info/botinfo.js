const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const pkg = require(__basedir + '/package.json');
const { owner } = require('../../utils/emojis.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot', 'bi'],
      usage: 'botinfo',
      description: 'Fetches Bam Bot\'s bot information.',
      type: client.types.INFO
    });
  }
  run(message) {
    const botOwner = message.client.users.cache.get(message.client.ownerId);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const tech = stripIndent`
      Version     :: ${pkg.version}
      Library     :: Discord.js v12.3.1
      Environment :: Node.js v12.16.3
      Database    :: SQLite
    `;
    const embed = new MessageEmbed()
      .setTitle('Bam Bot\'s Bot Information')
      .setDescription(oneLine`
        Bam Bot is a customized bot for **The Bam Fam** or the youtuber [Bam](https://www.youtube.com/channel/UCug4DqvS29kga1Z9GwrwAwQ) that was programmed by **xtor#0001**. The Bot comes packaged with a variety of commands and 
        a multitude of settings that provide for a overall good experience.
        Bam Bot Development first went live on **October 15th, 2020**.
      `)
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Client ID', `\`${message.client.user.id}\``, true)
      .addField(`Developer ${owner}`, botOwner, true)
      .addField('Tech', `\`\`\`asciidoc\n${tech}\`\`\``)
      .addField(
        'Links', 
        '**[Invite Me](https://discord.com/oauth2/authorize?client_id=768267784425439243&permissions=8&scope=bot) | ' +
        '[Support Server](https://discord.gg/dK28KCp) | ' +
        '[The Bam Fam](https://discord.gg/WjBx2sB)**'
      )
      .setImage('https://images-ext-2.discordapp.net/external/opbEuEsdk3V5rxNF4cE0Ti7CxjpaN0jApj2mjF7DKKY/https/media.discordapp.net/attachments/745857341005758566/768519816784379924/standard_4.gif')
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('#f342ff');
    message.channel.send(embed);
  }
};
