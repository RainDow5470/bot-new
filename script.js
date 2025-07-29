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

    // Отправка через Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(data));
      showScreen('screen3');
    } else {
      alert("Ошибка: Telegram WebApp API недоступен.");
    }
  });
});

// Переключение экранов
function showScreen(screenId) {
  const screens = ['screen1', 'screen2', 'screen3'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('hidden');
    }
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.remove('hidden');
  }
}
