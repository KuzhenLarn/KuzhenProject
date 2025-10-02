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
	background-image: url("BGdiv.png");
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
background-image: url("BG.png");
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

<?php
if ($_FILES && $_FILES["filename"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filename']['tmp_name'],$upload_path . 'DeinopLogoEvent' . '.png') && move_uploaded_file($_FILES['filename']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename"]["name"];
    move_uploaded_file($_FILES["filename"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename" size="10"/><br /><br />
<input type="submit" value="DeinopLogoEvent" />
</form>



<hr color=black width=50% align=left>
<?php
if ($_FILES && $_FILES["filename1"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filename1']['tmp_name'],$upload_path . 'Loading1' . '.png') && move_uploaded_file($_FILES['filename1']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename1"]["name"];
    move_uploaded_file($_FILES["filename1"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename1" size="10"/><br /><br />
<input type="submit" value="Loading1" />
</form>
<?php
if ($_FILES && $_FILES["filename2"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filename2']['tmp_name'],$upload_path . 'Loading2' . '.png') && move_uploaded_file($_FILES['filename2']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename2"]["name"];
    move_uploaded_file($_FILES["filename2"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename2" size="10"/><br /><br />
<input type="submit" value="Loading2" />
</form>
<?php
if ($_FILES && $_FILES["filename3"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filename3']['tmp_name'],$upload_path . 'Loading3' . '.png') && move_uploaded_file($_FILES['filename3']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename3"]["name"];
    move_uploaded_file($_FILES["filename3"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename3" size="10"/><br /><br />
<input type="submit" value="Loading3" />
</form>


<hr color=black width=50% align=left>
<?php
if ($_FILES && $_FILES["filename4"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filename4']['tmp_name'],$upload_path . 'BGmenu' . '.png') && move_uploaded_file($_FILES['filename4']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename4"]["name"];
    move_uploaded_file($_FILES["filename4"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename4" size="10"/><br /><br />
<input type="submit" value="BGmenu" />
</form>








<a href="DeinopLogoEvent.png" download>Скачать DeinopLogoEvent</a>
<a href="Loading1.png" download>Скачать Loading1</a>
<a href="Loading2.png" download>Скачать Loading2</a>
<a href="Loading3.png" download>Скачать Loading3</a>
<a href="BGmenu.png" download>Скачать BGmenu</a><br>
<a href="../settings/version.txt" download>Скачать version</a>
<a href="../settings/event.txt" download>Скачать event</a>
<a href="../settings/progress.txt" download>Скачать progress</a>




</div>



<?php require_once("../../panel/panel.html"); ?>
</body>
</html>