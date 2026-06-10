<?php
session_start();
if(isset($_SESSION['name'])){
    $text = $_POST['text'];
	date_default_timezone_set('Europe/Kyiv');
	
$now = time();
echo $now;

    $fp = fopen("log.html", 'a');
    fwrite($fp, "
	
	<div class='msgln' id='blockms'>
	<font size=5><b>".$_SESSION['name']."</b></font><font size=3>: ".stripslashes(htmlspecialchars($text))."</font>
	<br><font size=1>(".date("g:i A").")</font></div><br>
	
	

	
	
	");
    fclose($fp);
}
?>