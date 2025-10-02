const WelcomeText = "Kuzhen Project - це Українська команда яка займається розробкою ігор.";
let isTyping = false;
let currentText = "";
let gondo = 0;
let textIndex = 0;
const texts = [
  "Kuzhen Project - це Українська команда яка займається розробкою ігор.",
  "Ця сторінка надає доступ до всих проєктів Кужен Проєкт.",
  "Є можливість додати свій запит на приєднання в команду Кужен Проєкт.",
  "Моніторьте який прогрес в розробці гри та хто саме це робить."
];
document.addEventListener('DOMContentLoaded', function() { // Виконується, коли весь HTML завантажений і розібраний
    startTypingCycle();
    document.getElementById("start_p").style.fontSize = "25px";
    document.getElementById("ico_kuzhen_project").style.transitionDuration = "0.4s";
});













function startTypingCycle() {
    typeEffect('start_p', texts[textIndex]);
    
    textIndex++;
    if (textIndex >= texts.length) {
        textIndex = 0; 
    }
    
    setTimeout(startTypingCycle, 5000); 
}
function typeEffect(elementId, newText) {
    if (isTyping || currentText === newText) {
        return;
    }
    
    isTyping = true;
    const element = document.getElementById(elementId);
    let i = 0;
    
    function deleting() {
        if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1);
            setTimeout(deleting, 10);
        } else {
            typing();
        }
    }
    
    function typing() {
        if (i < newText.length) {
            element.textContent += newText.charAt(i);
            i++;
            setTimeout(typing, 15);
        } else {
            isTyping = false;
            currentText = newText;
        }
    }
    if (element.textContent.length > 0) {
        deleting();
    } else {
        typing();
    }
}