// functions/send_order.js
const fetch = require('node-fetch');

// ሚስጥራዊ መረጃዎች ከ Netlify Dashboard Environment Variables ይመጣሉ
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; 
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const data = JSON.parse(event.body);

        const telegramMessage = data.message;
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(telegramMessage)}&parse_mode=Markdown`;

        await fetch(telegramUrl);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Order processed successfully!" })
        };
    } catch (error) {
        console.error("Error sending order to Telegram:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to process order." })
        };
    }
};

