const screens = [...document.querySelectorAll("[data-screen]")];
const openButtons = document.querySelectorAll("[data-open]");
const playlistButtons = document.querySelectorAll("[data-playlist]");
const playlistTitle = document.querySelector("#playlistTitle");
const playlistMood = document.querySelector("#playlistMood");
const soundMap = document.querySelector("#soundMap");
const playToggle = document.querySelector(".play-toggle");

const playlistCopy = {
  "Солнечное детство": {
    mood: "Беззаботность, жара и ощущение бесконечного летнего дня.",
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
    layers: []
  },
  "Уютная зима": {
    mood: "Мягкие мелодии для морозных вечеров и спокойной памяти.",
    layers: []
  },
  "Ретро-радио": {
    mood: "Ностальгическая волна старых ритмов и случайных открыток.",
    layers: []
  },
  "Неоновый город": {
    mood: "Ночной маршрут с яркими огнями и быстрым пульсом.",
    layers: []
  },
  "Купе на четверых": {
    mood: "Дорожный плейлист для разговоров, окон и общего пути.",
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
});

playToggle.addEventListener("click", () => {
  isPlaying = !isPlaying;
  playToggle.textContent = isPlaying ? "Ⅱ" : "▶";
  playToggle.setAttribute("aria-label", isPlaying ? "Пауза" : "Воспроизвести");
});
