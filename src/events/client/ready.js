module.exports = (client) => {
    console.log(`${client.user.tag} is ready to serve ${client.guilds.cache.size} guilds.`);
    client.user.setPresence({
        activities: [
            {
                name: 'with my code',
                // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
                type: 'PLAYING',
            },
        ],
        // Status --> online, idle, dnd, invisible
        status: 'online',
    });
};
