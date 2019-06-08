var request = require("request")
var http = require('http');
 
let key = 'YOUR API KEY';
let name = 'YOUR NAME';
let query = 'test';

let offset = 0;
let lang = 'en';
let format = 'json';

let url = 'https://api.qmeta.net/conn.php?key=' + key + '&query=' + query + '&offset=' + offset + '&lang=' + lang + '&format=' + format;

function genHTML(html){
  let handleRequest = (request, response) => {
      response.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
      });
      response.write(html);
      response.end();
  };
  http.createServer(handleRequest).listen(8000);
}

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        let results = body.results.list;
        var output = '<ol>';
        for(var result in results){
            let title = results[result].title;
            let link = results[result].link;
            let description = results[result].description;
            let favicon = results[result].favicon;

            output = output + '<li><a href="' + link + '"><img src="' + favicon + '" width="20px"/>' + title + '</a><br/><p>' + description + '</p></li>';
        }
        output = output + '</ol>';
        genHTML(output);
    }
})
