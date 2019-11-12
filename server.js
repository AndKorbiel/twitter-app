const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));

app.get("/", function(req, res) {
  client.get("search/tweets", searchQuery, getTweets);
  res.json(x);
});

app.get("/abc", function(req, res) {
  res.json({ foo: "bar" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: "a6gfUYI6R4SmMsyBkPD4jxCvb",
  consumer_secret: "KV80YBip7MkWM6UsPw3lhPe5DBlQjpdUPzt66FrwzYqFQns8Z9",
  access_token_key: "1194209758322057217-fjtZ4YWwc7s8GYyAKQXKtdsT1F3gpx",
  access_token_secret: "plaBaN0cNECRRxY9tg7jASzmB5aEy7GRd0f4mXBpgXlGD",
  request_options: {
    cors: "no-cors"
  }
});

var x = "";
const searchQuery = { q: "node.js", count: 2 };
function getTweets(error, tweets, response) {
  let tweetsText = tweets.statuses;
  for (let i = 0; i < tweetsText.length; i++) {
    x = tweetsText[i].text;
  }
}

// function getTweetsRes(error, tweets, response) {
//   return response.body;
// }
