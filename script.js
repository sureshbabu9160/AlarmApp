const hour = document.querySelector(".hour");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".second");
const timers = document.querySelector(".timers");
const noTimersLine = document.querySelector(".no-timers");
const set = document.querySelector(".set");

set.addEventListener("click",()=>{
    let totalTimeInSec = hour.textContent * 3600 + minutes.textContent * 60 + seconds.textContent * 1;
    
    const newTimer = document.createElement("div");
    newTimer.classList.add("set-timer");
    newTimer.classList.add("d-flex");
    newTimer.classList.add("align-items-center");
    newTimer.innerHTML = `
    <div><h4>Timer:</h4></div>
    <div class="timer d-flex align-items-center">
        <div class="newTimerHour">${hour.textContent}</div>
        <div class="colon"> : </div>
        <div class="newTimerMinutes"> ${minutes.textContent} </div>
        <div class="colon"> : </div>
        <div class="newTimerSeconds"> ${seconds.textContent} </div>
        </div>
        <button class="delete btn" >Delete</button>
    `
    
    timers.appendChild(newTimer);
    noTimersLine.style.display = "none";
        
    const newTimerHour = document.querySelectorAll(".newTimerHour");
    const newTimerMinutes = document.querySelectorAll(".newTimerMinutes");
    const newTimerSeconds = document.querySelectorAll(".newTimerSeconds");
    
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn[deleteBtn.length - 1].addEventListener("click",()=>{
        timers.removeChild(newTimer);
        if(timers.childElementCount === 1){
            noTimersLine.style.display = "initial";
        }
    })

    var id = setInterval(()=>{
        const h = (Math.floor(totalTimeInSec / 3600));
        const m = (Math.floor((totalTimeInSec % 3600)/60));
        const s = (Math.floor(totalTimeInSec % 60));

        let hs = h.toString();
        let ms = m.toString();
        let ss = s.toString();
        if(h < 10){
           hs = "0" + hs;
        }
        if(m < 10){
            ms = "0" + ms;
        }
        if(s < 10){
           ss = "0" + ss;
        }
        
        newTimerHour[newTimerHour.length - 1].textContent = hs;
        newTimerMinutes[newTimerMinutes.length - 1].textContent = ms;
        newTimerSeconds[newTimerSeconds.length - 1].textContent = ss;

        totalTimeInSec--;

        if(totalTimeInSec < 0){
            clearInterval(id);
            newTimer.innerHTML = `
            <h4>Timer is Up!</h4>
            <button class="stop btn" >Stop</button>
            `
            newTimer.classList.add("times-up");
            
            const stopBtn = document.querySelectorAll(".stop");
            stopBtn[stopBtn.length - 1].addEventListener("click",()=>{
                timers.removeChild(newTimer);
                stopAudioAlert();

                if(timers.childElementCount === 1){
                    noTimersLine.style.display = "initial";
                }
            })
            playAudioAlert();
        }
    },1000);

    
});
    
const audio = new Audio('./ringtone.mp3');
function playAudioAlert() {
    audio.play();
}
function stopAudioAlert(){
    audio.pause();
}
