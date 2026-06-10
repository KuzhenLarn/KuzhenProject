<html>
<head>

<title>Deinop Online Setting</title>

<link rel="icon" href="/img/20191217_090702.png" type="image/png">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=0.8">
<style>
#div1{
	width: 90%;
	height: 100%%;
	background: rgb(0, 0, 0, 0.5);
	background-image: url("../image/BGdiv.png");
	background-size: 100% 100%;
	margin: auto auto;
	margin-top: 100px;
	padding: 10px 10px;
	border: 1px solid white;
	border-radius: 10px;
}
#div2{
	width: 500px;
	height: 500px;
	background: rgb(0, 0, 0, 0.5);
	display: inline-block;
	margin: 10px 10px;

}
body
{
background-image: url("../image/BG.png");
background-color: rgb(0, 0, 0);
background-repeat: no-repeat;
background-attachment: fixed;
background-size: 100% 100%;
overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: blue orange;
  transition-duration: 0.4s;
}

@media(max-width: 1024px) {
body
{
background-position: center;
background-size: 200% 100%;
}
}

</style>
</head>
<body>


<div id="div1">

<hr color=black width=50% align=left>
<?php
if ($_FILES && $_FILES["filetxt"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filetxt']['tmp_name'],$upload_path . 'version' . '.txt') && move_uploaded_file($_FILES['filetxt']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filetxt"]["name"];
    move_uploaded_file($_FILES["filetxt"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filetxt" size="10"/><br /><br />
<input type="submit" value="setting version" />
</form>
<?php
if ($_FILES && $_FILES["filetxt1"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filetxt1']['tmp_name'],$upload_path . 'event' . '.txt') && move_uploaded_file($_FILES['filetxt1']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filetxt1"]["name"];
    move_uploaded_file($_FILES["filetxt1"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filetxt1" size="10"/><br /><br />
<input type="submit" value="setting version" />
</form>
<?php
if ($_FILES && $_FILES["filetxt2"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filetxt2']['tmp_name'],$upload_path . 'progress' . '.txt') && move_uploaded_file($_FILES['filetxt2']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filetxt2"]["name"];
    move_uploaded_file($_FILES["filetxt2"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filetxt2" size="10"/><br /><br />
<input type="submit" value="setting version" />
</form>







<a href="version.txt" download>Скачать version</a><?php require_once("version.txt"); ?><br>
<a href="event.txt" download>Скачать event</a><?php require_once("event.txt"); ?><br>
<a href="progress.txt" download>Скачать progress</a><?php require_once("progress.txt"); ?><br>




</div>



<?php require_once("../../panel/panel.html"); ?>
</body>
</html>