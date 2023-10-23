import Telegram from 'node-telegram-bot-api';
import {Command} from "commander";
import {load_dotenv, supplement_dotenv} from "./dotenv.js";
import process from 'node:process';

load_dotenv();

let run_command = 'npm run cli';
let token = process.env.TELEGRAM_BOT_TOKEN,
    chatId = process.env.CHAT_ID;

function check_dotenv() {
    if (!token) {
        console.log(`Please set bot token first: ${run_command} set-bot-token <token>`);
        process.exit(1);
    }

    if (!chatId) {
        console.log(`Please set chat id first: ${run_command} set-chat-id <chat_id>`);
        process.exit(1);
    }
}

function handle_error(e) {
    if (e.response.statusCode === 401) {
        console.log(`Bot token is probably invalid. Please set a valid token: ${run_command} set-bot-token <token>`);
        process.exit(1);
    }
    else if (e.response.statusCode === 400) {
        console.log(`Chat id is probably invalid, or you haven't sent /start to the bot. If the latter is false then please set a valid chat id: ${run_command} set-chat-id <chat_id>`);
        process.exit(1);
    }
    else
        throw e;
}


const bot = new Telegram(token, {polling: false});
const program = new Command();

program.name(run_command)
    .description('Send message or photo to telegram chat')
    .version('1.0.0');

program.command('set-bot-token')
    .description('Set bot token to send messages with')
    .argument('<token>', 'Telegram bot token')
    .action((message) => {
        supplement_dotenv('TELEGRAM_BOT_TOKEN', message)
        console.log('Bot token set successfully.');
    });

program.command('set-chat-id')
    .description('Set chat id to send messages to')
    .argument('<chat_id>', 'Chat id')
    .action((message) => {
        supplement_dotenv('CHAT_ID', message)
        console.log('Chat id set successfully.');
    });

program.command('send-message')
    .description('Send text message to telegram chat')
    .argument('<message>', 'Message to send')
    .alias('m')
    .action((message) => {
        check_dotenv();
        bot.sendMessage(chatId, message).then((res) => {
            console.log('Message sent successfully.');
        }).catch(handle_error);
    });
program.command('send-photo')
    .description('Send photo to telegram chat')
    .argument('<path>', 'Path to photo')
    .alias('p')
    .action((path) => {
        check_dotenv();
        bot.sendPhoto(chatId, path).then((res) => {
            console.log('Photo sent successfully.');
        }).catch(handle_error);
    });

program.parse();
