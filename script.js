const tracks = [
    "assets/audio/Lofi Part 1.mp3",
    "assets/audio/Lofi Part 2.mp3", 
    "assets/audio/Lofi Part 3.mp3", 
    "assets/audio/Lofi Part 4.mp3", 
    "assets/audio/Lofi Part 5.mp3",
    "assets/audio/Lofi Part 6.mp3",
    "assets/audio/Lofi Part 7.mp3",
    "assets/audio/Lofi Part 8.mp3", 
    "assets/audio/Lofi Part 9.mp3"
  
  ];
const angry = document.getElementById("angry");
const upset = document.getElementById("upset");
const ok = document.getElementById("ok");
const happy = document.getElementById("happy");
const great = document.getElementById("great");
const moodButtons = [angry, upset, ok, happy, great];
const player = document.getElementById("player");
let current = 0;
let selectedMood = null;

  function loadTrack(i) {
    player.src = tracks[i];
    player.play();
  }

  player.addEventListener("ended", () => {
    if (current < tracks.length - 1) {
      current = (current + 1) % tracks.length
    } else {
      current = 0;
    }
    loadTrack(current);
  });
  function selectMood(mood, el) {
    moodButtons.forEach(btn => {
    btn.classList.remove("active");
    btn.classList.add("button");
  });
    // then activate the one that was clicked
    el.classList.remove("button");
    el.classList.add("active");
    selectedMood = mood;
}
  document.getElementById("startBtn").addEventListener("click", () => {
    stopBtn.classList.add('button');
    stopBtn.classList.remove('hidden');
    startBtn.classList.add('hidden');
    startBtn.classList.remove('button');
    loadTrack(current);
  });
document.getElementById("stopBtn").addEventListener("click", () => {
    stopBtn.classList.add('hidden');
    stopBtn.classList.remove('button');
    startBtn.classList.add('button');
    startBtn.classList.remove('hidden');
    player.pause();
  });
  
angry.addEventListener("click", () => {
    selectMood("angry", angry);
});

upset.addEventListener("click", () => {
    selectMood("upset", upset);
});

ok.addEventListener("click", () => {
    selectMood("ok", ok);
});
happy.addEventListener("click", () => {
    selectMood("happy", happy);
});
great.addEventListener("click", () => {
    selectMood("great", great);
});
document.getElementById("submit").addEventListener("click", () =>
  {
    if (!selectedMood) {
    alert("Pick a mood first!");
    return;
    }
    const today = new Date().toISOString().slice(0, 10); // "2026-08-16"
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
    entries[today] = { mood: selectedMood, ts: Date.now() };
    localStorage.setItem("moodEntries", JSON.stringify(entries));

    renderEntries();
  });
  function renderEntries() {
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
  const wrap = document.querySelector(".entries");
  wrap.innerHTML = "";

  Object.keys(entries).sort().reverse().forEach(date => {
    const row = document.createElement("div");
    row.textContent = `${date}: ${entries[date].mood}`;
    wrap.appendChild(row);
  });
}

renderEntries();
  