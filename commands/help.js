const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'Tells you what things there are and what the thing does.',
	aliases: ['h'],
	usage: '[command name]',
	execute(message, args, Discord) {
        const { errorReplies } = require(`../errors.json`);
        const randomError = errorReplies[Math.floor(Math.random() * errorReplies.length)];
        const data = [];
        const { commands } = message.client;
        if (!args.length) {
            data.push('Here\'s all my stuff:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nSend \`${prefix}help [thing]\` to get info on a specific thing`);
            return message.channel.send(data, { split: true })
				.catch(error => {
                    console.log(error);
                    message.channel.send(randomError);
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
            const embed = new Discord.MessageEmbed()
                .setTitle('File an issue')
                .setURL('https://joelne.digital/BBissue')
                .setColor('#ff0000')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                .addField('Error:', 'Command not found', true);
            message.channel.send(embed);
            return;
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`Description: ${command.description}`);
        if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`);


        message.channel.send(data, { split: true });
	},
};