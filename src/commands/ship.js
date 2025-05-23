const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Allows you to ship a user')
    .addMentionableOption((option) =>
      option
        .setName('user1')
        .setDescription('The user you wanna ship with')
        .setRequired(true)
    )
    .addMentionableOption((option) =>
      option
        .setName('user2')
        .setDescription('The user you wanna ship with')
        .setRequired(true)
    ),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: ({ interaction, client }) => {
    const user1 = interaction.options.getMember('user1');
    const user2 = interaction.options.getMember('user2');

    randomNumber = Math.floor(Math.random() * 100) + 1;

    interaction.reply(
      `:heart: | **${user1.user.username}** Shipped **${user2.user.username}**. **${randomNumber}%**`
    );
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: false,
    deleted: true,
  },
};
