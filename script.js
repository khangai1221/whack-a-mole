const container = document.querySelector(".container");

const scoreDisplay = document.createElement("div");
scoreDisplay.textContent = "Score: 0";
container.appendChild(scoreDisplay);

const timerDisplay = document.createElement("div");
timerDisplay.id = "timerDisplay";
timerDisplay.className = "timer";
container.appendChild(timerDisplay);

const progressBar = document.createElement("div");
progressBar.className = "progressBarContainer";
container.appendChild(progressBar);

const progressBarFill = document.createElement("div");
progressBarFill.id = "progressBarFill";
progressBar.appendChild(progressBarFill);

const grid = document.createElement("div");
grid.className = "grid";
container.appendChild(grid);

const holes = [];
for (let i = 0; i < 9; i++) {
  const hole = document.createElement("div");
  hole.className = "hole";
  grid.appendChild(hole);
  holes.push(hole);
}

const startButton = document.createElement("button");
startButton.textContent = "Start";
container.appendChild(startButton);

let score = 0;
let moleInterval;
let timerInterval;

startButton.addEventListener("click", startGame);

function showMole() {
  for (let i = 0; i < holes.length; i++) {
    const mole = holes[i].querySelector(".mole");
    if (mole) mole.remove();
  }

  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const mole = document.createElement("img");
  mole.src = "./mole.png";
  mole.className = "mole";

  mole.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    mole.src = "./mole_injured.png";
    setTimeout(() => {
      mole.remove();
    }, 1000);
  });

  randomHole.appendChild(mole);
}

const totalTime = 30;

function startGame() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  showMole();

  let timeLeft = totalTime;
  progressBarFill.style.width = "0%";
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  clearInterval(moleInterval);
  clearInterval(timerInterval);

  const moleSpeed = 900;
  moleInterval = setInterval(showMole, moleSpeed);

  startButton.disabled = true;

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      const progressPercentage = (1 - timeLeft / totalTime) * 100;
      progressBarFill.style.width = progressPercentage + "%";
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;
      timeLeft--;
    } else {
      clearInterval(timerInterval);
      clearInterval(moleInterval);
      timerDisplay.textContent = "Time Up!";
      progressBarFill.style.width = "100%";
      startButton.disabled = false;
      for (let i = 0; i < holes.length; i++) {
        const mole = holes[i].querySelector(".mole");
        if (mole) mole.remove();
      }
      playJumpscare();
    }
  }, 1000);

  const hammer = document.createElement("img");
  hammer.src = "./hammer.png";
  hammer.id = "hammer";
  document.body.appendChild(hammer);

  document.addEventListener("mousemove", (e) => {
    const hammer = document.getElementById("hammer");
    if (!hammer) return;
    hammer.style.left = e.pageX - 30 + "px";
    hammer.style.top = e.pageY - 30 + "px";
  });

  document.addEventListener("click", () => {
    const hammer = document.getElementById("hammer");
    if (!hammer) return;
    hammer.style.transform = "rotate(0deg)";
    setTimeout(() => {
      hammer.style.transform = "rotate(-45deg)";
    }, 100);
  });
}

function playJumpscare() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.backgroundColor = "black";
  overlay.style.zIndex = "10000";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  const image = document.createElement("img");
  image.src = "./jumpscare.jpeg";
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.objectFit = "cover";

  const scream = new Audio("./jumpscare.mp3");
  scream.play();

  overlay.appendChild(image);
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
    displayScoreMenu();
  }, 4000);
}

function displayScoreMenu() {
  const finalMenu = Object.assign(document.createElement("div"), {
    className: "scoreMenu",
  });
  finalMenu.innerHTML = `
    <div>Final Score: ${score}</div>
    <button id="playAgainBtn">Play Again</button>
  `;
  container.appendChild(finalMenu);
  document.getElementById("playAgainBtn").onclick = () => {
    finalMenu.remove();
    startGame();
  };
}
