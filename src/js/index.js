getData = () => {
  const $app = document.getElementById("app");
  $app.innerHTML = `<div></div>`;

  fetch("http://localhost:8080/abc", { mode: "no-cors" })
    .then(res => {
      return res.json();
    })
    .then(myJSON => console.log(myJSON))
    .catch(error => console.error("Error:", error));
};
