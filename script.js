const screens = [...document.querySelectorAll("[data-screen]")];
const openButtons = document.querySelectorAll("[data-open]");
const playlistButtons = [...document.querySelectorAll("[data-playlist]")];
const playlistTitle = document.querySelector("#playlistTitle");
const playlistMood = document.querySelector("#playlistMood");
const soundMap = document.querySelector("#soundMap");
const playToggle = document.querySelector(".play-toggle");
const audioPlayer = document.querySelector("#audioPlayer");
const audioStatus = document.querySelector("#audioStatus");
const playerScreen = document.querySelector("[data-screen='player']");
const progressBar = document.querySelector(".progress span");
const prevButton = document.querySelector("[data-action='prev']");
const nextButton = document.querySelector("[data-action='next']");

const playlists = [
  {
    name: "Солнечное детство",
    mood: "Беззаботность, жара и ощущение бесконечного летнего дня.",
    audioSrc: "assets/audio/Солнечное детство.m4a",
    background: "assets/images/image 213.png",
    layers: [
      ["Базовый трек", "Легкая мажорная инструментальная мелодия: акустическая гитара, укулеле или мягкий синтезатор, средний жизнерадостный темп."],
      ["Фон", "Теплый летний гул воздуха в жаркий день, с очень тихими далекими машинами."],
      ["Детали", "Детский смех на площадке вдали и стрекот цикад, как намек на живую сцену за кадром."]
    ]
  },
  {
    name: "Школьный звонок",
    mood: "Легкая ностальгия, первая влюбленность и осенняя меланхолия.",
    audioSrc: "assets/audio/Школа.m4a",
    background: "assets/images/image 215.png",
    layers: [
      ["Базовый трек", "Расслабленный lo-fi hip-hop с мягкой джазовой или соул-пиановой партией."],
      ["Фон", "Шорох сухих листьев под ногами, задающий осеннее настроение."],
      ["Детали", "Тихий приглушенный школьный звонок, будто доносящийся из другого этажа."]
    ]
  },
  {
    name: "Уютная зима",
    mood: "Тепло, покой и безопасность в холодный вечер.",
    audioSrc: "assets/audio/Уютная Зима.m4a",
    background: "assets/images/image 205.png",
    layers: [
      ["Базовый трек", "Спокойная акустика, мягкое пианино или гитара с глубокими джазовыми аккордами."],
      ["Фон", "Почти полная тишина, чтобы сильнее чувствовался уют комнаты."],
      ["Детали", "Тихое потрескивание дров в камине и мягкое ощущение домашнего тепла."]
    ]
  },
  {
    name: "Ретро-радио",
    mood: "Винтажная подача старой записи, теплый свет и легкая пыль времени.",
    audioSrc: "assets/audio/Ретро радио.m4a",
    background: "assets/images/image 212.png",
    layers: [
      ["Базовый трек", "Классический джаз или ранний рок-н-ролл с намеренно старой подачей."],
      ["Фон", "Заметное виниловое шипение, потрескивание и радиошум."],
      ["Детали", "Короткий щелчок переключателя в начале, как у старого радиоприемника."]
    ]
  },
  {
    name: "Неоновый город",
    mood: "Ночной киберпанк, динамика 80-х и быстрый пульс мегаполиса.",
    audioSrc: "assets/audio/Неоновый город.m4a",
    background: "assets/images/image 216.png",
    layers: [
      ["Базовый трек", "Энергичный synthwave с пульсирующим аналоговым басом, арпеджио и драм-машиной."],
      ["Фон", "Далекий ночной гул машин и очень тихая сирена на заднем плане."],
      ["Детали", "Короткие синтезаторные вспышки и звук автомобиля, пролетающего мимо в стиле 80-х."]
    ]
  },
  {
    name: "Купе на четверых",
    mood: "Дорожный уют, мерное движение и бесконечный вид из окна.",
    audioSrc: "assets/audio/Вагон.m4a",
    background: "assets/images/image 211.png",
    layers: [
      ["Базовый трек", "Очень спокойный инструментальный lo-fi или ambient без резких переходов."],
      ["Фон", "Ровный глухой стук колес по рельсам, задающий ритм всей композиции."],
      ["Детали", "Дальний гудок поезда, легкое покачивание вагона и звон ложечки о стакан."]
    ]
  }
];

let currentIndex = 0;

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
  });

  if (name !== "player") {
    audioPlayer.pause();
  }
}

function updatePlayButton() {
  const isPlaying = !audioPlayer.paused;
  playToggle.textContent = isPlaying ? "Ⅱ" : "▶";
  playToggle.setAttribute("aria-label", isPlaying ? "Пауза" : "Воспроизвести");
}

function setStatus(text) {
  audioStatus.textContent = text;
}

function renderPlaylist(index) {
  const playlist = playlists[index];

  playlistButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.playlist === playlist.name);
  });

  playlistTitle.textContent = playlist.name;
  playlistMood.textContent = playlist.mood;
  playerScreen.style.setProperty("--player-bg", `url("${playlist.background}")`);
  soundMap.innerHTML = playlist.layers
    .map(
      ([label, text]) => `
        <div>
          <dt>${label}</dt>
          <dd>${text}</dd>
        </div>
      `
    )
    .join("");

  audioPlayer.src = playlist.audioSrc;
  progressBar.style.width = "0%";
  setStatus(`Загружается: ${playlist.name}`);
}

function playCurrent() {
  audioPlayer.play().catch(() => {
    setStatus("Нажми ▶, если браузер заблокировал автозапуск");
    updatePlayButton();
  });
}

function selectPlaylist(name, shouldPlay = true) {
  const index = playlists.findIndex((playlist) => playlist.name === name);
  currentIndex = index >= 0 ? index : 0;

  renderPlaylist(currentIndex);
  showScreen("player");

  if (shouldPlay) {
    playCurrent();
  }
}

function shiftPlaylist(step) {
  currentIndex = (currentIndex + step + playlists.length) % playlists.length;
  renderPlaylist(currentIndex);
  playCurrent();
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.open));
});

playlistButtons.forEach((button) => {
  const name = button.dataset.playlist;

  button.addEventListener("click", () => selectPlaylist(name));
});

playToggle.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playCurrent();
  } else {
    audioPlayer.pause();
  }
});

prevButton.addEventListener("click", () => shiftPlaylist(-1));
nextButton.addEventListener("click", () => shiftPlaylist(1));

audioPlayer.addEventListener("play", () => {
  setStatus(`Играет: ${playlists[currentIndex].name}`);
  updatePlayButton();
});

audioPlayer.addEventListener("pause", updatePlayButton);

audioPlayer.addEventListener("ended", () => shiftPlaylist(1));

audioPlayer.addEventListener("error", () => {
  setStatus("Не удалось загрузить аудиофайл");
  updatePlayButton();
});

audioPlayer.addEventListener("timeupdate", () => {
  if (!audioPlayer.duration) {
    return;
  }

  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
});

selectPlaylist(playlists[0].name, false);
showScreen("home");
