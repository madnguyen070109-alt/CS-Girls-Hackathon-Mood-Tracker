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
    current = (current + 1) % tracks.length;
    loadTrack(current);
  });

document.getElementById("startBtn").addEventListener("click", () => {
    loadTrack(current);
  }, { once: true });
  