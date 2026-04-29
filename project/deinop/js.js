var range1 = Math.floor(Math.random() * 2);
var range2 = Math.floor(Math.random() * 2);
var range3 = Math.floor(Math.random() * 2);

function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform) || /Linux/.test(userAgent)) {
        os = 'Linux';
    }

    return os;
}

function getArch() {
    var ua = navigator.userAgent || '';
    var platform = navigator.platform || '';
    var arch = 'unknown';

    if (navigator.userAgentData && navigator.userAgentData.architecture) {
        arch = navigator.userAgentData.architecture.toLowerCase();
    } else if (/arm64|aarch64/i.test(ua) || /arm64|aarch64/i.test(platform)) {
        arch = 'arm64';
    } else if (/x86_64|x64|amd64|x86-64/i.test(ua) || /x86_64|x64|amd64|x86-64/i.test(platform)) {
        arch = 'x86_64';
    } else if (/i686|i386|x86/i.test(ua) || /i686|i386|x86/i.test(platform)) {
        arch = 'x86';
    }

    return arch;
}

function X1() {
    document.getElementById("div1").style.width = "0%";
    document.getElementById("div1").style.border = "0px solid rgb(255,255,255,0)";
}
function X2() {
    document.getElementById("div2").style.width = "0%";
    document.getElementById("div2").style.border = "0px solid rgb(255,255,255,0)";
    document.getElementById("divHelp").style.width = "0%";
    document.getElementById("divHelp").style.border = "0px solid rgb(255,255,255,0)";

}
function X3() {
    document.getElementById("div3").style.width = "0%";
    document.getElementById("div3").style.border = "0px solid rgb(0,0,0,0)";
}
function Up() {
    if (localStorage.getItem('DeinopScroll') > 60) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    } else {
        window.scrollTo({
            top: 10000,
            behavior: "smooth"
        });
    }
}

function Open1() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (range1 == 1) {
        document.getElementById("div1").style.left = "5%";
        document.getElementById("div1").style.width = "90%";
        document.getElementById("div1").style.border = "5px solid rgb(255,255,255,1)";
    } else {
        document.getElementById("div1").style.right = "5%";
        document.getElementById("div1").style.width = "90%";
        document.getElementById("div1").style.border = "5px solid rgb(255,255,255,1)";
    }
}
function Open2() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (range2 == 1) {
        document.getElementById("div2").style.left = "5%";
        document.getElementById("div2").style.width = "90%";
        document.getElementById("div2").style.border = "5px solid rgb(255,255,255,1)";
    } else {
        document.getElementById("div2").style.right = "5%";
        document.getElementById("div2").style.width = "90%";
        document.getElementById("div2").style.border = "5px solid rgb(255,255,255,1)";
    }
}
function Open3() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    if (range3 == 1) {
        document.getElementById("div3").style.left = "5%";
        document.getElementById("div3").style.width = "90%";
        document.getElementById("div3").style.border = "5px solid rgb(0,0,0,1)";
    } else {
        document.getElementById("div3").style.right = "5%";
        document.getElementById("div3").style.width = "90%";
        document.getElementById("div3").style.border = "5px solid rgb(0,0,0,1)"; 
    }
}



function downloadAndroind() {
    var x = new XMLHttpRequest();
    x.open("GET", "../../deinop/settings/version.txt", true);
    x.onload = function () {
        location.href = "https://github.com/KuzhenLarn/KuzhenProject/raw/refs/heads/main/project/deinop/settings/Deinop.apk";
    }
    x.send(null);
}

function downloadPC() {
    var os = getOS();
    var arch = getArch();

    if (os === 'Windows') {
        location.href = "https://github.com/KuzhenLarn/KuzhenProject/raw/refs/heads/main/project/deinop/settings/Deinop.exe";
    } else if (os === 'Linux') {
        if (arch === 'arm64') {
            location.href = "https://github.com/KuzhenLarn/KuzhenProject/raw/refs/heads/main/project/deinop/settings/Deinop.arm64";
        } else if (arch === 'x86_64') {
            location.href = "https://github.com/KuzhenLarn/KuzhenProject/raw/refs/heads/main/project/deinop/settings/Deinop.x86_64";
        }
    } else {
        alert('Download not available for your OS: ' + os + ' (' + arch + ')');
    }
}


window.addEventListener('scroll', function () {
    var scrol = window.pageYOffset || document.documentElement.scrollTop;
    localStorage.setItem('DeinopScroll', scrol);
    if (scrol > 500) {
        X1(); X2(); X3();
    }
    if (scrol > 60) {
        document.getElementById("place").style.borderBottom = "1px solid white";
        document.getElementById("buttonUp").style.opacity = "0.5";
    } else {
        document.getElementById("place").style.borderBottom = "1px solid black";
        document.getElementById("buttonUp").style.opacity = "0";
    }
});
$(document).ready(function () {
    var os = getOS();
    var arch = getArch();
    var pcButton = document.querySelector('.PC p');

    if (pcButton) {
        if (os === 'Linux') {
            if (arch === 'arm64') {
                pcButton.innerHTML = 'Download<br>Linux arm64';
            } else if (arch === 'x86_64') {
                pcButton.innerHTML = 'Download<br>Linux x86_64';
            } else {
                pcButton.innerHTML = 'Download<br>Linux';
            }
        } else if (os === 'Windows') {
            pcButton.innerHTML = 'Download<br>Windows';
        }
    }

    window.scrollTo({
        top: localStorage.getItem('DeinopScroll'),
        behavior: "smooth"
    });
});
