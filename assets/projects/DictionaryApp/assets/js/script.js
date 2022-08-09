const main = document.getElementById('main'),
searchBox = document.getElementById('search-box'),
cancelBtn = document.getElementById('cancel-button'),
section = document.querySelector(".wrapper .main"), 
txtMsg = document.getElementById('txt-msg'),
engName = document.getElementById('eng-name'),
engPhonetic = document.getElementById("eng-phonetic"), 
engMsg = document.getElementById('eng-desc'),
engExample = document.getElementById('eng-example'),
engPronoun = document.getElementById('eng-pronoun'),
engSynonyms = document.getElementById('eng-synonyms'),
audioBtn = document.getElementById('audio-btn');

// Clear search box by clicking on cancel button. 
cancelBtn.addEventListener('click',()=>{
    searchBox.value = '';
})

///////////////////////
///// Search Data /////
///////////////////////
let audio;
function fetch(value){
    txtMsg.innerHTML = `<span class="txt-info">Searching result for: "<b>${value}</b>"</span>`;
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            result = JSON.parse(xhr.response);
            let definitions = result[0].meanings[0].definitions[0];
            txtMsg.innerHTML = '';
            section.style.display = "grid";
            console.log(result);
            engName.textContent = result[0].word;
            engPhonetic.textContent = `/ ${result[0].phonetic} /`;
            engMsg.textContent = definitions.definition;
            engExample.textContent = definitions.example;
            engPronoun.textContent = result[0].meanings[0].partOfSpeech;
            engSynonyms.innerHTML = '';
            if(definitions.synonyms[0] == undefined){
                engSynonyms.parentElement.style.display = "none";
            }else{
                engSynonyms.parentElement.style.display = "block";
                for(let i = 0; i < 5; i++){
                    let tag = `<span><a href="">${definitions.synonyms[i]}</a>, </span>`;
                    engSynonyms.insertAdjacentHTML('beforeend',tag);
                }
            }
            audio = new Audio("https:"+ result[0].phonetics[0].audio);
            audioBtn.addEventListener('click',()=>{
                audio.play();
            })
            
        }
        else{
            txtMsg.innerHTML = `No record found! please search another word!`;
            section.style.display = "none";
        }
    }
    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`, true);
    xhr.send();
}
searchBox.addEventListener('keyup',(e)=>{
    if(e.key == "Enter" && e.target.value){
        fetch(e.target.value);
    }
})