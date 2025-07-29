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

    // Отправляем данные через Telegram WebApp API
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(data));
      showScreen('screen3');
    } else {
      alert("Ошибка: Telegram WebApp API недоступен.");
    }
  });
});

// Функция переключения экранов
function showScreen(screenId) {
  document.getElementById('screen1').classList.add('hidden');
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('screen3').classList.add('hidden');
  document.getElementById(screenId).classList.remove('hidden');
}
