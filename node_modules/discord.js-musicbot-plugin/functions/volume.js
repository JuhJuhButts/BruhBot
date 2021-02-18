module.exports = function volume(message) {
    if (!message.client.playing) {
        message.channel.send('Nothing is playing');
    } else if (message.content === "!volume") {
        let volume = message.client.music.connection.dispatcher.volume * 10;
        message.channel.send('Current volume is: ' + volume);
    } else {
        let volume = message.content.split(' ')[1];
        if (isNaN(volume)) {
            message.channel.send('Volume must be a number');
        } else if (volume > 10 || volume < 1) {
            message.channel.send('Please choose a setting between 1 and 10');
        } else {
            message.client.music.connection.dispatcher.setVolume(volume / 10);
        }
    }
};