getData = () => {
  const $app = document.getElementById("app");
  $app.innerHTML = `<div></div>`;

  fetch("http://localhost:8080/", { mode: "no-cors" })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(myJSON => console.log(myJSON))
    .catch(error => console.error("Error:", error));
};
