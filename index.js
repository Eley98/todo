// Обработчики переключения иконок icon1 и icon2
const icon1 = document.getElementById('icon1');
const icon2 = document.getElementById('icon2');

if (icon1 && icon2) {
    icon1.addEventListener('click', () => {
        icon1.style.display = 'none';
        icon2.style.display = 'block';
    });

    icon2.addEventListener('click', () => {
        icon2.style.display = 'none';
        icon1.style.display = 'block';
    });
}

// Переключение темы
const toggleButton = document.getElementById('toggle-dark-mode');

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    // Модальное окно
    const addButton = document.getElementById('addNoteButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancelBtn');
    const addBtn = document.getElementById('addBtn');
    const noteInput = document.getElementById('noteInput');

    if (addButton && modalOverlay && cancelBtn && addBtn && noteInput) {
        addButton.addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
            noteInput.focus();
        });

        cancelBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            noteInput.value = '';
        });

        addBtn.addEventListener('click', () => {
            const noteText = noteInput.value.trim();
            if (noteText) {
                addNewNote(noteText);
                modalOverlay.style.display = 'none';
                noteInput.value = '';
            }
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
                noteInput.value = '';
            }
        });
    }

    // Функция добавления новой заметки и линии
    function addNewNote(text) {
        const newNote = document.createElement('div');
        newNote.className = 'note';
        newNote.innerHTML = `
            <p>
                <input type="checkbox" name="note${Date.now()}" class="click">${text}
            </p>
            <div class="icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="pen">
                    <path d="M7.17272 3.49106L0.5 10.1637V13.5H3.83636L10.5091 6.82736M7.17272 3.49106L9.5654 1.09837L9.5669 1.09695C9.8962 0.767585 10.0612 0.602613 10.2514 0.540824C10.4189 0.486392 10.5993 0.486392 10.7669 0.540824C10.9569 0.602571 11.1217 0.767352 11.4506 1.09625L12.9018 2.54738C13.2321 2.87769 13.3973 3.04292 13.4592 3.23337C13.5136 3.40088 13.5136 3.58133 13.4592 3.74885C13.3974 3.93916 13.2324 4.10414 12.9025 4.43398L12.9018 4.43468L10.5091 6.82736M7.17272 3.49106L10.5091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" class="basket">
                    <path d="M3.87426 7.61505C3.80724 6.74386 4.49607 6 5.36983 6H12.6302C13.504 6 14.1928 6.74385 14.1258 7.61505L13.6065 14.365C13.5464 15.1465 12.8948 15.75 12.1109 15.75H5.88907C5.10526 15.75 4.4536 15.1465 4.39348 14.365L3.87426 7.61505Z M14.625 3.75H3.375 M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z M10.5 9V12.75 M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                </svg>
            </div>`;
        const checkboxContainer = document.querySelector('.form_content');
        const lineBefore = document.createElement('div');
        lineBefore.className = 'line';

        checkboxContainer.appendChild(lineBefore);
        checkboxContainer.appendChild(newNote);

        // Добавляем обработчики для новых иконок
        addIconEventListeners(newNote);
    }

    // Обработчики для существующих заметок
    const existingNotes = document.querySelectorAll('.note');
    existingNotes.forEach(note => {
        addIconEventListeners(note);
    });

    // Назначение обработчиков для кнопок редактирования и удаления
    function addIconEventListeners(noteElement) {
        const penIcon = noteElement.querySelector('.pen');
        const basketIcon = noteElement.querySelector('.basket');

        if (penIcon) {
            // Редактировать заметку
            penIcon.addEventListener('click', () => {
                const noteText = noteElement.querySelector('p').textContent;
                const newText = prompt('Edit note:', noteText);
                if (newText && newText.trim()) {
                    noteElement.querySelector('p').innerHTML = `
                        <input type="checkbox" name="note${Date.now()}" class="click">${newText.trim()}
                    `;
                }
            });
        }

        if (basketIcon) {
            // Удалить заметку + линии
            basketIcon.addEventListener('click', () => {
                deleteNote(noteElement);
            });
        }
    }

    // Функция удаления заметки и связанных линий
    function deleteNote(note) {
        const container = document.querySelector('.form_content');

        const prevLine = note.previousElementSibling;
        const nextLine = note.nextElementSibling;

        // Удаляем линию перед заметкой, если есть
        if (prevLine && prevLine.classList.contains('line')) {
            prevLine.remove();
        }
        // Удаляем линию после заметки, если есть
        if (nextLine && nextLine.classList.contains('line')) {
            nextLine.remove();
        }

        // Удаляем саму заметку
        note.remove();
    }

    // Поиск и фильтрация
    const searchInput = document.querySelector('.form');
    const searchButton = document.querySelector('.search-button');
    const checkboxForm = document.querySelector('.form_content');
    const noResults = document.getElementById('noResults');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const notes = document.querySelectorAll('.note');
        let foundCount = 0;

        notes.forEach(note => {
            const noteText = note.querySelector('p').textContent.toLowerCase();
            if (noteText.includes(searchTerm)) {
                note.style.display = 'flex';
                foundCount++;
            } else {
                note.style.display = 'none';
            }
        });

        const lines = document.querySelectorAll('.line');
        lines.forEach(line => {
            const prevNote = line.previousElementSibling;
            const nextNote = line.nextElementSibling;
            if (
                (prevNote && prevNote.style.display === 'none') &&
                (nextNote && nextNote.style.display === 'none')
            ) {
                line.style.display = 'none';
            } else {
                line.style.display = 'block';
            }
        });

        if (searchTerm && foundCount === 0) {
            noResults.style.display = 'flex';
            checkboxForm.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            checkboxForm.style.display = 'block';
        }
    }

    // Обработчик поиска
    searchInput.addEventListener('input', performSearch);
    document.querySelector('.search-button').addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch();
        }
    });
});