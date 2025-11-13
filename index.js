$(() => {
  const $page = $('#all-contents');

  const $tweetsDiv = $('<div class="tweets"></div>');

  $page.append($tweetsDiv);

// need to create a function that adds new tweets to the top of the tweet list

let lastDisplayedIndex = 0;

function addNewTweets() {
  // get only new tweets
  const newTweets = streams.home.slice(lastDisplayedIndex);

  // update index to the new end
  lastDisplayedIndex = streams.home.length;

  // create and prepend tweet elements
  const $tweets = newTweets.map(tweet => {
    const $tweet = $('<div class="tweet"></div>');
    const $user = $(`<span class="user">@${tweet.user}</span>`);
    const $message = $(`<span class="message">${tweet.message}</span>`);
    const $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(moment(tweet.timestamp).format('MMMM Do YYYY, h:mm:ss a'));

    $tweet.append($user, ': ', $message, $timestamp);
    return $tweet;
  });

  // add new tweets to the top
  $tweetsDiv.prepend($tweets);
}

// Initial load
addNewTweets();

// Create and attach the refresh button
const $refreshButton = $('<button class="refresh-button">Show more tweets</button>');
$page.prepend($refreshButton);

// When clicked, add only new tweets
$refreshButton.on('click', () => {
  addNewTweets();
});

  // need to add a timestamp to each tweet, example April 24, 2024 3:15pm
  //  timestamps should be in it's own tag with the class timestamp
  // the doc says use Moment.js, for the timestamp format
  // do I use date math or time math?

  // $('.tweet').each(function() {
  // const $tweet = $(this);
  // const tweetText = $tweet.text();
  // const $timestamp = $('<div class="timestamp"></div>');
  // $timestamp.text(moment(tweet.timestamp).format('MMMM D, YYYY h:mm A'));
  // $tweet.append($timestamp);
  // });

})