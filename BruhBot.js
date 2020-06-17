const Discord = require('discord.js');
const bot = new Discord.Client();
const { prefix, token } = require('./config.json');

bot.once('ready', () => {
	console.log('Login successful.');
});

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	switch(command) {
		case '-purpose':
			message.channel.send('You don\'t have a purpose either. Shut up, ' + message.author).catch(err => {
				console.error(err);
				message.channel.send('There was an error trying to execute that command. Try again or just admit that you\'re a dumbass.');
			});
			break;
		case 'args-info':
			
		default:
			message.channel.send(':moyai: that\'s not even a valid command what\'s wrong with you')
}});

bot.login(token);