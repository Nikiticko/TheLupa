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
      ["Базовый трек", "Легкая, мажорная мелодия в стиле upbeat indie-pop задает жизнерадостный, средний темп."],
      ["Фон", "Теплый, летний гул воздуха в жаркий день, без городского шума."],
      ["Детали", "В воздухе растворен далекий, рассыпчатый смех. Мягкий, женский голос - лишь эхо в памяти, нежный намек на что-то давно забытое."]
    ]
  },
  {
    name: "Школьный звонок",
    mood: "Атмосфера легкой ностальгии, первой влюбленности и осенней меланхолии.",
    audioSrc: "assets/audio/Школа.m4a",
    background: "assets/images/image 215.png",
    layers: [
      ["Базовый трек", "Лиричная, немного грустная мелодия в стиле lo-fi hip-hop. Ее медленный, расслабленный темп обволакивает, как теплый плед."],
      ["Фон", "Шуршание сухих листьев - тихий, уютный аккомпанемент. Из открытого окна доносится негромкое пение птиц."],
      ["Детали", "Очень тихий, приглушенный звук школьного звонка, доносящийся словно из другого мира. Он не режет слух, а звучит как далекое и приятное воспоминание."]
    ]
  },
  {
    name: "Уютная зима",
    mood: "Атмосфера ностальгии, первой влюбленности и меланхолии.",
    audioSrc: "assets/audio/Уютная Зима.m4a",
    background: "assets/images/image 205.png",
    layers: [
      ["Базовый трек", "Спокойная акустическая композиция, где каждая нота звучит вдумчиво и неторопливо. Ее негромкая мелодия обволакивает, создавая островок тишины и уюта."],
      ["Фон", "Почти полное отсутствие фона - это сама тишина, густая и осязаемая. Она подчеркивает уют замкнутого пространства, где нет места внешнему миру."],
      ["Детали", "Тихое, мерное потрескивание дров в камине, как пульс этого спокойного вечера. И эхо множества внутренних вопросов, которые рождаются и растворяются в этой безмятежности."]
    ]
  },
  {
    name: "Ретро-радио",
    mood: "Винтажная атмосфера, как будто слушаешь старую запись.",
    audioSrc: "assets/audio/Ретро радио.m4a",
    background: "assets/images/image 212.png",
    layers: [
      ["Базовый трек", "Классический джаз, текущий плавно и сдержанно, без всякой суеты. Его мелодия создает атмосферу абсолютного спокойствия и полного контроля."],
      ["Фон", "Эффект «винила» - легкое, уютное шипение и потрескивание старой пластинки. Этот звуковой налет добавляет музыке тепла и ностальгии."],
      ["Детали", "Короткий, сухой щелчок переключателя на радиоприемнике."]
    ]
  },
  {
    name: "Неоновый город",
    mood: "Атмосфера ночного города, киберпанка и динамики 80-х.",
    audioSrc: "assets/audio/Неоновый город.m4a",
    background: "assets/images/image 216.png",
    layers: [
      ["Базовый трек", "Энергичный synthwave с пульсирующими, аналоговыми басовыми линиями. Эта ритмичная основа задает темп и создает ощущение непрерывного, стремительного движения."],
      ["Фон", "Звуки ночного города: далекий, монотонный гул машин и внезапный, тревожный вой сирены. Этот звуковой ландшафт создает атмосферу динамики."],
      ["Детали", "Короткий, резкий звук проносящегося мимо автомобиля. Он на мгновение разрывает фоновый гул, подчеркивая скорость и анонимность ночных улиц."]
    ]
  },
  {
    name: "Купе на четверых",
    mood: "Атмосфера дорожного уюта, движения и наблюдения за миром из окна.",
    audioSrc: "assets/audio/Вагон.m4a",
    background: "assets/images/image 211.png",
    layers: [
      ["Базовый трек", "Очень спокойный инструментальный lo-fi трек с монотонной, убаюкивающей мелодией. В ней нет резких переходов, лишь ровное и предсказуемое течение звука."],
      ["Фон", "Глухой, мерный и абсолютно ровный стук колес по рельсам. Он задает гипнотический ритм, становясь пульсом всей композиции."],
      ["Детали", "Почти неуловимый звук покачивания вагона на стыках путей. И тихий, мелодичный звон чайной ложечки о граненый стакан."]
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
