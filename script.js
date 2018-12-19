var text = document.querySelector("#text");
var author = document.querySelector("#author");

function getQuotes() {
	var quoteAPI = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?";
	$.getJSON(quoteAPI, function(data) {
		console.log(data);
		author.textContent = data["0"].title;
		text.innerHTML = data["0"].content;
	})

}

getQuotes();

var colors = ["#5ec0bc", "#ffc95e", "#f36d6a", "#76a6ef", "#b783c9"];