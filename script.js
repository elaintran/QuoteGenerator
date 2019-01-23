var text = document.querySelector("#text");
var author = document.querySelector("#author");
var next = document.querySelector("#new-quote");
var quoteContainer = document.querySelector("#quote-box");
var bookmark = document.querySelector("#bookmark");

var authorText;
var quoteText;

function getQuotes() {
	var quoteAPI = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?";
	$.getJSON(quoteAPI, function(data) {
		console.log(data);
		//authorText = data["0"].title;
		//quoteText = data["0"].content;
		author.textContent = data["0"].title;
		text.innerHTML = data["0"].content;
	})
}

getQuotes();

function nextQuote() {
	$(".quote-container").animate({ opacity: 0 }, 500, function() {
	    $(this).animate({ opacity: 1}, 500);
	    getColor();
	    getQuotes();
    }
  );
}
//nextQuote();

/*$(document).ready(function() {
	getQuotes().then(() => {
    	nextQuote();
  });
})*/

var colors = ["#5ec0bc", "#ffc95e", "#f36d6a", "#5ab7ed", "#b783c9", "#7ccd83"];

function getColor() {
	var colorNumber = Math.floor(Math.random() * colors.length);
	var newColor = colors[colorNumber];
	author.style.backgroundColor = newColor;
}

function tweetQuote() {
	var twitterURL = "https://twitter.com/intent/tweet?text=" + text.textContent + " -" + author.textContent;
	window.open(twitterURL);
}

function shareFB() {
	FB.ui({
	    method: 'feed',
	    display: 'popup',
	    name: 'Quote Generator',
	    link: 'https://elaintran.github.io/QuoteGenerator/',
	    description: text.textContent + " -" + author.textContent,
	},
  	// callback
  	function(response) {
	    if (response && !response.error_message) {
	    	alert('Posting completed.');
	    } else {
	    	alert('Error while posting.');
	    }
	})
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(); 
});

function bookmarkPage() {
	alert('You can add this page to your bookmarks by pressing ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command' : 'Ctrl') + '+D on your keyboard.');
}