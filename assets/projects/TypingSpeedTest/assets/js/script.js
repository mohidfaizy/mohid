const textPara = document.querySelector(".para"),
hiddenAgent = document.getElementById('hidden-agent'),
mistake = document.getElementById('mistake'),
resetBtn = document.getElementById('reset-btn'),
timeTag = document.getElementById('time-tag'),
WPMTag = document.getElementById('wpm-tag');

let charIndex = 0,
mistakes = 0;

let timer, 
maxTime = 60,
timeLeft = maxTime, 
isTyping = cpm = wpm = 0;

document.onkeydown = () =>{
    hiddenAgent.focus();
}
textPara.onclick = () =>{
    hiddenAgent.focus();
}

function randomParaPicker(){
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    paragraph[randomIndex].split('').forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        textPara.innerHTML += spanTag;
    });
}

function intiatTyping(){
    const span = document.querySelectorAll('span');
    let typeChar = hiddenAgent.value.split('')[charIndex];

    // Setting Timer
    if(!isTyping){
        timer = setInterval(initiatTimer, 1000);
        isTyping = true;
    }

    if(typeChar == null){
        charIndex--;
        if(span[charIndex].classList.contains("unsuccessfully")){
            mistakes--;
        }
        span[charIndex].classList.remove('successfully', 'unsuccessfully');
    }else{
        if(span[charIndex].innerText === typeChar){
            span[charIndex].classList.add('successfully');
        }else{
            mistakes++;
            span[charIndex].classList.add('unsuccessfully');
        }
        charIndex++;
    }
    span.forEach(span => {
        span.classList.remove('active');
    });
    span[charIndex].classList.add('active');
    mistake.innerText = mistakes;

    cpm = charIndex - mistakes;
    wpm = Math.round(((cpm / 5) / (maxTime - timeLeft)) * 60);
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
    WPMTag.textContent = wpm;
}

function initiatTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.textContent = timeLeft;
    }else{
        clearInterval(timer);
    }
}

randomParaPicker();

hiddenAgent.addEventListener('input', intiatTyping);

resetBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    textPara.textContent = '';
    hiddenAgent.value = '';
    mistakes = 0;
    mistake.innerText = mistakes;
    randomParaPicker();
    timeLeft = 60;
    charIndex = 0;
    timeLeft = maxTime;
    clearInterval(timer);
    isTyping = 0;
    timeTag.textContent = "60";
    WPMTag.textContent = "0";
});