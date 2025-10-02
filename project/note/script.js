// Дані для Firebase з вашого попереднього запиту
const firebaseConfig = {
    apiKey: "AIzaSyCcFuhxHksM-CQeA7nauOiViBxIEQ6Ntcc",
    authDomain: "sign-kuzhen-larn.firebaseapp.com",
    databaseURL: "https://sign-kuzhen-larn-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sign-kuzhen-larn",
    storageBucket: "sign-kuzhen-larn.firebasestorage.app",
    messagingSenderId: "583941626709",
    appId: "1:583941626709:web:80edbccc6740f6c49caddc",
    measurementId: "G-5T7M0MFJ1F"
};
let panelOsnova = 0;
// Ініціалізуємо Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Зберігаємо посилання на HTML-елементи для зручності
const saveForm = document.getElementById('save-form');
const titleInput = document.getElementById('title');
const textInput = document.getElementById('text');
const ownerInput = document.getElementById('owner');
const colorInput = document.getElementById('color');
const passwordInput = document.getElementById('password');
const saveButton = saveForm.querySelector('button');
const statusDiv = document.getElementById('status-message');
const postsContainer = document.getElementById('posts-container');

// Змінна для зберігання ключа запису, який зараз редагується
let editingKey = null;

// Функція для генерації 15-символьного хеш-коду
function generateHash() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Функція для форматування дати
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Функція для збереження або оновлення запису
function saveOrUpdatePost(e) {
    e.preventDefault();

    const title = titleInput.value;
    const text = textInput.value;
    const owner = ownerInput.value;
    const color = colorInput.value;
    const password = passwordInput.value;
    const timestamp = Date.now();

    if (editingKey) {
        // Режим оновлення
        database.ref('posts/' + editingKey).update({
            title: title,
            text: text,
            owner: owner,
            color: color,
            password: password || null,
            timestamp: timestamp
        })
        .then(() => {
            statusDiv.style.color = 'green';
            statusDiv.textContent = `Запис успішно оновлено!`;
            resetForm();
        })
        .catch(error => {
            statusDiv.style.color = 'red';
            statusDiv.textContent = `Помилка: ${error.message}`;
            console.error("Помилка при оновленні запису:", error);
        });
    } else {
        // Режим створення
        const key = generateHash();
        database.ref('posts/' + key).set({
            title: title,
            text: text,
            owner: owner,
            color: color,
            hash: key,
            password: password || null,
            timestamp: timestamp
        })
        .then(() => {
            statusDiv.style.color = 'green';
            statusDiv.innerHTML = `Дані успішно збережено! Ваш хеш-код: <b>${key}</b>`;
            titleInput.value = '';
            textInput.value = '';
            ownerInput.value = '';
            passwordInput.value = '';
        })
        .catch(error => {
            statusDiv.style.color = 'red';
            statusDiv.textContent = `Помилка: ${error.message}`;
            console.error("Помилка при записі в базу даних:", error);
        });
    }
}
function funosnovaPanel(){
    if (panelOsnova == 1){
        document.getElementById("block-osnova-info").style.display = "inline-block";
        panelOsnova = 0;
    } else {
        document.getElementById("block-osnova-info").style.display = "none";
        panelOsnova = 1;
    }
}

saveForm.addEventListener('submit', saveOrUpdatePost);
function loadPosts() {
    database.ref('posts').on('value', (snapshot) => {
        postsContainer.innerHTML = '';
        const postsArray = [];
        snapshot.forEach((childSnapshot) => {
            postsArray.push({
                key: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        // Сортуємо записи за часом створення (timestamp) у зворотному порядку
        postsArray.sort((a, b) => b.timestamp - a.timestamp);

        postsArray.forEach((post) => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.classList.add('color-card');
            postCard.style.borderColor = post.color || '#ccc';

            let ownerText = post.owner ? `<span>${post.owner}</span>` : '';
            let dateText = post.timestamp ? `<span><br>${formatTimestamp(post.timestamp)}</span>` : '';

            postCard.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.text}</p>
                <div class="owner-and-date">
                    ${ownerText}
                    ${dateText}
                </div>
                <button onclick="requestAuth('${post.key}', 'edit')">Редагувати</button>
                <button onclick="requestAuth('${post.key}', 'delete')">Видалити</button>
            `;
            postsContainer.appendChild(postCard);
        });
    });
}

// ... інший код без змін ...

// Функція для запиту хеш-коду або пароля
function requestAuth(key, action) {
    const enteredValue = prompt("Будь ласка, введіть хеш-код або пароль:");

    if (enteredValue === null) return;

    database.ref('posts/' + key).once('value', (snapshot) => {
        const post = snapshot.val();
        if (post) {
            // Перевіряємо хеш-код або пароль
            if (enteredValue === post.hash || enteredValue === post.password) {
                if (action === 'edit') {
                    resetForm();
                    titleInput.value = post.title;
                    textInput.value = post.text;
                    ownerInput.value = post.owner;
                    colorInput.value = post.color;
                    passwordInput.value = post.password || '';
                    saveButton.textContent = 'Зберегти зміни';
                    editingKey = key;
                    statusDiv.textContent = 'Ви в режимі редагування.';
                } else if (action === 'delete') {
                    if (confirm('Ви впевнені, що хочете видалити цей запис?')) {
                        performDelete(key);
                    }
                }
            } else {
                alert("Неправильний хеш-код або пароль. Спробуйте ще раз.");
            }
        } else {
            alert("Запис не знайдено.");
        }
    });
}

// Функція для видалення запису
async function performDelete(key) {
    try {
        await database.ref('posts/' + key).remove();
        statusDiv.style.color = 'green';
        statusDiv.textContent = 'Запис успішно видалено.';
        resetForm();
    } catch (error) {
        statusDiv.style.color = 'red';
        statusDiv.textContent = `Помилка при видаленні: ${error.message}`;
        console.error("Помилка Firebase:", error);
    }
}

// Функція для скидання форми в початковий стан
function resetForm() {
    titleInput.value = '';
    textInput.value = '';
    ownerInput.value = '';
    colorInput.value = '#005B99';
    passwordInput.value = '';
    saveButton.textContent = 'Зберегти';
    editingKey = null;
    statusDiv.textContent = '';
}

document.addEventListener('DOMContentLoaded', loadPosts);