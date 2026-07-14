<?php
session_start();
$login_error = "";

if(isset($_POST['enter'])){
    if(trim($_POST['name']) != ""){
        $name = stripslashes(htmlspecialchars(trim($_POST['name'])));
        
        $users = file_exists("online.json") ? json_decode(file_get_contents("online.json"), true) : [];
        $now = time();
        $users = [];
        if (file_exists("online.json")) {
            $content = file_get_contents("online.json");
            $decoded = json_decode($content, true);
            if (is_array($decoded)) {
                $users = $decoded;
            }
        }
        
        foreach($users as $u => $last_active) {
            if ($now - $last_active > 10) {
                unset($users[$u]);
            }
        }
        
        if (isset($users[$name])) {
            $login_error = "Ім'я '$name' вже використовується в чаті!";
        } else {
            $_SESSION['name'] = $name;
            $users[$name] = $now;
            file_put_contents("online.json", json_encode($users));
            
            $escapedName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
            $fp = fopen("log.html", 'a');
            fwrite($fp, "<div class='msgln system-msg' data-user='".$escapedName."' data-event='join'><i>Користувач <b>". $escapedName ."</b> приєднався до чату.</i><br></div>\n");
            fclose($fp);
        }
    }
}

if(isset($_GET['logout'])){
    $name = isset($_SESSION['name']) ? $_SESSION['name'] : '';
    $escapedName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $fp = fopen("log.html", 'a');
    fwrite($fp, "<div class='msgln system-msg' data-user='".$escapedName."' data-event='logout'><i>Користувач <b>". $escapedName ."</b> виходить з чату.</i><br></div>\n");
    fclose($fp);
    
    if(file_exists("online.json")) {
        $users = json_decode(file_get_contents("online.json"), true);
        unset($users[$name]);
        file_put_contents("online.json", json_encode($users));
    }
    
    session_destroy();
    header("Location: index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Klabc Chat</title>
    <link type="text/css" rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <link rel="icon" href="https://github.com/KuzhenLarn/KuzhenProject/blob/main/img/ico_KLOldApp.png?raw=true" type="image/png">
    
</head>
<body>

<?php if(!isset($_SESSION['name'])): ?>
    <div id="login-div">
        <img src="https://github.com/KuzhenLarn/KuzhenProject/blob/main/img/Klabc.png?raw=true" alt="Klabc" id="login-img">
        <form id="login-form" action="index.php" method="post">
            <?php if($login_error != "") echo "<div id='login-error'>$login_error</div>"; ?>
            <input type="text" name="name" id="login-name" placeholder="Введіть ваше ім'я" maxlength="10" required />
            <input type="submit" name="enter" id="login-enter" value="Далі"/>
        </form>
    </div>
<?php else: ?>

    <div id="chat-global-div">
        <div id="chat-top-div">
            <p class="welcome" id="chat-top-welcome">Вітаємо, <b><?php echo $_SESSION['name']; ?></b></p>
            <p id="chat-top-chat-name">Глобальний Чат KLabc</p>
            <input type="button" id="chat-exit" value="" />
        </div>
        
        <div id="chat-center-div">
            <?php 
            if(file_exists("log.html") && filesize("log.html") > 0){
                $handle = fopen("log.html", "r");
                $contents = fread($handle, filesize("log.html"));
                fclose($handle);
                echo $contents;
            }
            ?>
        </div>
        
        <button type="button" id="scroll-bottom-btn" style="display: none;">🔻хтось написав🔻</button>
        
        <form name="message" action="" id="chat-form">
        <div id="chat-input-div">
            <input type="file" id="image-upload" style="display: none;" />
            <button type="button" id="chat-img-btn" title="Відправити файл"></button>
            <input name="usermsg" type="text" id="chat-input" size="63" placeholder="Текст..." minlength="1" maxlength="100" autocomplete="off" />
            <input name="submitmsg" type="submit" id="chat-enter" value="" />
        </div>
        </form>
    </div>

    <script>
$(document).ready(function(){
    var currentUser = "<?php echo $_SESSION['name']; ?>";
    var firstLoad = true;
    var lastLogContent = "";

    $("#chat-exit").click(function(){
        var exit = confirm("Ви впевнені?");
        if(exit){
            window.location = 'index.php?logout=true';
        }
    });

    function normalizeSystemMessages(div) {
        div.find('.msgln').each(function() {
            var $item = $(this);
            var text = $item.text().trim();
            if ($item.hasClass('system-msg') || ($item.find('i').length && $item.find('.blockms-name').length === 0)) {
                $item.addClass('system-msg');
            }
        });

        div.find('.msgln.system-msg').each(function() {
            var $this = $(this);
            var user = $this.data('user') || $this.find('i b').first().text().trim();
            var $next = $this.nextAll('.msgln').first();
            if ($next.length && $next.hasClass('system-msg')) {
                var nextUser = $next.data('user') || $next.find('i b').first().text().trim();
                if (user !== '' && user === nextUser) {
                    $this.remove();
                }
            }
        });
    }

    function convertLinks(div) {
        var urlPattern = /(\b(?:https?:\/\/|www\.)[^\s<]+)/gi;
        div.find('.blockms-text').each(function() {
            var $this = $(this);
            var html = $this.html();
            if (html.indexOf('<a') !== -1) {
                return;
            }
            var newHtml = html.replace(urlPattern, function(match) {
                var href = /^www\./i.test(match) ? 'http://' + match : match;
                return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + match + '</a>';
            });
            if (newHtml !== html) {
                $this.html(newHtml);
            }
        });
    }

    function loadLog(){
        var div = $("#chat-center-div");
        if(div.length === 0) return;
        
        var raw = div[0];
        var wasAtBottom = firstLoad || (raw.scrollHeight - raw.scrollTop - raw.clientHeight) < 100;

        $.ajax({
            url: "log.html",
            cache: false,
            success: function(html){
                if (html === lastLogContent) {
                    return;
                }
                lastLogContent = html;

                div.html(html);
                normalizeSystemMessages(div);
                convertLinks(div);
                
                div.find(".msgln").each(function() {
                    var author = $(this).find(".blockms-name b").text(); 
                    if (author === currentUser) {
                        $(this).addClass("msg-right");
                    } else if (author !== "") {
                        $(this).addClass("msg-left");
                    }
                });
                
                if(wasAtBottom) {
                    div.scrollTop(raw.scrollHeight);
                    div.find('img').on('load', function() {
                        div.scrollTop(raw.scrollHeight);
                    });
                    $("#scroll-bottom-btn").fadeOut();
                } else {
                    if (!firstLoad) {
                        $("#scroll-bottom-btn").fadeIn();
                    }
                }
                
                firstLoad = false;
            }
        });
    }
    
    $("#chat-center-div").scroll(function() {
        var raw = this;
        var atBottom = (raw.scrollHeight - raw.scrollTop - raw.clientHeight) < 100;
        if (atBottom) {
            $("#scroll-bottom-btn").fadeOut();
        }
    });

    $("#scroll-bottom-btn").click(function() {
        var div = $("#chat-center-div");
        div.animate({ scrollTop: div[0].scrollHeight }, 300);
        $(this).fadeOut();
    });
    
    setInterval(loadLog, 1000);
    
    setInterval(function(){
        $.post("ping.php");
    }, 5000);

    $("#chat-img-btn").click(function(){
        $("#image-upload").click();
    });

    $("#image-upload").change(function(){
        var file_data = $(this).prop('files')[0];
        if(file_data) {
            if(file_data.size > 5 * 1024 * 1024) {
                alert("Файл занадто великий! Максимум 5 МБ.");
                $(this).val('');
                return;
            }

            var form_data = new FormData();
            form_data.append('file', file_data);
            
            $.ajax({
                url: 'upload.php',
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function(response){
                    $("#image-upload").val('');
                }
            });
        }
    });

    $("#chat-form").submit(function(e){
        e.preventDefault();
        var clientmsg = $("#chat-input").val();
        
        if(clientmsg.trim() === "") {
            return false; 
        }
        
        $.post("post.php", {text: clientmsg});
        $("#chat-input").val("");
        return false;
    });

    $("#chat-input").on("paste", function(e) {
        var clipboardData = e.originalEvent.clipboardData;
        
        if (clipboardData && clipboardData.items) {
            for (var i = 0; i < clipboardData.items.length; i++) {
                var item = clipboardData.items[i];
                
                if (item.type.indexOf("image") !== -1) {
                    var file_data = item.getAsFile();
                    
                    if (file_data) {
                        if (file_data.size > 5 * 1024 * 1024) {
                            alert("Файл занадто великий! Максимум 5 МБ.");
                            return;
                        }

                        var form_data = new FormData();
                        form_data.append('file', file_data);
                        
                        $.ajax({
                            url: 'upload.php',
                            dataType: 'text',
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: form_data,
                            type: 'post',
                            success: function(response){
                                loadLog();
                            }
                        });
                        
                        e.preventDefault();
                    }
                }
            }
        }
    });
});
    </script>
<?php endif; ?>

</body>
</html>