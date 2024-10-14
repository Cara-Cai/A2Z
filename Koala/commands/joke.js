// joke.js
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch'; // Ensure node-fetch is installed

// API configuration
const url = 'https://api.apileague.com/retrieve-random-joke?include-tags=animal';
const apiKey = '0cff5581a0cc459ab7c58bb065644231';

// Command Builder
export const data = new SlashCommandBuilder()
  .setName('joke')
  .setDescription('Replies with a random animal joke!');

// Execute function
export async function execute(interaction) {
  try {
    // Acknowledge the command to avoid timeout
    await interaction.deferReply();

    // Fetch the joke from the API
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'x-api-key': apiKey },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch joke. Status: ${response.status}`);
    }

    const data = await response.json();
    const joke = data.joke || "Couldn't find a joke. Try again later! 🐶";

    // Send the joke as a follow-up message
    await interaction.followUp(joke);
  } catch (error) {
    console.error('Error fetching joke:', error);
    await interaction.followUp('There was an error fetching the joke. Please try again later.');
  }
}



