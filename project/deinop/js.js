var range1 = Math.floor(Math.random() * 2);
var range2 = Math.floor(Math.random() * 2);
var range3 = Math.floor(Math.random() * 2);
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
    x.open("GET", "/deinop/settings/version.txt", true);
    x.onload = function () {
        location.href = "/deinop/version/" + "Deinop_" + x.responseText + ".apk";
    }
    x.send(null);
}

function downloadPC() {
    var x = new XMLHttpRequest();
    x.open("GET", "/deinop/settings/version.txt", true);
    x.onload = function () {
        location.href = "/deinop/version/" + "Deinop_" + x.responseText + ".exe";
    }
    x.send(null);
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

    window.scrollTo({
        top: localStorage.getItem('DeinopScroll'),
        behavior: "smooth"
    });
});
