module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: 'test',
    description: 'Check if the bot is working',
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: ({ interaction, client }) => {
    interaction.reply(`The bot is working! (${client.ws.ping}ms)`);
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: false,
    deleted: false,
  },
};
