const bioText = "I'm a medical student and computer scientist interested in the applications of ML and quantum computing to healthcare. :)";
const delay = 50;
let i = 0;

function typeBio() {
  if (i < bioText.length) {
    document.querySelector('.bio').innerHTML += bioText.charAt(i);
    i++;
    setTimeout(typeBio, delay);
  }
}

typeBio();
