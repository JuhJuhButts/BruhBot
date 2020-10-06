module.exports = { // eslint-disable-line no-undef
    name: 'kill',
    description: 'Kills BruhBot',
    args: false,
    execute(message, args, Discord) {
        if (message.author.id === '268138992606773248') {
            message.channel.send(new Discord.MessageEmbed().setTitle('Rebooting...').setColor('#00ff00')).then(() => { process.exit() }); // eslint-disable-line no-undef
        } else {
            const { errorReplies } = require('../info/json/errors.json'); // eslint-disable-line no-undef
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