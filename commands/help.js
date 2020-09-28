const { prefix } = require('../info/config.json');
module.exports = {
  name: 'help',
  description: 'Tells you what things there are and what the thing does.',
  aliases: ['h'],
  usage: '[<command>]',
  execute(message, args, Discord) {
    const { errorReplies } = require(`../info/errors.json`);
    const randomError = errorReplies[Math.floor(Math.random() * errorReplies.length)];
    const { commands } = message.client;
    if (!args.length) {
      const embed1 = new Discord.MessageEmbed()
        .setTitle('Stuff you can do with me')
        .setColor('#0000ff')
        .setDescription('Send \`${prefix}help [thing]\` to get info on a specific command')
        .addField('Commands', commands.map(command => command.name).join('\n '), true);
      message.channel.send(embed1)
        .catch(error => {
          const embedError = new Discord.MessageEmbed()
            .setTitle('File an issue')
            .setURL('https://joelne.digital/BBissue')
            .setColor('#ff0000')
            .setAuthor(message.member.nickname, message.author.avatarURL())
            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
            .addField('Error:', error, true);
          console.log(error);
          message.channel.send(embedError);
        }); return
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
      const embed = new Discord.MessageEmbed()
        .setTitle('File an issue')
        .setURL('https://joelne.digital/BBissue')
        .setColor('#ff0000')
        .setAuthor(message.member.nickname, message.author.avatarURL())
        .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
        .addField('Error:', 'Command not found', true);
      message.channel.send(embed);
      return;
    }

    const embed2 = new Discord.MessageEmbed()
      .setTitle(command.name)
      .setColor('#0000ff');

    if (command.aliases) embed2.addField(`Aliases`, command.aliases.join(', '), false);
    if (command.description) embed2.addField(`Description`, command.description, false);
    if (command.usage) embed2.addField(`Usage`, `${prefix}${command.name} ${command.usage}`, false);
    if (command.args) embed2.addField('Arguments required', ':white_check_mark:', true)
    else embed2.addField('Arguments required', ':x:', true);
    message.channel.send(embed2);
  },
};