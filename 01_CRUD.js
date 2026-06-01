// https://mockapi.io//

// DOM

const form = document.querySelector('#pokeRegister');


//Eventlisterner
form.addEventListener('submit', formHandler);


//Event Handler (호이스팅 허용 - 함수 선언식)
function formHandler (event) {
  event.preventDefault(); //기본 폼 제출 비활성화
  // 1. form -> Form DOM => 이걸 넣어도 FormData 작동
  // 2. event -> event.target (lexical scope 고려)
  const formData = new FormData(event.target);
  console.log(...formData);
  console.log(formData.get("pokeName"))
  createData(formData.get("pokeName"));
  console.log("제출");
}

//fetch

function createData(name) {
  // 스코프 차이로 인해서 매개변수로 전달 받아야함
  const apiURL = "https://6a1ce1ed8858a003817c238c.mockapi.io/pokemon";
  // 1. form data로 할 경우
  // const formData = new FormData();
  // formData.append("name", name);
  // 2. JSON 으로 전달
  const payload = { name }; // 단축 -> 변수명으로 바로 넣으면 그 키를 가지는 프로퍼티화 시켜줌
  console.log(payload);
  const response = fetch(apiURL, {
    method: "POST", // 데이터 생성
    // payload (페이로드를 body에 담는다)
    //   body: formData,
    //   body: payload,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    // .then(console.log); // 응답 객체
    //   .then((resp) => resp.text()) // 응답 body에 있는 데이터를 텍스트화
    //   .then((text) => console.log(text));
    .then((resp) => resp.json())
    // console.log 대신에 dom 조작하는 함수가 들어가면?
    .then((json) => console.log(json));
  console.log(response); // Promise {<pending>}
}