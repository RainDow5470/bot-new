document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anketaForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
      full_name: formData.get('full_name'),
      age: formData.get('age'),
      height: formData.get('height'),
      phone: formData.get('phone'),
      telegram: formData.get('telegram'),
      instagram: formData.get('instagram'),
      about: formData.get('about'),
      city: formData.get('city')
    };

    const token = "7688922353:AAGp_223_CC4rsDG4VdHLc1zYW6wx_hRvBU";
    const chat_id = "676271308";

    const text =
      "📥 Новая анкета:\n\n" +
      `👤 Имя и фамилия: ${data.full_name}\n` +
      `🎂 Возраст: ${data.age}\n` +
      `📏 Рост: ${data.height} см\n` +
      `📞 Телефон: ${data.phone}\n` +
      `💬 Telegram: ${data.telegram}\n` +
      `📸 Instagram: ${data.instagram}\n` +
      `📝 О себе: ${data.about}\n` +
      `🌆 Город: ${data.city}`;

    // ❗ Telegram API напрямую не будет работать из браузера (CORS)
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text
      })
    })
    .then(response => {
      if (response.ok) {
        alert("Анкета отправлена успешно!");
        form.reset();
      } else {
        alert("Ошибка отправки: Unauthorized (нельзя напрямую из браузера)");
      }
    })
    .catch(error => {
      alert("Сетевая ошибка. Скорее всего, CORS запрет.");
      console.error(error);
    });
  });
});
