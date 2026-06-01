// https://mockapi.io//

// DOM

const form = document.querySelector('#pokeRegister');
const list = document.querySelector('#pokeList');


//Eventlisterner
document.addEventListener("DOMContentLoaded", domHandler);
form.addEventListener('submit', formHandler);


//Event Handler (호이스팅 허용 - 함수 선언식)
async function formHandler (event) {
  event.preventDefault(); //기본 폼 제출 비활성화
  // 1. form -> Form DOM => 이걸 넣어도 FormData 작동
  // 2. event -> event.target (lexical scope 고려)
  const formData = new FormData(event.target);
  console.log(...formData);
  console.log(formData.get("pokeName"))
  await createData(formData.get("pokeName"));
  console.log("제출");

  // 다시 그려주기
  drawPokeList(await getData());
}

async function domHandler() {
    console.log("화면을 다시 그림")


// 데이터 로드
    const data = await getData();
    console.log(data)
// 데이터를 바탕으로 특정 돔 요소를 만들기

    drawPokeList(data);
}




//fetch
 async function createData(name) {
  const apiURL = "https://6a1ce1ed8858a003817c238c.mockapi.io/pokemon";
  const payload = { name };
  console.log(payload);

  const response = await axios.post(apiURL, payload);

  console.log("response.data", response.data);
  /* const response = await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })

    .then((resp) => resp.json())
    .then((json) => console.log(json))
    .then(() => console.log("제출 완료")) */
  console.log(response); //Promise가 아니라 최종형태로 감
}

async function getData() {
    const apiURL = "https://6a1ce1e38858a003817c233f.mockapi.io/pokemon";

    const response = await axios.get(apiURL);

    console.log("response.data", response.data);
    /* const response = fetch(apiURL, {
        method: "GET", // 데이터를 호출하는 것
    })
        // .then(console.log); // 응답 객체
        //   .then((resp) => resp.text()) // 응답 body에 있는 데이터를 텍스트화
        //   .then((text) => console.log(text));
        .then((resp) => resp.json()) */

    console.log(response); // Promise {<pending>}
    return response.data;
}

// Rendering
function drawPokeList (data) {
    console.log("drawPokeList",data);
    list.innerHTML = "";
    for (const v of data) {
        const item = document.createElement("p");
        item.textContent = v["name"];

        list.append(item);
    }
}