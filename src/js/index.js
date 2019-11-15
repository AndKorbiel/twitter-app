let bts = document.querySelectorAll('.addButton')
let usersList = [];

bts.forEach(el => {
    el.addEventListener("click", (e)=> {
        let userName = e.target.value;
        if (usersList.indexOf(userName) == -1) {
            usersList.push(userName)
        } else {
            usersList = usersList.filter(el => el != userName)
        }
    })
});

searchKeyword = () => {
    let keyword = document.getElementById('keyword').value;

    let queryList = usersList.reduce((prev, next) => {
        return prev + "+OR+from:" + next;
    })

    console.log(queryList)

    document.getElementById("right").innerHTML = '';
    document.getElementById("left").innerHTML = '';

    fetch("http://localhost:8080/search?keyword=" + keyword + "&queryList=" + queryList)
        .then(res => {
            return res.json();
        })
        .then(myJSON => divideData(myJSON))
        .catch(error => console.error("Error:", error));
};

divideData = (myJSON) => {
        for (let i = 0; i < myJSON.length; i++) {
            let userName = myJSON[i].user.name,
                profilePhoto = myJSON[i].user.profile_image_url_https,
                followersCount = myJSON[i].user.followers_count,
                userDesc = myJSON[i].user.description,
                date = myJSON[i].created_at,
                fullText = myJSON[i].full_text,
                favourites = myJSON[i].favorite_count,
                imgSrc = myJSON[i].extended_entities != undefined ? myJSON[i].extended_entities.media[0].media_url : '',
                imgs = imgSrc != '' ? `<img src=${imgSrc} />` : ``,
                $app = '';

            if (userName === 'Mateusz Morawiecki') {
                $app = document.getElementById("right");
            } else {
                $app = document.getElementById("left");
            }
            $app.innerHTML += `<div class="singleT">
                <img src=${profilePhoto} class="profile" />  
                <div class="about">
                    <h2>${userName}</h2>
                    <h4>${userDesc}</h4>
                    <p class="followers"><span class="bold">${followersCount}</span> following</p>
                </div>
                <div class="news">
                    <p class="date">${date}</p>
                    <p>${fullText}</p>
                    <p><span class="favorite">${favourites}</span></p>
                    <div class="images">${imgs}</div>
                </div>
                </div>`;
        }
};
