import Telegram from 'node-telegram-bot-api';
import {load_dotenv} from "./dotenv.js";
import process from 'node:process';
import axios from "axios";

load_dotenv();

const token = process.env.TELEGRAM_BOT_TOKEN;
const monobank_api_url = 'https://api.monobank.ua/bank/currency',
    privatbank_api_url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11';
const currencies = {'USD': 840, 'EUR': 978};

let last_update_timestamp = 0,
    last_updates;

if (!token) {
    console.log('Please set bot token (TELEGRAM_BOT_TOKEN in the .env file)');
    process.exit(1);
}


async function get_data(url) {
    return await axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


async function update_data() {
    let current_timestamp = Math.trunc(Date.now() / 1000);
    if (current_timestamp - last_update_timestamp > 60) {
        last_updates = await Promise.all([get_data(monobank_api_url), get_data(privatbank_api_url)]);
        last_update_timestamp = current_timestamp;
    }
}


const bot = new Telegram(token, {polling: true});


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hello! Please use /currency command to choose a currency to get information about.');
})


bot.onText(/\/currency/, (msg) => {
    let kb = [];
    for (let currency in currencies) {
        kb.push([{text: currency, callback_data: currency}])
    }

    const options = {
        reply_markup: {
            inline_keyboard: kb
        }
    }

    bot.sendMessage(msg.chat.id, 'Please choose a city to get the weather forecast for:', options);
})


bot.on('callback_query', (query) => {
    let message = `${query.data} exchange rates:\n`;
    update_data().then(() => {
        message += '💸 Monobank:\n'
        last_updates[0].find((item) => {
            if (item.currencyCodeA === currencies[query.data] && item.currencyCodeB === 980) {
                message += `➡ Buy: ${item.rateBuy}\n` +
                    `⬅ Sell: ${item.rateSell}\n`;
            }
        })
        message += '\n💸 Privatbank:\n'
        last_updates[1].find((item) => {
            if (item.ccy === query.data) {
                message += `➡ Buy: ${item.buy}\n` +
                    `⬅ Sell: ${item.sale}\n`;
            }
        })
        bot.sendMessage(query.message.chat.id, message);
    })
})
