const bioText = "medical student, computer scientist :)";
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
