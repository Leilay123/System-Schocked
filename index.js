
// This code is BOTCHED and I'm aware of that 
// I been trying to redo it for the whole day
// I lowkey give up, I should of made each test into seprate functions but I didn't and when I try to do it everything breaks
// I'm just going to make it pretty and like... 
// all the tests are passing so... yea...

// what theme should I do?
// maybe a broken robot theme...

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

 // auto generating new tweets because I think it'll be neat
  function scheduleNextTweet() {
  generateNewTweet();

  // schedule next tweet between 1 second and 3.5 seconds 
  const nextTime = Math.random() * 2500 + 1000;
  setTimeout(scheduleNextTweet, nextTime);
}

// start generating tweets automatically
scheduleNextTweet();
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
  <input id="username-input" type="text" class="new-tweet-user" placeholder="3rr0r typ3" required />
  <br/>
  <textarea id="message-input" class="new-tweet-message" placeholder="Wh4t'5 wr0ng th1s t1m3?" required></textarea>
  <br/>
  <input type="submit" value="5ubm1t y0ur 3rr0r">

</form>   

<button id="new-tweets-button">G3n3r4t3 N3w Pr0bl3m5</button> // sure there was a neater way to do this whatever

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

    // I think I want to have the new tweets to generate automatically
    // like every 10 seconds or so
    // also have a way to control the speed of new tweet generation
    // like a slider or something


   // Create and attach the refresh button

   // When clicked, add only new tweets, this button generates new tweets when clicked
      // if a username was clicked, it will only show tweets from that user and new tweets from that user as well
      // basically only generate new tweets for the user being viewed
const $refreshButton = $('<button class="refresh-button">The useless button</button>');
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




    // ---- Generate a single new tweet (required by tests) ----
function generateNewTweet() {
  const randomUser = Object.keys(streams.users)[
    Math.floor(Math.random() * Object.keys(streams.users).length)
  ];

  const newTweet = {
    user: randomUser,
    message: Math.random().toString(36).slice(2),
    timestamp: new Date()
  };

  streams.home.push(newTweet);
  streams.users[randomUser].push(newTweet);
}

})