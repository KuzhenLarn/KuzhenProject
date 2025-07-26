var menu_status = false;

function menu(){
    if(menu_status == false)
        {
            menu_status = true;
            document.getElementById("title_flash_button_all_content").style.display = "inline";
        }
    else
        {
            menu_status = false;
            document.getElementById("title_flash_button_all_content").style.display = "none";
        }
}
        // Функція для завантаження вмісту файлу
        async function loadPanel() {
            try {
                const response = await fetch('global/panel.html'); // Шлях до твого файлу
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const panelContent = await response.text();
                document.getElementById('panel-container').innerHTML = panelContent;
            } catch (error) {
                console.error('Помилка завантаження панелі:', error);
                document.getElementById('panel-container').innerHTML = '<p>Не вдалося завантажити панель.</p>';
            }
        }

        // Викликаємо функцію після завантаження DOM
        document.addEventListener('DOMContentLoaded', loadPanel);