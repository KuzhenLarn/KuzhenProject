<?php
session_start();
if(isset($_SESSION['name'])){
    $name = $_SESSION['name'];
    $file = "online.json";
    $users = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    
    $now = time();
    $users[$name] = $now;

    $timeout = 20; 
    $changed = false;

    foreach($users as $u => $last_active) {
        if ($now - $last_active > $timeout) {
            unset($users[$u]);
            $changed = true;
            
            $escapedUser = htmlspecialchars($u, ENT_QUOTES, 'UTF-8');
            $fp = fopen("log.html", 'a');
            fwrite($fp, "<div class='msgln system-msg' data-user='".$escapedUser."' data-event='timeout'><i>Користувач <b>". $escapedUser ."</b> відключився (таймаут).</i><br></div>\n");
            fclose($fp);
        }
    }

    file_put_contents($file, json_encode($users));
}
?>