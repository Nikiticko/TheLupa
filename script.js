const screens = [...document.querySelectorAll("[data-screen]")];
const openButtons = document.querySelectorAll("[data-open]");
const playlistButtons = document.querySelectorAll("[data-playlist]");
const playlistTitle = document.querySelector("#playlistTitle");
const playlistMood = document.querySelector("#playlistMood");
const playToggle = document.querySelector(".play-toggle");

const playlistCopy = {
  "Солнечное детство": "Теплая подборка воспоминаний и ярких моментов.",
  "Школьный звонок": "Звуки перемен, первых друзей и длинных коридоров.",
  "Уютная зима": "Мягкие мелодии для морозных вечеров и спокойной памяти.",
  "Ретро-радио": "Ностальгическая волна старых ритмов и случайных открыток.",
  "Неоновый город": "Ночной маршрут с яркими огнями и быстрым пульсом.",
  "Купе на четверых": "Дорожный плейлист для разговоров, окон и общего пути."
};

let isPlaying = true;

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === name);
  });
}

function selectPlaylist(name) {
  playlistButtons.forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.playlist === name);
  });

  playlistTitle.textContent = name;
  playlistMood.textContent = playlistCopy[name] || playlistCopy["Солнечное детство"];
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
