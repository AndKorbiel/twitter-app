getData = () => {
  const $app = document.getElementById("app");

  fetch("http://localhost:8080/search", { mode: "no-cors" })
    .then(res => {
        console.log(res)
      return res.json();
    })
    .then(myJSON => {
        console.log(myJSON)
        for (let i = 0; i < myJSON.length; i++) {
            let userName = myJSON[i].user.name,
                profilePhoto = myJSON[i].user.profile_image_url_https,
                followersCount = myJSON[i].user.followers_count,
                userDesc = myJSON[i].user.description,
                date = myJSON[i].created_at,
                fullText = myJSON[i].full_text,
                favourites = myJSON[i].favorite_count,
                imgSrc = myJSON[i].extended_entities != undefined ? myJSON[i].extended_entities.media[0].media_url : '',
                imgs = imgSrc != '' ? `<img src=${imgSrc} />` : ``;

            $app.innerHTML += `<div class="singleT">
                <h1>${userName}<img src=${profilePhoto} /></h1>
                <p>${followersCount}</p>
                <h2>${userDesc}</h2>
                <p>${date}</p>
                <p>${fullText}</p>
                <p><span class="favorite">${favourites}</span></p>
                <div class="images"> 
                ${imgs}    
                </div>
                </div>`;
        }
    })
    .catch(error => console.error("Error:", error));
};
