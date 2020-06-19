const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: 'Tells you what things there are and what the thing does.',
	aliases: ['h'],
	usage: '[command name]',
	execute(message, args) {
        const data = [];
        const { commands } = message.client;
        if (!args.length) {
            data.push('Here\'s all my stuff:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nSend \`${prefix}help [thing]\` to get info on a specific thing`);
            return message.channel.send(data, { split: true })
				.catch(error => {
					console.error(`Could not send help ${message.author.tag}.\n`, error);
                    message.reply('I ran into an error. Must\'ve left my glasses at home.');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
            return message.reply(':moyai: that\'s not even a valid command');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`Aliases: ${command.aliases.join(', ')}`);
        if (command.description) data.push(`Description: ${command.description}`);
        if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
	},
};