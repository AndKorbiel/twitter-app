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

const searchQuery = { q: "", count: 20, lang: "pl", result_type: "recent", from: "MorawieckiM", tweet_mode: "extended"};
let dataFromTwitter = [];

function getTweets(error, tweets, response) {
  dataFromTwitter = tweets.statuses;
}

client.get("search/tweets", searchQuery, getTweets);

/* Routes */
app.get("/search", function(req, res) {
    res.json(dataFromTwitter);
});
