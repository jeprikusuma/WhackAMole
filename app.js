const start = document.querySelector(".start"),
  mole = document.querySelectorAll(".container .colum .mole img"),
  score = document.querySelector(".header .score h2"),
  hammer = document.querySelector(".hammer img "),
  sound = document.querySelector("#sound");
let int,
  sc = 0;

for (const ml of mole) {
  ml.classList.add("down");
  // click mole & tambah skor
}

start.addEventListener("click", () => {
  // reset skor
  sc = 0;
  score.innerHTML = sc;
  playing();
  setTimeout(() => {
    ended();
  }, 10000);
});

function playing() {
  // ganti start
  start.classList.add("playing");
  start.classList.remove("ended");
  start.innerHTML = "PLAYING";

  // random index
  if (start.innerHTML == "START") {
    int = clearInterval(int);
  } else {
    int = setInterval(() => {
      let idx = getNumber();
      mole[idx].classList.remove("down");
      mole[idx].addEventListener("click", moleClick(idx));
      mole[idx].classList.add("up");

      // mole masuk auto
      setTimeout(() => {
        mole[idx].classList.remove("up");
        mole[idx].classList.add("down");
      }, 1000);
    }, 1000);
  }
}
function ended() {
  // ganti start
  start.classList.add("ended");
  start.classList.remove("playing");
  start.innerHTML = "START";

  // matikan interval
  int = clearInterval(int);
  for (const ml of mole) {
    ml.classList.remove("up");
    ml.classList.add("down");
  }
}
function getNumber() {
  let min = 0,
    max = 6,
    random;

  do {
    random = Math.floor(Math.random() * (max - min)) + min;
  } while (random === getNumber.last);
  getNumber.last = random;
  return random;
}

//mouse
window.addEventListener("mousemove", cursor);
function cursor(e) {
  hammer.style.top = e.pageY + "px";
  hammer.style.left = e.pageX + "px";
}
window.addEventListener("click", () => {
  hammer.classList.toggle("punch");
  setTimeout(() => {
    hammer.classList.toggle("punch");
  }, 100);
});

//run
function moleClick(idx) {
  sc++;
  score.innerHTML = sc;
  sound.play();
  mole[idx].removeEventListener("click", moleClick);
}
