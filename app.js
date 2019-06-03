"use strict"
var states = {
  mobileMenu: false,
  lightBox: false,
}

var slideIndex;


var classes =  {
  hidden: 'hidden',
  mobileHidden: 'mobileHidden',
  visible: 'visible',
}

var imgQuality = {
  desktop1080: '1080',
}

// Array of all main sections
var mainSections = document.querySelectorAll('main > section');

// Map of all main sections
var sections =  {
  home: document.getElementById('home'),
  about: document.getElementById('about'),
  photos: document.getElementById('photos'),
  contact: document.getElementById('contact'),
  lightbox: document.getElementsByClassName('lightbox')[0]
}
// nav section
var nav = document.querySelector('body > nav');
// cache section
var cache = document.getElementById('cache');



// Menu Buttons
var navBtns = {
  home: document.getElementById('home-btn'),
  about: document.getElementById('about-btn'),
  photos: document.getElementById('photos-btn'),
  contact: document.getElementById('contact-btn'),
}
// Header Buttons
var header = {
  logo: document.getElementById('logoImage'),
  h1: document.querySelector('header h1'),
  openMenu: document.getElementById('menu-btn'),
  closeMenu: document.getElementById('close-menu')
}

// Images
var imgSets =  {
  set1: document.querySelectorAll('#imgSet1 > figure > img'),
  set2: document.querySelectorAll('#imgSet2 > figure > img'),
  set3: document.querySelectorAll('#imgSet3 > figure > img'),
}

// Lightbox
var lightBox = {
  close: document.querySelector('.lightbox__close'),
  previous: document.querySelector('.lightbox__previous'),
  next: document.querySelector('.lightbox__next'),
}








// in: 1: arr, 2: class name
// add the className to every item in the array
function addClassToArray(array, className) {
  for(var i = 0; i < array.length; i++) {
    sections[i].classList.add(className);
  }
}

// in: 1:obj, 2: class name
// add the class to every property of the object
function addClassToObjectProperties(object, className) {
  for(var section in object) {
    object[section].classList.add(className);
  }
}

// in: 1:obj, 2: class name
// add the class to every property of the object
function removeClassFromObjectProperties(object, className) {
  for(var section in object) {
    object[section].classList.remove(className);
  }
}

//in: 1:HTML element, 2: class name
// add the class name to the HTML element
function addClassToElement(element, className) {
  element.classList.add(className);
}

//in: 1:HTML element, 2: class name
// remove class from an element
function removeClassFromElement(element, className) {
  element.classList.remove(className);
}

function hideAllSections() {
  removeClassFromObjectProperties(sections, classes.visible);
  addClassToObjectProperties(sections, classes.hidden);
}

// Show a section
// in: section
function showMainSection(section) {
  // Hide all sections
  hideAllSections();
  // Show a section
  addClassToElement(section, classes.visible);
}

// Open/close mobile menu
function showMobileMenu() {
  if(states.mobileMenu === false) {
    removeClassFromElement(nav, classes.mobileHidden);
    states.mobileMenu = true;
  }
}
function hideMobileMenu() {
  if(states.mobileMenu === true) {
    addClassToElement(nav, classes.mobileHidden);
    states.mobileMenu = false;
  }
}

// Open/close lightbox
function showLightbox() {
  if(states.lightBox === false) {
    removeClassFromElement(sections.lightbox, classes.hidden);
    states.lightBox = true;
  }
}
function hideLightbox() {
  if(states.lightBox === true) {
    addClassToElement(sections.lightbox, classes.hidden);
    states.lightBox = false;
  }
}

// Load Proper Images into the lightbox
function loadLightboxImages(imgSet, quality) {
  const lightboxContent = document.querySelector('.lightbox__content');
  const cacheContent = document.querySelectorAll('#cache > .lightbox__slide');
  for(let i = 0; i < imgSet.length; i++) {
    // cacheLength
    const cacheLength = cacheContent.length;
    let newCacheLength = cacheLength;

    // Create new div
    let newSlide = document.createElement('div');
    newSlide.classList.add('lightbox__slide');
    // Create new image
    let newImage = document.createElement('img');
    newImage.classList.add('lightbox__image');
    // Get the proper source
    let originalSrc = imgSet[i].src;
    let newSrc = originalSrc.replace('png', quality);
    // Add new source
    newImage.src = newSrc;
    newSlide.appendChild(newImage);
    if(cacheContent.length > 0) {
      for(let i = 0; i < cacheContent.length; i++) {
        if(cacheContent[i].firstElementChild.src === newSlide.firstElementChild.src) {
          lightboxContent.appendChild(cacheContent[i]);
          newCacheLength = newCacheLength -1;
          break;
        }
      }
    } else {
      lightboxContent.appendChild(newSlide);
    }
    if(cacheLength === newCacheLength) {
      lightboxContent.appendChild(newSlide);
    }
  }
}

// move the images to cache
function cacheImages() {
  let images = document.querySelectorAll('.lightbox__slide');
  for(let i = 0; i < images.length; i++) {
    cache.appendChild(images[i]);
  }
}

function showSlide(index) {
  slideIndex = index;
  let i;
  let slides = document.querySelectorAll('.lightbox__content > .lightbox__slide');
  let numbering = document.querySelector('.lightbox__number');
  if(index > slides.length -1) {
    slideIndex = 0;
  }
  if(index < 0) {
    slideIndex = slides.length -1;
  }
  for(i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  // console.log(slides[slideIndex]);
  slides[slideIndex].style.display = 'block';
  numbering.innerHTML = (slideIndex + 1) + ' / ' + slides.length;
}

function plusSlide(n) {
  showSlide(slideIndex + n);
}



// Show home section on logo click
header.logo.addEventListener('click', function() {
  showMainSection(sections.home);
});
// Show home section on h1 click
header.h1.addEventListener('click', function() {
  showMainSection(sections.home);
});

// Menu click events
for(var btn in navBtns) {
  let button = btn;
  navBtns[button].addEventListener('click', function() {
    showMainSection(sections[button]);
    hideMobileMenu();
  })
}

// Open lightbox on image click
for(var set in imgSets) {
  let imgSet = imgSets[set];
  // console.log(imgSet);
  for(let i = 0; i < imgSet.length; i++) {
    // console.log(imgSet[i]);
    imgSet[i].addEventListener('click', function() {
      loadLightboxImages(imgSet, imgQuality.desktop1080);
      showSlide(i);
      showLightbox();

      
    })
  }
}
// Close lightbox on  cancel button click
lightBox.close.addEventListener('click', function() {
  
  hideLightbox();
  cacheImages();
  // var cacheContent = document.querySelectorAll('#cache > img');
  // console.log(cacheContent);
});

// Show next Slide on left click
lightBox.previous.addEventListener('click', function() {
  plusSlide(-1);
})
// Show next Slide on left click
lightBox.next.addEventListener('click', function() {
  plusSlide(+1);
})


// show mobile menu on click
header.openMenu.addEventListener('click', function() {
  showMobileMenu();
});
// close mobile menu on closing icon click
header.closeMenu.addEventListener('click', function() {
  hideMobileMenu();
})
// close mobile menu when clicked outside the menu
nav.addEventListener('click', function(e) {
  if(e.target === nav) {
    hideMobileMenu();
  }
})

// Close lightbox by pressing escape
document.addEventListener('keyup', function(e) {
  if(states.lightBox === true) {
    if(e.key === 'Escape' || e.key === 'Esc') {
      hideLightbox();
      cacheImages();
    }
  }
});
// Move Slides On KeyPress
document.addEventListener('keyup', function(e) {
  if(states.lightBox === true) {
    if(e.key === 'ArrowLeft' || e.key === 'Left') {
      plusSlide(-1);
    }
  }
});
document.addEventListener('keyup', function(e) {
  if(states.lightBox === true) {
    if(e.key === 'ArrowRight' || e.key === 'Right') {
      plusSlide(1);
    }
  }
});

// Show Home Section On first Load
showMainSection(sections.home);














