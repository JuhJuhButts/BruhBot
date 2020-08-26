module.exports = {
	name: 'kill',
	description: 'Kills BruhBot',
	guildOnly: false,
	args: false,
	execute(message, args, Discord) {
        if (message.author.id === '268138992606773248') {
            message.channel.send(new Discord.MessageEmbed().setTitle('Rebooting...').setColor('#00ff00')).then(() => {process.exit()});
        } else {
            const { errorReplies } = require('../info/errors.json');
            const embed = new Discord.MessageEmbed()
                .setTitle('File an issue')
                .setURL('https://joelne.digital/BBissue')
                .setColor('#ff0000')
                .setAuthor(message.member.nickname, message.author.avatarURL())
                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                .addField('Error:', 'Insufficient permissions', true);
            message.channel.send(embed);
        }
	},
};