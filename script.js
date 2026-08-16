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
document.getElementById("submit").addEventListener("click", () => {
  if (!selectedMood) {
    alert("Pick a mood first!");
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
  entries[today] = { mood: selectedMood, ts: Date.now() };
  localStorage.setItem("moodEntries", JSON.stringify(entries));

  renderEntries();
  renderCalendar(); 
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
renderCalendar(); 
const moodColors = {
  angry: "#c1440e",
  upset: "#df845c",
  ok:    "#ef946c",
  happy: "#7fb685",
  great: "#3fa34d",
};

function renderCalendar() {
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const label = document.createElement("p");
  label.className = "cal-label";
  label.textContent = now.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  cal.appendChild(label);

  const grid = document.createElement("div");
  grid.className = "cal-grid";

  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = now.toISOString().slice(0, 10);

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.className = "cal-cell blank";
    grid.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const cell = document.createElement("div");
    cell.className = "cal-cell";
    cell.textContent = day;

    if (dateStr === todayStr) cell.classList.add("today");

    const entry = entries[dateStr];
    if (entry) {
      cell.style.backgroundColor = moodColors[entry.mood] || "#999";
      cell.title = entry.mood;
    }

    grid.appendChild(cell);
  }

  cal.appendChild(grid);
}
  