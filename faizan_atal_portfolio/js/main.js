/* main.js | Faizan Atal portfolio | INFO1005 Assessment 3
   Two features: a terminal that types out in the hero, and a photo lightbox.
 */

(function () {
  'use strict';

  /* ---------- 1. Hero terminal typing effect ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var output = document.getElementById('terminal-output');

  // The lines match the text already written in index.html
  var lines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'faizanullah atal | IT support and cybersecurity student' },
    { type: 'cmd', text: 'ls skills/' },
    { type: 'out', text: 'windows  linux  networking  siem  incident-response' },
    { type: 'cmd', text: 'cat status.txt' },
    { type: 'out', text: 'open to level 1 service desk and IT support roles' }
  ];

  var PROMPT = 'faizan@portfolio:~$ ';

  // Adds the last prompt line with a blinking caret
  function addFinalPrompt() {
    var row = document.createElement('div');
    var prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = PROMPT;
    var caret = document.createElement('span');
    caret.className = 'caret';
    row.appendChild(prompt);
    row.appendChild(caret);
    output.appendChild(row);
  }

  // Types one line, then moves on to the next
  function run(index) {
    if (index >= lines.length) {
      addFinalPrompt();
      return;
    }

    var item = lines[index];
    var row = document.createElement('div');
    output.appendChild(row);

    if (item.type === 'cmd') {
      var prompt = document.createElement('span');
      prompt.className = 'prompt';
      prompt.textContent = PROMPT;
      var command = document.createElement('span');
      command.className = 'cmd';
      row.appendChild(prompt);
      row.appendChild(command);

      var count = 0;
      var typeNextLetter = function () {
        count += 1;
        command.textContent = item.text.slice(0, count);
        if (count < item.text.length) {
          setTimeout(typeNextLetter, 55);
        } else {
          setTimeout(function () { run(index + 1); }, 350);
        }
      };
      typeNextLetter();
    } else {
      row.className = 'result';
      row.textContent = item.text;
      setTimeout(function () { run(index + 1); }, 450);
    }
  }

  // If the visitor prefers reduced motion, keep the finished text from the HTML
  if (output && !reduceMotion) {
    output.textContent = '';
    setTimeout(function () { run(0); }, 600);
  }

  /* ---------- 2. Photo lightbox ---------- */
  var modalElement = document.getElementById('image-modal');

  if (modalElement && window.bootstrap) {
    var modal = new bootstrap.Modal(modalElement);
    var modalImage = document.getElementById('modal-image');
    var modalCaption = document.getElementById('modal-caption');
    var photos = document.querySelectorAll('.carousel-img');

    photos.forEach(function (photo) {
      var openPhoto = function () {
        modalImage.src = photo.src;
        modalImage.alt = photo.alt;
        modalCaption.textContent = photo.alt;
        modal.show();
      };

      photo.addEventListener('click', openPhoto);
      // Lets keyboard users open the photo with Enter or Space
      photo.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openPhoto();
        }
      });
    });
  }

  /* ---------- 3. Automatic photo slideshow ---------- */
  var carouselElement = document.getElementById('project-carousel');
  var toggleButton = document.getElementById('carousel-toggle');

  if (carouselElement && toggleButton && window.bootstrap) {
    // ride: 'carousel' starts sliding as soon as the page loads.
    // If the visitor prefers reduced motion, the slideshow stays still until they press play.
    var carousel = new bootstrap.Carousel(carouselElement, {
      interval: 4500,
      pause: false,
      wrap: true,
      ride: reduceMotion ? false : 'carousel'
    });
    var playing = !reduceMotion;

    // Keeps the button icon and its label in step with the slideshow
    var updateToggle = function () {
      toggleButton.setAttribute('aria-label', playing ? 'Pause photo slideshow' : 'Play photo slideshow');
      toggleButton.firstElementChild.className = playing ? 'bi bi-pause-fill' : 'bi bi-play-fill';
    };

    toggleButton.addEventListener('click', function () {
      if (playing) {
        carousel.pause();
      } else {
        carousel.cycle();
      }
      playing = !playing;
      updateToggle();
    });
    updateToggle();

   
  }
})();