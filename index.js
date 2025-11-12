$(() => {
  const $page = $('#all-contents');

  const $tweetsDiv = $('<div class="tweets"></div>');

  $page.append($tweetsDiv);

// add twtter to page logic as a function

function addNewTweets() {
  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div class="tweet"></div>');
    // change below, need to make user clickable (in it's own tag)
    // make message it's own tag as well
    // need timestamps under each tweet
    // user needs a click handler inside of function

    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });

  $tweetsDiv.append($tweets);
};
// .html - use to clear elements
addNewTweets(); // must have new tweets on page but not remove older tweets

});