require('./app.scss');

var pageElement = document.getElementById('page');

function loadPath(path) {
  var pageName = path === '/' ? '/index' : path.replace(/\/+$/, '');
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function() {
    if (this.status === 404) {
      loadPath('/404');
    } else {
      pageElement.innerHTML = this.responseText;
      window.scrollTo(0, 0);
      interceptLinksIn(pageElement);
    }
  });

  xhr.open('GET', '/pages' + pageName + '.html', true);
  xhr.send();
}

function interceptLinksIn(parent) {
  parent.querySelectorAll('a[href]:not(.email)').forEach(function(link) {
    link.addEventListener(
      'click',
      function(e) {
        e.preventDefault();
        if (this.getAttribute('href') !== window.location.pathname) {
          loadPath(this.getAttribute('href'));
          history.pushState(
            null,
            this.getAttribute('href'),
            this.getAttribute('href')
          );
        }
      },
      false
    );
  });
}

window.onpopstate = function() {
  loadPath(window.location.pathname);
};

loadPath(window.location.pathname);
interceptLinksIn(document);
