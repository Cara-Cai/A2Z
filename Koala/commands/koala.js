import { SlashCommandBuilder } from 'discord.js';

// Command Builder export
export const data = new SlashCommandBuilder()
    .setName('koala')
    .setDescription('Replies koala!');

// Execute function export
export async function execute(interaction) {
    await interaction.reply('koala!');
}
