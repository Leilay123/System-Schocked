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

const $user = $(`<span class="username">@${tweet.user}</span>`);

    const $message = $(`<span class="message">${tweet.message}</span>`);
      // create add the time stamps
    const $timestamp = $('<div class="timestamp"></div>');
    $timestamp.text(moment(tweet.timestamp).format('MMMM Do YYYY, h:mm:ss a'));
      // adding more reader friendly time stamps
    const $humanFriendlyTimestamp = $('<div class="humanFriendlyTimestamp"></div>');
    $humanFriendlyTimestamp.text(moment(tweet.timestamp).fromNow());

    // making it so when you click on a username, it shows only their tweets

      let currentUserFilter = null; // to keep track of the current user filter


    $user.on('click', () => {
  currentUserFilter = tweet.user;   // <-- track the active user filter

  const $filteredTweets = $('.tweet').filter((index, element) => {
    const $element = $(element);
    const user = $element.find('.username').text().substring(1); 
    return user === tweet.user;
  });

  $tweetsDiv.empty().append($filteredTweets);
});


    $tweet.append($user, ': ', $message, $timestamp, $humanFriendlyTimestamp);

    return $tweet;

  });

  // add new tweets to the top
  $tweetsDiv.prepend($tweets);
}

  // create a way that allow people to create new tweets

  // techically does work I want new tweet form to be at the top of the page

 const $newTweetForm = $(`
<form class="new-tweet-form">
  <input id="username-input" type="text" class="new-tweet-user" placeholder="Your username" required />
  <br/>
  <textarea id="message-input" class="new-tweet-message" placeholder="What's happening?" required></textarea>
  <br/>
  <input type="submit" value="Tweet">
</form>
`);
$newTweetForm.on('submit', (event) => {
  event.preventDefault();

  const user = $newTweetForm.find('.new-tweet-user').val().trim();
  const message = $newTweetForm.find('.new-tweet-message').val().trim();

  if (user && message) {

    //  Set global visitor 
    window.visitor = user;

    // Ensure the user exists in streams
    if (!streams.users[user]) {
      streams.users[user] = [];
    }

    // Write the tweet (only message!)
    writeTweet(message);

    // Reset & re-render
    $newTweetForm[0].reset();
    addNewTweets();
  }
});

  
  $page.prepend($newTweetForm);

    // Initial load
    addNewTweets();

    $('#new-tweets-button').on('click', () => {
  addNewTweets();   // or whatever your update function is named
});

   // Create and attach the refresh button

   // When clicked, add only new tweets, this button generates new tweets when clicked
      // if a username was clicked, it will only show tweets from that user and new tweets from that user as well
      // basically only generate new tweets for the user being viewed
const $refreshButton = $('<button class="refresh-button">Show more tweets</button>');
$page.prepend($refreshButton);

$refreshButton.on('click', () => {
  if (currentUserFilter) {
    // Load only new tweets for the selected user
    const filteredTweets = newTweets.filter(
      tweet => tweet.user === currentUserFilter
    );
    addNewTweets(filteredTweets);
  } else {
    // No filter → load everything normally
    addNewTweets(newTweets);
  }
});

    // need a way to return to the full tweet list, it shoudldn't remove old the tweets though


})