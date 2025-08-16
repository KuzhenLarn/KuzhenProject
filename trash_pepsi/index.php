<html>
<head>
<title>TrashPepsi</title>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
<link rel="icon" href="/img/Pepsi.png" type="image/png">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=0.8">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7664438787012438" crossorigin="anonymous"></script>

<style>
body
{
background-image: url("/img/BGpepsi2.png");
background-size: 100% 100%;
background-repeat: no-repeat;
background-attachment: fixed;
overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: blue orange;
}



#osnova
{
width: 300px;
height: 200px;
background-color: rgb(50, 50, 50, 0.5);
border: solid 0px red;
position: absolute;
left: 5%;
top: 100px;
}




@media(max-width: 1024px) {
#panel{
background-size: 400px 80%;
}

#osnova
{
width: 100%;
border: solid 0px rgb(139, 43, 43, 0.5);
background-color: rgb(139, 43, 43, 0.5);
}
}



#play1{
width: 300px;
height: 400px;
background-image: url("/img/posterTrashPepsi.png");
background-size: 100% 100%;
border: solid 3px #BB6E2C;
position: absolute;
left: 50px;
top: 100px;
transition-duration: 0.4s;
}#play1:hover{
transform: scale(1.1, 1.1);
}#playy1{
width: 98%;
height: 20%;
background-color: #5D3818;
border: solid 3px #BB6E2C; 
color: #BB6E2C;
transition-duration: 0.4s;
cursor: pointer;
position: absolute;
right: 1%;
bottom: 1%;
}#playy1:hover{
background-color: #BB6E2C;
border: solid 3px #5D3818; 
color: #5D3818;
transform: scale(1.1, 1.1);}

#play2{
width: 300px;
height: 400px;
background-image: url("/img/posterTrashPepsi2.png");
background-size: 100% 100%;
border: solid 3px #BB6E2C;
position: absolute;
left: 400px;
top: 100px;
transition-duration: 0.4s;
}#play2:hover{
transform: scale(1.1, 1.1);
}#playy2{
width: 98%;
height: 20%;
background-color: #5D3818;
border: solid 3px #BB6E2C; 
color: #BB6E2C;
transition-duration: 0.4s;
cursor: pointer;
position: absolute;
right: 1%;
bottom: 1%;
}#playy2:hover{
background-color: #BB6E2C;
border: solid 3px #5D3818; 
color: #5D3818;
transform: scale(1.1, 1.1);}

#play3{
width: 300px;
height: 400px;
background-image: url("/img/posterTrashPepsiPlus.png");
background-size: 100% 100%;
border: solid 3px #BB6E2C;
position: absolute;
left: 750px;
top: 100px;
transition-duration: 0.4s;
}#play3:hover{
transform: scale(1.1, 1.1);
}#playy3{
width: 98%;
height: 20%;
background-color: #5D3818;
border: solid 3px #BB6E2C; 
color: #BB6E2C;
transition-duration: 0.4s;
cursor: pointer;
position: absolute;
right: 1%;
bottom: 1%;
}#playy3:hover{
background-color: #BB6E2C;
border: solid 3px #5D3818; 
color: #5D3818;
transform: scale(1.1, 1.1);}

</style>
<script>


$(document).ready(function(){
	if(localStorage.getItem('End1') == 1){
		document.getElementById("play2").style.borderColor = "#3EFF00";
		document.getElementById("playy2").style.borderColor = "#3EFF00";
	}
	
	});
</script>
</head>
<body bgcolor=black>
<style>#loadingDiv{z-index:99999999;width: 100%;height: 100%;background: linear-gradient(0deg, <?php require_once("C:\OSPanel\domains\Kuzhen\gradientEN.txt"); ?>);position: fixed;left: 0;top: 0;transition-duration: 0.4s;}#loading{width: 100px;height: 100px;background-image: url("/img/loading.gif");background-size: 100% 100%;position: absolute;right: 100px;bottom: 100px;transition-duration: 0.4s;}</style><div id="loadingDiv"><font size=10 color=white face="Deinop" style="position: absolute; left: 100px; bottom: 100px;">Loading data</font><div id="loading"></div></div>

<div id="osnova">

<font size="5" color="white">Trash Pepsi and Trash Pepsi 2 not langl English</font><br><br>

<div id="play1"><center><button OnClick='location.href="pepsi/index.html"' id="playy1"><p><font size="6" id="pn" face="Deinop">PLAY</font></p></button></center></div>
<div id="play2"><center><button OnClick='location.href="pepsi2/index.html"' id="playy2"><p><font size="6" id="pn" face="Deinop">PLAY</font></p></button></center></div>
<div id="play3"><center><button OnClick='location.href="pepsi3/index.html"' id="playy3"><p><font size="6" id="pn" face="Deinop">SOON</font></p></button></center></div>



<?php require_once("../../panel/panel.html");?>
</body>
</html>