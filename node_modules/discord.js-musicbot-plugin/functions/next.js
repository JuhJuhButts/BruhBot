module.exports = async function next(message) {
    let songs = Object.keys(message.client.songQueue);
    let voiceChannel = message.client.channels.cache.get(message.client.music.voiceChannel);
    if (songs.length > 0){
        let videoID = songs[0];
        let connection = await voiceChannel.join();
        message.client.music.connection = connection;
        let url = 'https://www.youtube.com/watch?v=' + videoID;
        message.client.music.stream(connection, url, videoID, message);
        message.client.playing = true;
        message.client.currVideoID = videoID;
    } else {
        console.log('queue empty');
        message.channel.send('No songs to play. Goodbye');
        voiceChannel.leave();
        console.log(message.client.songQueue);
    }
};