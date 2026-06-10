var menu_status = false;

function menu(){
    if(menu_status == false)
        {
            menu_status = true;
            document.getElementById("title_flash_button_all_content").style.left = "0px";
            document.getElementById("title_flash_button_all_content").style.opacity = "1";
        }
    else
        {
            menu_status = false;
            document.getElementById("title_flash_button_all_content").style.left = "-500px";
            document.getElementById("title_flash_button_all_content").style.opacity = "0";
        }
}
        async function loadPanel() {
            try {
                const response = await fetch('/global/panel.html'); 
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

        document.addEventListener('DOMContentLoaded', loadPanel);