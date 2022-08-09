// Dark Mode
const modeChange = (button, toChange, darkIcon, lightIcon) => {
    const modeChangeButton = document.querySelector(button),
    modeChangeToChange = document.querySelector(toChange),
    modeChangeDarkIcon = document.querySelector(darkIcon),
    modeChangeLightIcon = document.querySelector(lightIcon);

    modeChangeButton.addEventListener('click',()=>{
        // Icon Change
        if(modeChangeDarkIcon.classList.contains('disabled')){
            modeChangeDarkIcon.classList.remove('disabled');
            modeChangeLightIcon.classList.add('disabled');
        }else if(modeChangeLightIcon.classList.contains('disabled')){
            modeChangeLightIcon.classList.remove('disabled');
            modeChangeDarkIcon.classList.add('disabled');
        }

        // Body Class list add
        if(modeChangeToChange.classList.contains('dark')){
            modeChangeToChange.classList.remove('dark');
        }else{
            modeChangeToChange.classList.add('dark');
        }
    });
}

modeChange('.theme_change_icon', 'body', '.theme_change_sun', '.theme_change_moon');