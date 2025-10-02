<html>
<head>

<title>Free Creat Site</title>

<link rel="icon" href="/img/20191217_090702.png" type="image/png">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=0.8">
<style>
#div1{
	width: 90%;
	height: 100%;
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
	if(move_uploaded_file($_FILES['filename']['tmp_name'],$upload_path . 'BG' . '.png') && move_uploaded_file($_FILES['filename']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename"]["name"];
    move_uploaded_file($_FILES["filename"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename" size="10"/><br /><br />
<input type="submit" value="Загрузить" />
</form>


<?php
if ($_FILES && $_FILES["filename1"]["error"]== UPLOAD_ERR_OK)
{
	if(move_uploaded_file($_FILES['filename1']['tmp_name'],$upload_path . 'BGdiv' . '.png') && move_uploaded_file($_FILES['filename1']['size'],$upload_path = 2097152 ))
    $name = $_FILES["filename1"]["name"];
    move_uploaded_file($_FILES["filename1"]["tmp_name"], $name);
    echo "Файл загружен";}
?>
<h2>Загрузка файла</h2>
<form method="post" enctype="multipart/form-data">
Выберите файл: <input type="file" name="filename1" size="10"/><br /><br />
<input type="submit" value="Загрузить" />
</form>

<a href="BG.png" download>Скачать файл 1</a>
<a href="BGdiv.png" download>Скачать файл 2</a>
<a href="viev.php">просмотреть сайт</a>




</div>



<?php require_once("../panel/panel.html"); ?>
</body>
</html>