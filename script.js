var text = document.querySelector("#text");
var author = document.querySelector("#author");
var next = document.querySelector("#new-quote");
var quoteContainer = document.querySelector("#quote-box");
var bookmark = document.querySelector("#bookmark");

var authorQuote;
var textQuote;

function getQuotes() {
	var quoteAPI = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?";
	$.getJSON(quoteAPI, function(data) {
		console.log(data);
		if (data["0"].content.length >= 260) {
			getQuotes();
			authorQuote = data["0"].title;
			textQuote = data["0"].content;
			//author.textContent = data["0"].title;
			//text.innerHTML = data["0"].content;
		} else if (data["0"].content.length < 260) {
			//author.textContent = data["0"].title;
			//text.innerHTML = data["0"].content;
			authorQuote = data["0"].title;
			textQuote = data["0"].content;
		}
		if (author.textContent === "") {
			author.textContent = data["0"].title;;
			text.innerHTML = data["0"].content;
		}
	})
}

function returnQuote() {
	getQuotes();
	return authorQuote;
	return textQuote;
}
returnQuote();

/*function initialQuote() {
	getQuotes();
	author.textContent = authorQuote;
	text.innerHTML = textQuote;
}
initialQuote();*/

function nextQuote() {
	$(".quote-container").animate({ opacity: 0 }, 500, function() {
	    $(this).animate({ opacity: 1}, 500);
	    getColor();
	    getQuotes();
	    author.textContent = authorQuote;
	    text.innerHTML = textQuote;
    }
  );
}
//nextQuote();

var colors = ["#5ec0bc", "#ffc95e", "#f36d6a", "#5ab7ed", "#b783c9", "#7ccd83"];

function getColor() {
	var colorNumber = Math.floor(Math.random() * colors.length);
	var newColor = colors[colorNumber];
	author.style.backgroundColor = newColor;
}

function tweetQuote() {
	var quoteContent = text.textContent;
	var authorContent = author.textContent;
	var twitterURL = "https://twitter.com/intent/tweet?text=" + quoteContent + " -" + authorContent;
	window.open(twitterURL);
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip(); 
});

function bookmarkPage() {
	alert('You can add this page to your bookmarks by pressing ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command' : 'Ctrl') + '+D on your keyboard.');
}