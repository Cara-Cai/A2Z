// Import necessary modules
import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import { config } from 'dotenv'; // Load environment variables from .env

// Import command modules
import * as koala from './commands/koala.js';
import * as greeting from './commands/greeting.js'; 
import * as joke from './commands/joke.js'; 
import * as wheel from './commands/wheel.js'; // Import the wheel.js command

// Load environment variables
config();

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds], // Ensuring the bot has the required intents
});

// Store commands in a collection
client.commands = new Collection();
client.commands.set(koala.data.name, koala);
client.commands.set(greeting.data.name, greeting);
client.commands.set(joke.data.name, joke); 
client.commands.set(wheel.data.name, wheel); 

// When the client is ready, log a message
client.once(Events.ClientReady, () => {
  console.log('💖 Bot is online!');
});

// Login to Discord with your bot's token
client.login(process.env.TOKEN);

// Listen for interactions (slash commands)
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction); // Execute the appropriate command
  } catch (error) {
    console.error('Error executing command:', error);
    await interaction.reply({
      content: 'There was an error executing this command!',
      ephemeral: true, // Ensure only the user sees the error message
    });
  }
});
