import Telegram from 'node-telegram-bot-api';
import {load_dotenv} from "./dotenv.js";
import process from 'node:process';
import axios from "axios";

load_dotenv();

const token = process.env.TELEGRAM_BOT_TOKEN,
    key = process.env.OPEN_WEATHER_API_KEY;
const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=${key}&q=`;
const cities = [
    'Kyiv',
    'Lviv',
    'Kharkiv',
    'Sevastopol'
], number_of_intervals = 8; // Limit number of intervals to one day to reduce amounts of text in the chat

if (!token) {
    console.log('Please set bot token (TELEGRAM_BOT_TOKEN in the .env file)');
    process.exit(1);
}

if (!key) {
    console.log('Please set OpenWeather API key (OPEN_WEATHER_API_KEY in the .env file)');
    process.exit(1);
}


const bot = new Telegram(token, {polling: true});


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hello! Please use /weather command to get the weather forecast for a city of your choice.');
})


bot.onText(/\/weather/, (msg) => {
    let kb = [];
    for (let city of cities) {
        kb.push([{text: city, callback_data: city}])
    }

    const options = {
        reply_markup: {
            inline_keyboard: kb
        }
    }

    bot.sendMessage(msg.chat.id, 'Please choose a city to get the weather forecast for:', options);
})

bot.on('callback_query', (query) => {
    if (cities.includes(query.data)) {
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [{text: '3-hour intervals', callback_data: `~${query.data}`}],
                    [{text: '6-hour intervals', callback_data: `#${query.data}`}]
                ]
            }
        }

        bot.sendMessage(query.message.chat.id, `You selected ${query.data}. Now please choose intervals of the forecast:`, options)
    }
})


bot.on('callback_query', (query) => {
    if (query.data[0] === '~' || query.data[0] === '#') {
        let interval = query.data[0] === '~' ? 1 : 2;
        let filled_url = `${weather_api_url}${query.data.slice(1)}&cnt=${number_of_intervals}`;

        axios.get(filled_url).then(response => {
            if (response.data.cod === "200") {
                let message = `Weather forecast for ${response.data.city.name}\n`;
                for (let x = 0; x < response.data.list.length; x += interval) {
                    let forecast = response.data.list[x];
                    message += `At ${forecast.dt_txt}:\n` +
                        `Temperature: ${forecast.main.temp}C\n` +
                        `Feels like: ${forecast.main.feels_like}C\n` +
                        `Humidity: ${forecast.main.humidity}%\n` +
                        `Wind speed: ${forecast.wind.speed}m/s\n` +
                        `Cloudiness: ${forecast.clouds.all}%\n` +
                        `Weather: ${forecast.weather[0].description}\n\n`
                }
                bot.sendMessage(query.message.chat.id, message);
            }
        })
    }
})
