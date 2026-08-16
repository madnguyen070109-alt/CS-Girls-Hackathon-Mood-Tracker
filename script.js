const tracks = [
    "assets/Lofi Part 1.mp3",
    "assets/Lofi Part 2.mp3", 
    "assets/Lofi Part 3.mp3", 
    "assets/Lofi Part 4.mp3", 
    "assets/Lofi Part 5.mp3",
    "assets/Lofi Part 6.mp3",
    "assets/Lofi Part 7.mp3",
    "assets/Lofi Part 8.mp3", 
    "assets/Lofi Part 9.mp3"
  
  ];

  const player = document.getElementById("player");
  let current = 0;

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

document.getElementById("startBtn").addEventListener("click", () => {
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    loadTrack(current);
  }, { once: true });
document.getElementById("stopBtn").addEventListener("click", () => {
    stopBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
    player.pause();
  } , { once: true });
  