//imports
const fs = require('fs').promises
const http = require('http');


const requestListener = function (req, res) {
  var route;

  //check url
  switch (req.url) {
    case "/":
      route = "home.html"
      break;
    case "/about":
      route = "about.html"
      break;
    case "/contact":
      route = "contact.html"
      break;
    case "/home":
      route = "home"
      break;
    default:
      route = ""
      break;
  }

  if (route === "") {
    //404 not found
    res.writeHead(400)
    res.end("404: Page not found")
  }
  else if (route === "home") {
    //redirect to base url /
    res.writeHead(302, {
      location: "/",
    });
    res.end();
  }
  else{
    //display html page
    showPage(route, req, res)
  }

}

const showPage = (page, req, res) => {
  //read html file and display
  fs.readFile(__dirname + "/public/" + page)
  .then(html => {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200);
    res.end(html)
  })
  .catch(error => {
    res.writeHead(500);
    res.end(error)
    return;
  })
} 

//start server
const server = http.createServer(requestListener);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

server.listen(port);

