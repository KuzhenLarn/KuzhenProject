<?php
session_start();
if(isset($_SESSION['name']) && isset($_FILES['file'])){
    
    $file = $_FILES['file'];
    $uploadDir = 'uploads/';
    
    if($file['error'] !== UPLOAD_ERR_OK) {
        $errorMsg = "Невідома помилка завантаження.";
        if($file['error'] == UPLOAD_ERR_INI_SIZE) {
            $errorMsg = "Файл занадто великий! Сервер PHP обмежив завантаження.";
        }
        $fp = fopen("log.html", 'a');
        fwrite($fp, "<div class='msgln'><i><b>Системне повідомлення:</b> $errorMsg</i><br></div>\n");
        fclose($fp);
        exit;
    }
    
    if(!is_dir($uploadDir) || !is_writable($uploadDir)) {
        $fp = fopen("log.html", 'a');
        fwrite($fp, "<div class='msgln'><i><b>Системна помилка:</b> Немає прав на запис у папку uploads!</i><br></div>\n");
        fclose($fp);
        exit;
    }
    
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    $newFileName = uniqid('file_', true) . '.' . $extension;
    $uploadPath = $uploadDir . $newFileName;
    
    if(move_uploaded_file($file['tmp_name'], $uploadPath)) {
        date_default_timezone_set('Europe/Kyiv');
        $fp = fopen("log.html", 'a');
        
        $imgExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        
        if(in_array($extension, $imgExtensions)) {
            $chatHtml = "<a href='".$uploadPath."' target='_blank' rel='noopener noreferrer'><img src='".$uploadPath."' class='chat-image' alt='Фото від ".$_SESSION['name']."'></a>";
        } else {
            $origName = htmlspecialchars($file['name']);
            $chatHtml = "<a href='".$uploadPath."' target='_blank' class='chat-file-link'>📎 Файл: <b>".$origName."</b></a>";
        }
        
        fwrite($fp, "
        <div class='msgln blockms'>
            <span class='blockms-name'><b>".$_SESSION['name']."</b></span>
            <span class='blockms-text'>".$chatHtml."</span><br>
            <span class='blockms-time'>(".date("g:i A").")</span>
        </div>\n
        ");
        fclose($fp);
    }
}
?>
