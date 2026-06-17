const screens = [...document.querySelectorAll("[data-screen]")];
const openButtons = document.querySelectorAll("[data-open]");
const playlistButtons = document.querySelectorAll("[data-playlist]");
const playlistTitle = document.querySelector("#playlistTitle");
const playlistMood = document.querySelector("#playlistMood");
const soundMap = document.querySelector("#soundMap");
const playToggle = document.querySelector(".play-toggle");
const audioPlayer = document.querySelector("#audioPlayer");
const audioStatus = document.querySelector("#audioStatus");
const menuScreen = document.querySelector("[data-screen='menu']");

const menuImages = {
  "Солнечное детство": "assets/images/menu-hover-childhood.jpg",
  "Школьный звонок": "assets/images/menu-hover-school.jpg",
  "Уютная зима": "assets/images/menu-hover-winter.jpg",
  "Ретро-радио": "assets/images/menu-hover-retro.jpg",
  "Неоновый город": "assets/images/menu-hover-neon.jpg",
  "Купе на четверых": "assets/images/menu-hover-train.jpg"
};

const playlistCopy = {
  "Солнечное детство": {
    mood: "Беззаботность, жара и ощущение бесконечного летнего дня.",
    audioSrc: "assets/audio/sunny-childhood.mp3",
    layers: [
      {
        label: "Базовый трек",
        text:
          "Легкая мажорная инструментальная мелодия в духе upbeat indie-pop: акустическая гитара, укулеле или мягкий синтезатор, средний жизнерадостный темп."
      },
      {
        label: "Фон",
        text:
          "Теплый летний гул воздуха в жаркий день, без городского шума. Очень тихо можно добавить далекие глухие машины."
      },
      {
        label: "Детали",
        text:
          "Детский смех на площадке вдали и стрекот цикад. Не навязчиво, скорее намеки, из которых мозг дорисовывает картину."
      }
    ]
  },
  "Школьный звонок": {
    mood: "Звуки перемен, первых друзей и длинных коридоров.",
    audioSrc: "assets/audio/school-bell.mp3",
    layers: []
  },
  "Уютная зима": {
    mood: "Мягкие мелодии для морозных вечеров и спокойной памяти.",
    audioSrc: "assets/audio/cozy-winter.mp3",
    layers: []
  },
  "Ретро-радио": {
    mood: "Ностальгическая волна старых ритмов и случайных открыток.",
    audioSrc: "assets/audio/retro-radio.mp3",
    layers: []
  },
  "Неоновый город": {
    mood: "Ночной маршрут с яркими огнями и быстрым пульсом.",
    audioSrc: "assets/audio/neon-city.mp3",
    layers: []
  },
  "Купе на четверых": {
    mood: "Дорожный плейлист для разговоров, окон и общего пути.",
    audioSrc: "assets/audio/train-coupe.mp3",
    layers: []
  }
};

let isPlaying = true;

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
  });
}

function selectPlaylist(name) {
  const playlist = playlistCopy[name] || playlistCopy["Солнечное детство"];

  playlistButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.playlist === name);
  });

  playlistTitle.textContent = name;
  playlistMood.textContent = playlist.mood;
  audioPlayer.src = playlist.audioSrc;
  audioStatus.textContent = `Ожидается файл: ${playlist.audioSrc}`;
  soundMap.innerHTML = playlist.layers
    .map(
      (layer) => `
        <div>
          <dt>${layer.label}</dt>
          <dd>${layer.text}</dd>
        </div>
      `
    )
    .join("");
  isPlaying = true;
  playToggle.textContent = "Ⅱ";
  playToggle.setAttribute("aria-label", "Пауза");
  showScreen("player");
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.open));
});

playlistButtons.forEach((button) => {
  button.addEventListener("click", () => selectPlaylist(button.dataset.playlist));
  button.addEventListener("pointerenter", () => {
    menuScreen.style.setProperty(
      "--menu-bg",
      `url("${menuImages[button.dataset.playlist]}")`
    );
  });
  button.addEventListener("focus", () => {
    menuScreen.style.setProperty(
      "--menu-bg",
      `url("${menuImages[button.dataset.playlist]}")`
    );
  });
  button.addEventListener("pointerleave", () => {
    menuScreen.style.removeProperty("--menu-bg");
  });
  button.addEventListener("blur", () => {
    menuScreen.style.removeProperty("--menu-bg");
  });
});

playToggle.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playToggle.textContent = isPlaying ? "Ⅱ" : "▶";
  playToggle.setAttribute("aria-label", isPlaying ? "Пауза" : "Воспроизвести");

  if (!audioPlayer.src) {
    return;
  }

  if (isPlaying) {
    audioPlayer.play().catch(() => {
      audioStatus.textContent = "Аудиофайл еще не найден в assets/audio";
      isPlaying = false;
      playToggle.textContent = "▶";
      playToggle.setAttribute("aria-label", "Воспроизвести");
    });
  } else {
    audioPlayer.pause();
  }
});
