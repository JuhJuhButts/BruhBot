module.exports = {
	name: 'purpose',
	description: 'Explains the relevance of its purpose.',
	guildOnly: true,
	args: false,
	execute(message, args) {
		message.channel.send(`You don't have a purpose either. Shut up, ${message.author.id}`)
	},
};