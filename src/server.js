const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

/* Twitter API */
const Twitter = require("twitter");
const client = new Twitter({
  consumer_key: "a6gfUYI6R4SmMsyBkPD4jxCvb",
  consumer_secret: "KV80YBip7MkWM6UsPw3lhPe5DBlQjpdUPzt66FrwzYqFQns8Z9",
  access_token_key: "1194209758322057217-fjtZ4YWwc7s8GYyAKQXKtdsT1F3gpx",
  access_token_secret: "plaBaN0cNECRRxY9tg7jASzmB5aEy7GRd0f4mXBpgXlGD",
});

const searchQueryM = { q: "from:MorawieckiM+OR+from:SchetynadlaPO", count: 100, lang: "pl", tweet_mode: "extended"};

/* Routes */
app.get("/search", function(req, res) {

    client.get('search/tweets', searchQueryM, function(error, tweets, response) {
        if(error) throw error;
        res.send(tweets.statuses)
    });
});


