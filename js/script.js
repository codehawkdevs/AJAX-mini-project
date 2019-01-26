
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+address+"&key=AIzaSyCkKrEZRjUWyKyNXXaqTi4AZ6i9SJWJ-iM";
    $body.append('<img class="bgimg" src="'+ streetviewUrl+'">');

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=Ihaic7fGAEbZ4NxSo5Xf80ADzaom7Wti';
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New york Times Articles About' + cityStr);

        articles = data.response.docs;
        for(var i = 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+ article.headline.main+'</a>'+ '<p>' + article.snippet + '</p>' + '</li>');

        };
    }).fail(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function()
    {
        $wikiElem.text("Failed to get the wikipedia resources");
    },8000);
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        // jsonp: "callback",
        success: function(response){
            var articlelist = response[1];

            for (var i = articlelist.length - 1; i >= 0; i--) {
                articleStr = articlelist[i];
                var url = 'http://en.wikipedia.org/wiki/'+articleStr;
                $wikiElem.append('<li><a href="'+url+'">'+ articleStr+ '</a></li>');

            };
            clearTimeout(wikiRequestTimeout);
        }
    });
    
    return false;
};

$('#form-container').submit(loadData);

// loadData();
