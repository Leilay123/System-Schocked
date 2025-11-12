$(() => {
  const $page = $('#all-contents');

  const $tweetsDiv = $('<div class="tweets"></div>');

  $page.append($tweetsDiv);

// add twtter to page logic as a function

function addNewTweets() {
  const $tweets = streams.home.map((tweet) => {
  const $tweet = $('<div class="tweet"></div>');

    // adds the username and message
    const $user = $(`<span class="user">@${tweet.user}</span>`);
    const $message = $(`<span class="message">${tweet.message}</span>`);

    // Create timestamp with Moment.js
    const $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(moment(tweet.timestamp).format('MMMM Do YYYY, h:mm:ss a'));

    // Assemble tweet
    $tweet.append($user, ': ', $message, $timestamp);

    return $tweet;
  });

  // Add new tweets above the older ones
  $tweetsDiv.prepend($tweets);
}

// .html - use to clear elements

addNewTweets(); // must have new tweets on page but not remove older tweets

// need to connect the function to a button that in the index.html file
// or I can try my hand at jquery again, whatever works
  const $refreshButton = $('<button class="refresh-button">Show more tweets</button>');

  $page.prepend($refreshButton);

// tweets are at the bottom, I want them a the top...

  $refreshButton.on('click', () => {
    $tweetsDiv.empty(); // clear existing tweets
    // add new tweets, how do I add them over the older tweets?

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

  console.log("addNewTweets() called");
  console.log(streams.home);


})