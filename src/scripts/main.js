// Write your javascript here...
// ES6 will be compiled with Webpack

import lozad from "lozad";

const supportsLazyLoad = "loading" in document.createElement("img");

const supportsIntersectionObserver =
  "IntersectionObserver" in window &&
  "IntersectionObserverEntry" in window &&
  "intersectionRatio" in window.IntersectionObserverEntry.prototype;

const images = document.querySelectorAll("main article img");
if (supportsLazyLoad || !supportsIntersectionObserver) {
  // If the browser supports native lazy loading
  // or doesn't support interSection observer
  // set the src and let the browser handle it
  images.forEach(node => {
    node.setAttribute("src", node.getAttribute("data-src"));
    node.removeAttribute("data-src");
  });
} else {
  // If the browser supports interSection observer
  // but not native lazy loading let's polyfill
  const observer = lozad(images);
  observer.observe();
}


document.addEventListener("DOMContentLoaded", function() {
  const className = 'lazy-background-image'
  const selector = `.${className}`
  var lazyloadImages;

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(selector);
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove(className);
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(selector);

    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove(className);
            }
        });
        if(lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})
