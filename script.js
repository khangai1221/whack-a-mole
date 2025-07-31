const container = document.querySelector(".container");
container.src = "./background.png";

const scoreDisplay = document.createElement("div");
scoreDisplay.textContent = "Score: 0";
container.appendChild(scoreDisplay);

const timerDisplay = document.createElement("div");
timerDisplay.id = "safeTimerDisplay";
timerDisplay.textContent = "Time: 30";
container.appendChild(timerDisplay);

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
startButton.addEventListener("click", startGame);

let score = 0;
let moleInterval;

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
    mole.remove();
  });

  randomHole.appendChild(mole);
}

function timer() {
  let sec = 30;
  const time = setInterval(() => {
    timerDisplay.textContent = "Time: " + sec;
    sec--;

    if (sec < 0) {
      clearInterval(time);
      clearInterval(moleInterval);
      startButton.disabled = false;

      for (let i = 0; i < holes.length; i++) {
        const mole = holes[i].querySelector(".mole");
        if (mole) mole.remove();
      }

      timerDisplay.textContent = "Time's up!";
    }
  }, 1000);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30";
  showMole();
  moleInterval = setInterval(showMole, 1000);
  timer();
  startButton.disabled = true;

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
