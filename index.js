const btn = document.getElementById('Btn');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

btn.addEventListener('click', () => {
  if (img1.style.display === 'block') {
    img1.style.display = 'none';
    img2.style.display = 'block';

    document.body.classList.add('dark-theme');
  } else {
    img1.style.display = 'block';
    img2.style.display = 'none';

    document.body.classList.remove('dark-theme');
  }
});
// Получаем элементы
const openBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const cancelBtn = document.getElementById('cancelBtn');
const applyBtn = document.getElementById('applyBtn');

// Функция открыть модальное
function openModal() {
  modal.classList.add('active');
  overlay.classList.add('active');
}

// Функция закрыть модальное
function closeModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

// Обработчики
openBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
applyBtn.addEventListener('click', closeModal);

// Можно закрывать при клике вне окна
overlay.addEventListener('click', closeModal);



