const tracks = [
    "assets/Lofi Part 1.mp3",
    "assets/Lofi Part 2.mp3",
    "assets/Lofi Part 3.mp3",
    "assets/Lofi Part 4.mp3",
    "assets/Lofi Part 5.mp3",
    "assets/Lofi Part 6.mp3",
    "assets/Lofi Part 7.mp3",
    "assets/Lofi Part 8.mp3",
    "assets/Lofi Part 9.mp3",
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
let currentView = "week";

const moodColors = {
  angry: "#c1440e",
  upset: "#cf744c",
  ok:    "#ef946c",
  happy: "#7fb685",
  great: "#3fa34d",
};

function loadTrack(i) {
  player.src = tracks[i];
  player.play();
}

player.addEventListener("ended", () => {
  if (current < tracks.length - 1) {
    current = (current + 1) % tracks.length;
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

angry.addEventListener("click", () => selectMood("angry", angry));
upset.addEventListener("click", () => selectMood("upset", upset));
ok.addEventListener("click", () => selectMood("ok", ok));
happy.addEventListener("click", () => selectMood("happy", happy));
great.addEventListener("click", () => selectMood("great", great));

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
  renderCurrentView();
  renderStreak();
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

  const firstDay = new Date(year, month, 1).getDay();
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

function renderWeek() {
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  const now = new Date();
  const dayOfWeek = now.getDay();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - dayOfWeek);

  const label = document.createElement("p");
  label.className = "cal-label";
  label.textContent = "This week";
  cal.appendChild(label);

  const grid = document.createElement("div");
  grid.className = "cal-grid";
  const todayStr = now.toISOString().slice(0, 10);

  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);

    const cell = document.createElement("div");
    cell.className = "cal-cell";
    cell.textContent = d.getDate();
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

function renderYear() {
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
  const cal = document.getElementById("calendar");
  cal.innerHTML = "";

  const year = new Date().getFullYear();
  const label = document.createElement("p");
  label.className = "cal-label";
  label.textContent = year;
  cal.appendChild(label);

  const yearGrid = document.createElement("div");
  yearGrid.className = "year-grid";

  for (let m = 0; m < 12; m++) {
    const monthBox = document.createElement("div");
    monthBox.className = "year-month";

    const mLabel = document.createElement("div");
    mLabel.className = "year-month-label";
    mLabel.textContent = new Date(year, m, 1).toLocaleDateString(undefined, { month: "short" });
    monthBox.appendChild(mLabel);

    const daysInMonth = new Date(year, m + 1, 0).getDate();
    const miniGrid = document.createElement("div");
    miniGrid.className = "year-mini-grid";

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dot = document.createElement("div");
      dot.className = "year-dot";
      if (entries[dateStr]) {
        dot.style.backgroundColor = moodColors[entries[dateStr].mood] || "#999";
      }
      miniGrid.appendChild(dot);
    }
    monthBox.appendChild(miniGrid);
    yearGrid.appendChild(monthBox);
  }
  cal.appendChild(yearGrid);
}

function renderCurrentView() {
  if (currentView === "week") renderWeek();
  else if (currentView === "month") renderCalendar();
  else if (currentView === "year") renderYear();
}

document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentView = btn.dataset.view;
    renderCurrentView();
  });
});

function renderStreak() {
  const entries = JSON.parse(localStorage.getItem("moodEntries") || "{}");
  let streak = 0;
  let cursor = new Date();
  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (entries[key]) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  document.getElementById("streakDisplay").textContent = `🔥 ${streak} day streak`;
}

renderEntries();
renderCurrentView();
renderStreak();