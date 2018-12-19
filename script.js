var text = document.querySelector("#text");
var author = document.querySelector("#author");
var next = document.querySelector("#new-quote");

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
}

getQuotes();

var colors = ["#5ec0bc", "#ffc95e", "#f36d6a", "#5ab7ed", "#b783c9"];

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