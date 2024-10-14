import { SlashCommandBuilder } from 'discord.js';

// Store names added by users
const namesList = [];

// Define the command with subcommands for adding, clearing, and spinning the wheel
export const data = new SlashCommandBuilder()
  .setName('wheel')
  .setDescription('Manage and spin the wheel of names!')
  .addSubcommand(subcommand =>
    subcommand
      .setName('add')
      .setDescription('Add one or more names to the wheel (space-separated)')
      .addStringOption(option =>
        option.setName('names')
          .setDescription('Space-separated names to add (e.g., Alice Bob Charlie)')
          .setRequired(true)
      )
  )
  .addSubcommand(subcommand =>
    subcommand.setName('clear').setDescription('Clear all names from the wheel')
  )
  .addSubcommand(subcommand =>
    subcommand.setName('spin').setDescription('Spin the wheel and pick a random name')
  );

// Execute function to handle wheel commands
export async function execute(interaction) {
  const subcommand = interaction.options.getSubcommand();

  if (subcommand === 'add') {
    const namesInput = interaction.options.getString('names');
    const newNames = namesInput.split(/\s+/).map(name => name.trim()); // Split by spaces

    namesList.push(...newNames); // Add names to the list
    await interaction.reply(`Added the following names to the wheel: ${newNames.join(', ')} 🎉`);
  } else if (subcommand === 'clear') {
    namesList.length = 0; // Clear the names list
    await interaction.reply('The wheel has been cleared! 🧹');
  } else if (subcommand === 'spin') {
    if (namesList.length === 0) {
      await interaction.reply('The wheel is empty! Add some names first. ❌');
    } else {
      const winner = namesList[Math.floor(Math.random() * namesList.length)];
      await interaction.reply(`🎡 The wheel has spun... and the winner is: **${winner}!** 🎉`);
    }
  }
}
