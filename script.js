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
		method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
        object: {
            'og:url': 'https://elaintran.github.io/QuoteGenerator/',
            'og:title': 'Quote Generator',
            'og:description': text.textContent + " -" + author.textContent,
            'og:image': 'https://elaintran.github.io/images/quote-machine.png',
            }
        })
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
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;

    if ('addToHomescreen' in window && addToHomescreen.isCompatible) {
      // Mobile browsers
      addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
    } else if (window.sidebar && window.sidebar.addPanel) {
      // Firefox <=22
      window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
      // Firefox 23+ and Opera <=14
      $(this).attr({
        href: bookmarkURL,
        title: bookmarkTitle,
        rel: 'sidebar'
      }).off(e);
      return true;
    } else if (window.external && ('AddFavorite' in window.external)) {
      // IE Favorites
      window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
      // Other browsers (mainly WebKit & Blink - Safari, Chrome, Opera 15+)
      alert('Press ' + (/Mac/i.test(navigator.platform) ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
    }

    return false;
}
