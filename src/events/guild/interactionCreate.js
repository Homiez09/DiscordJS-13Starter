const { MessageEmbed } = require('discord.js');

module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        if (!client.slash.has(interaction.commandName)) return;
        if (!interaction.guild) return;

        const command = client.slash.get(interaction.commandName);
        try {
            if (command.userPerms) {
                if (!interaction.member.permissions.has(command.userPerms)) {
                    const embed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Error')
                        .setDescription('You are not allowed to use this command.')
                        .setFooter(
                            interaction.user.tag,
                            interaction.user.displayAvatarURL(),
                        );

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            if (command.botPerms) {
                if (!interaction.guild.me.permissions.has(command.botPerms)) {
                    const embed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Error')
                        .setDescription('Bot is not allowed to use this command.')
                        .setFooter(
                            interaction.user.tag,
                            interaction.user.displayAvatarURL(),
                        );

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            if (command.ownerOnly) {
                if (interaction.user.id !== process.env.OWNER_ID) {
                    const embed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Error')
                        .setDescription('You are not the owner of this bot.')
                        .setFooter(
                            interaction.user.tag,
                            interaction.user.displayAvatarURL(),
                        );

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            command.run(interaction, client);
        } catch (e) {
            console.log(e)
        }
    }
}