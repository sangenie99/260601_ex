// https://mockapi.io//

// DOM

const form = document.querySelector('#pokeRegister');


//Eventlisterner
form.addEventListener('submit', (event) => {
  event.preventDefault(); //기본 폼 제출 비활성화
  console.log("제출")
});
  