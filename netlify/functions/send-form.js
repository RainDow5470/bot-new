const fetch = require("node-fetch");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const ADMIN_ID = process.env.ADMIN_ID;
  const API_TOKEN = process.env.API_TOKEN;

  const message = `
📝 <b>Новая анкета!</b>

👤 <b>Имя и фамилия:</b> ${data.full_name}
🎂 <b>Возраст:</b> ${data.age}
📏 <b>Рост:</b> ${data.height} см
📞 <b>Телефон:</b> ${data.phone}
💬 <b>Telegram:</b> ${data.telegram}
📸 <b>Instagram:</b> ${data.instagram}
🏙 <b>Город:</b> ${data.city}

🧠 <b>О себе:</b>
${data.about}
`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${API_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_ID,
        text: message,
        parse_mode: "HTML"
      }),
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: error.message }),
    };
  }
};
