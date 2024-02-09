const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const audio = document.querySelector("#audio");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");


const player = new MusicPlayer(musicList);

//Müzik bilgilerinin ekrana yazdırılması
function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
};

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
});
//--------------------------------------------

// PLAY-PAUSE
play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}
//--------------------------------------------

//NEXT-PREV
next.addEventListener("click", () => {
    nextMusic();
});

prev.addEventListener("click", () => {
    prevMusic();
});

function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
};

function prevMusic(){
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
};
//--------------------------------------------

//ProgressBar
const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye/60);
    const saniye = Math.floor(toplamSaniye%60);
    const güncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${güncellenenSaniye}`;
    return sonuc;
};

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(Math.floor(progressBar.value));
});

progressBar.addEventListener("input", () => { //progressBara tıklama ile süre kontrolü(input eventi)
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});
//--------------------------------------------

//Ses Durumu
let sesDurumu = "sesli";

volume.addEventListener("click",() => {
    if(sesDurumu==="sesli"){
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }
    else{
        audio.muted = false;
        sesDurumu = "sesli"
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});

volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0) {
        audio.muted = true;
        sesDurumu = "sessiz";
        volume.classList = "fa-solid fa-volume-xmark";
    }
    else {
        audio.muted = false;
        sesDurumu = "sesli";
        volume.classList = "fa-solid fa-volume-high";
    }
});

//Müzik seçme ve başlatma
const displayMusicList = (list) => {
    for(let i=0; i< list.length; i++){
        let liTag =`
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;

        ul.insertAdjacentHTML("beforeend", liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);

        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata", () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
        console.log(i)
    };

};

audio.addEventListener("ended", () => {
    nextMusic();
});

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
};

const isPlayingNow = () => { //seçilen müzik listede arka plan rengi eklenerek işaretlenir
    for(let li of ul.querySelectorAll("li")) {
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        }

        if(li.getAttribute("li-index") == player.index) {
            li.classList.add("playing");
        }
    }
}
//--------------------------------------------
