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

    const payload = {
      full_name: formData.get('full_name'),
      age: formData.get('age'),
      height: formData.get('height'),
      phone: formData.get('phone'),
      telegram: formData.get('telegram'),
      instagram: formData.get('instagram'),
      city: formData.get('city'),
      about: formData.get('about'),
    };

    // Отправка анкеты админу через Netlify Function
    fetch('/.netlify/functions/send-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        form.reset();
        showScreen('screen3');
      } else {
        alert('Ошибка при отправке: ' + (data.description || 'Неизвестная ошибка'));
      }
    })
    .catch(err => alert('Ошибка подключения: ' + err));
  });
});
