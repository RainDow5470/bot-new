// script.js

function showScreen(screenId) {
  // Скрываем только нужные экраны
  document.querySelectorAll('#screen1, #screen2, #screen3').forEach(el => {
    el.classList.add('hidden');
  });

  // Показываем нужный экран
  document.getElementById(screenId).classList.remove('hidden');

  // Меняем фон в зависимости от экрана
  if (screenId === "screen1") {
    document.body.style.backgroundImage = "url('background1.webp')";
  } else if (screenId === "screen2") {
    document.body.style.backgroundImage = "url('background2.webp')";
  } else if (screenId === "screen3") {
    document.body.style.backgroundImage = "url('background3.webp')";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anketaForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const text = `
📝 <b>Новая анкета!</b>

👤 <b>Имя и фамилия:</b> ${formData.get('full_name')}
🎂 <b>Возраст:</b> ${formData.get('age')}
📏 <b>Рост:</b> ${formData.get('height')} см
📞 <b>Телефон:</b> ${formData.get('phone')}
💬 <b>Telegram:</b> ${formData.get('telegram')}
📸 <b>Instagram:</b> ${formData.get('instagram')}
🏙 <b>Город:</b> ${formData.get('city')}


🧠 <b>О себе:</b>
${formData.get('about')}
`;

    // Отправка анкеты админу
    fetch('https://api.telegram.org/bot7688922353:AAHVCgR0bV8OfSCZiKS32QFVELCJhgkX128/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: 676271308,
        text: text,
        parse_mode: 'HTML'
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        form.reset();
        showScreen('screen3');
      } else {
        alert('Ошибка при отправке: ' + data.description);
      }
    })
    .catch(err => alert('Ошибка подключения: ' + err));
  });
});
