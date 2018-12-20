var text = document.querySelector("#text");
var author = document.querySelector("#author");
var next = document.querySelector("#new-quote");
var quoteContainer = document.querySelector("#quote-box");
var bookmark = document.querySelector("#bookmark");

function getQuotes() {
	var quoteAPI = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?";
	$.getJSON(quoteAPI, function(data) {
		console.log(data);
		author.textContent = data["0"].title;
		text.innerHTML = data["0"].content;
	})
}

function nextQuote() {
	getQuotes();
	getColor();
	quoteContainer.style.transition = "opacity 2s";
	quoteContainer.style.opacity = 1;
}

getQuotes();

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
	if (window.sidebar && window.sidebar.addPanel) { // Firefox <23
		window.sidebar.addPanel(document.title, window.location.href, "");
	} else if(window.external && ("AddFavorite" in window.external)) { // Internet Explorer
		window.external.AddFavorite(location.href, document.title); 
	} else if(window.opera && window.print || window.sidebar && !(window.sidebar instanceof Node)) { // Opera <15 and Firefox >23
		/**
		 * For Firefox <23 and Opera <15, no need for JS to add to bookmarks
		 * The only thing needed is a `title` and a `rel="sidebar"`
		 * To ensure that the bookmarked URL doesn't have a complementary `#` from our trigger's href
		 * we force the current URL
		 */
		bookmark.attr('rel', 'sidebar').attr('title', document.title).attr('href', window.location.href);
		return true;
	} else { // For the other browsers (mainly WebKit) we use a simple alert to inform users that they can add to bookmarks with ctrl+D/cmd+D
		alert('You can add this page to your bookmarks by pressing ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command' : 'Ctrl') + '+D on your keyboard.');
	}
	// If you have something in the `href` of your trigger
	return false;
}