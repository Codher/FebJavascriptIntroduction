function fetchTweets() {
  $.get("https://twither.herokuapp.com/tweets")
  .done(function(data) {
    $('.tweets').html('');
    for (var key in data) {
      var item = data[key];
      var tweet = $('<div/>').addClass('tweet').addClass(item.sentiment);
      var date = new Date(item.timestamp);
      var content = sanitize(item.content);
      tweet.append($('<div/>').addClass('date').text(date.toUTCString()));
      tweet.append($('<div/>').addClass('content').html(content));
      tweet.append($('<div/>').addClass('author').text('-' + item.author));
      $('.tweets').prepend(tweet);
    }
  })
  .fail(function(xhr, status, err) {
    console.error(err);
  });
}

function sanitize(string) {
  var re = /<script>/;
  if(re.test(string)) {
    return "For safety reasons, we can't show this tweet. Naughty naughty.";
  } else {
    return string;
  }

}


$(document).ready(function() {
  window.setInterval(fetchTweets, 5000);
});
