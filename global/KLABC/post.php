<?php
session_start();

define('TIMEZONE', 'Europe/Kyiv');

date_default_timezone_set(TIMEZONE);

function linkifyText($text) {
    $text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    $pattern = '/\b((https?:\/\/|www\.)[^\s<]+)/i';

    return preg_replace_callback($pattern, function($matches) {
        $url = $matches[1];
        $href = preg_match('~^https?://~i', $url) ? $url : 'http://'.$url;
        $href = htmlspecialchars($href, ENT_QUOTES, 'UTF-8');
        $label = htmlspecialchars($url, ENT_QUOTES, 'UTF-8');
        return "<a href='$href' target='_blank' rel='noopener noreferrer'>$label</a>";
    }, $text);
}

if(isset($_SESSION['name'])){
    $text = $_POST['text'];

    $fp = fopen("log.html", 'a');
    
    fwrite($fp, "
    <div class='msgln blockms'>
        <span class='blockms-name'><b>".$_SESSION['name']."</b></span>
        <span class='blockms-text'>".linkifyText($text)."</span><br>
        <span class='blockms-time'>(".date("g:i A").")</span>
    </div>\n
    ");
    
    fclose($fp);
}
?>