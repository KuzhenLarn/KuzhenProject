<!DOCTYPE html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatPHP</title>
    <link type="text/css" rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <?php
    session_start();
    function loginForm(){
        echo'<div id="loginform">
        <form action="index.php" method="post">
            <p>Як вас звати?</p>
            <label for="name">Ім`я:</label>
            <input type="text" name="name" id="name" />
            <input type="submit" name="enter" id="enter" value="Далі" />
        </form>
        </div>';
    }
    if(isset($_POST['enter'])){
        if($_POST['name'] != ""){
            $_SESSION['name'] = stripslashes(htmlspecialchars($_POST['name']));
        } else {
            echo '<span class="error">Будь ласка введіть ім`я</span>';
        }
    }
    ?>
</head>
<body>
<?php
if(!isset($_SESSION['name'])){
    loginForm();
} else {
if(isset($_GET['logout'])){
    $fp = fopen("log.html", 'a');
    fwrite($fp, "<div class='msgln'><i>Користувач ". $_SESSION['name'] ." виходить з чату.</i><br></div>");
    fclose($fp);
    session_destroy();
    header("Location: index.php");
}
?>

<div id="wrapper">
    <div id="menu">
        <p class="welcome">Вітаємо, <b><?php echo $_SESSION['name']; ?></b></p>
        <p class="logout"><a id="exit" href="#">Вийти</a></p>
    </div>    
    <div id="chatbox">
        <?php if(file_exists("log.html") && filesize("log.html") > 0){
            $handle = fopen("log.html", "r");
            $contents = fread($handle, filesize("log.html"));
            fclose($handle);
            echo $contents;
        }
        ?>
    </div>
    <form name="message" action="">
        <div id="text_input">
            <input name="usermsg" type="text" id="usermsg" size="63" placeholder="Текст..." minlength="1" maxlength="100" required />
            <input name="submitmsg" type="submit" id="submitmsg" value="Send" />
        </div>
    </form>
</div>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $("#exit").click(function(){
        var exit = confirm("Ви впевнені?");
        if(exit){
            window.location = 'index.php?logout=true';
        }
    });
   
    $("#submitmsg").click(function(){
        var clientmsg = $("#usermsg").val();
        $.post("post.php", {text: clientmsg});
        $("#usermsg").val("");
        return false;
    });
   
    function loadLog(){
        $.ajax({
            url: "log.html",
            cache: false,
            success: function(html){
                $("#chatbox").html(html);
                $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight);
            }
        });
    }
    setInterval(loadLog, 1000);
});
</script>

<?php
}
?>
</body>
</html>