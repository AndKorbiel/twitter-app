let bts = document.querySelectorAll('.addButton');
let usersList = [];

bts.forEach(el => {
    el.addEventListener("click", (e)=> {
        let userName = e.target.value;
        if (usersList.indexOf(userName) === -1) {
            usersList.push(userName)
        } else {
            usersList = usersList.filter(el => el != userName)
        }

        e.target.classList.toggle("active");
    })
});

searchKeyword = () => {
    let keyword = document.getElementById('keyword').value;
    let queryList = [];

    if (usersList.length > 0) {
        queryList = usersList.reduce((prev, next) => {
            return prev + "+OR+from:" + next;
        });
    }

    fetch("http://localhost:8080/search?keyword=" + keyword + "&queryList=" + queryList)
        .then(res => {
            return res.json();
        })
        .then(myJSON => {
            divideData(myJSON)
        })
        .catch(error => console.error("Error:", error));
};

divideData = (myJSON) => {
    if (myJSON.length === 0) {
        document.getElementById("left").innerHTML = '<h2 class="error">Brak tweetow do wyświetlenia...</h2>';
        document.getElementById("right").innerHTML = '';
    } else {
        document.getElementById("right").innerHTML = '';
        document.getElementById("left").innerHTML = '';

        for (let i = 0; i < myJSON.length; i++) {
            let userName = myJSON[i].user.name,
                profilePhoto = myJSON[i].user.profile_image_url_https,
                followersCount = myJSON[i].user.followers_count,
                userDesc = myJSON[i].user.description,
                date = myJSON[i].created_at,
                fullText = myJSON[i].full_text,
                retweet_count = myJSON[i].retweet_count,
                imgSrc = myJSON[i].extended_entities != undefined ? myJSON[i].extended_entities.media[0].media_url : '',
                imgs = imgSrc != '' ? `<img src=${imgSrc} />` : ``,
                $app = '';

            switch (userName) {
                case 'tvn24' :
                case 'Gazeta Wyborcza.pl' :
                case 'Radio TOK FM' :
                case 'Konrad_Piasecki' :
                case 'Tomasz Lis' :
                case 'Kasia KolendaZaleska' :
                case 'Michał Szułdrzyński🇵🇱' :
                case 'Tomasz Siemoniak' :
                case 'PlatformaObywatelska' :
                    $app = document.getElementById("left");
                    break;
                case 'Jarosław Gowin' :
                case 'portal tvp.info 🇵🇱' :
                case 'Rzeczpospolita' :
                case 'Łukasz Warzecha' :
                case 'Cezary „Trotyl” Gmyz' :
                case 'Michał Karnowski 🇵🇱' :
                case 'Andrzej Duda' :
                case 'Beata Szydło' :
                case 'Prawo i Sprawiedliwość' :
                case 'Joachim Brudziński' :
                    $app = document.getElementById("right");
                    break;
                default:
                    break;
            }

            $app.innerHTML += `<div class="singleT"><img src=${profilePhoto} class="profile" /><div class="about"><h2>${userName}</h2><h4>${userDesc}</h4><p class="followers"><span class="bold">${followersCount}</span> following</p></div><div class="news"><p class="date">${date}</p><p class="full-text">${fullText}</p><p><span class="retweet">${retweet_count} re-tweets</span></p><div class="images">${imgs}</div></div></div>`;
        }
    }
};
