function fetchTweets() {
  $.get("https://twither.herokuapp.com/tweets")
  .done(function(data) {
    $('.tweets').html('');
    var tweets = JSON.parse(data);
    for (var key in tweets) {
      var item = tweets[key];
      var tweet = $('<div/>').addClass('tweet');
      var date = new Date(item.timestamp);
      tweet.append($('<div/>').addClass('date').text(date.toUTCString()));
      tweet.append($('<div/>').addClass('content').text(item.content));
      tweet.append($('<div/>').addClass('author').text('-' + item.author));
      $('.tweets').prepend(tweet);
    }
  })
  .fail(function(xhr, status, err) {
    console.error(err);
  });
}


$(document).ready(function() {
  window.setInterval(fetchTweets, 5000);
});
