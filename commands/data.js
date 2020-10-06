module.exports = { // eslint-disable-line no-undef
    name: 'data',
    description: 'Add or remove data (restricted to JuhJuhButt only)',
    args: true,
    // eslint-disable-next-line no-unused-vars
    execute(message, args, Discord, mainEnmap, Enmap) {
        const { errorReplies } = require(`../info/json/errors.json`); // eslint-disable-line no-undef
        const JuhJuhButtID = require('../info/json/config.json'); // eslint-disable-line no-undef
        if (message.author.id === JuhJuhButtID) {
            if (args[1] === 'true' || args[1] === 'false') {
                if (args[1] === 'true') {
                    mainEnmap.set(args[0], true);
                } else {
                    mainEnmap.set(args[0], false)
                }
            } else {
                mainEnmap.set(args[0], args[1]);
            }
            message.channel.send('Odie, the deed is done.')
        } else {
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