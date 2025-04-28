require('dotenv').config(); // Memuat variabel lingkungan dari .env
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

// Menggunakan token dari file .env
const token = process.env.DISCORD_TOKEN;

// Game: Slot
function slotGame() {
    const outcomes = ['🍎', '🍌', '🍒', '🍇', '🍉'];
    const spin = () => outcomes[Math.floor(Math.random() * outcomes.length)];
    return `${spin()} | ${spin()} | ${spin()}`;
}

// Game: Gacha
function gachaGame() {
    const rewards = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];
    const winner = rewards[Math.floor(Math.random() * rewards.length)];
    return winner;
}

// Ketika bot online
client.once('ready', () => {
    console.log('KuyBot is online!');
});

// Command untuk bermain slot
client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === '!slot') {
        const result = slotGame();
        await message.reply(`Result: ${result}`);
        
        // Pemenang dapat hadiah berupa kode redeem
        if (result === '🍎 | 🍎 | 🍎') {
            const redeemCode = 'REDEEM1234';
            await message.author.send(`Selamat! Kamu mendapatkan hadiah! Gunakan kode redeem: ${redeemCode}`);
        }
    }

    // Command untuk bermain gacha
    if (message.content.toLowerCase() === '!gacha') {
        const result = gachaGame();
        await message.reply(`Kamu mendapatkan: ${result}`);
        
        // Pemenang dapat hadiah berupa kode redeem
        const redeemCode = 'REDEEM5678';
        await message.author.send(`Selamat! Kamu mendapatkan hadiah! Gunakan kode redeem: ${redeemCode}`);
    }
});

// Login bot dengan token dari .env
client.login(token);
