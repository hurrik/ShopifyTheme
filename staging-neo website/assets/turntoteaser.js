function loadTeaserCounts(sku) {
 var xhr = new XMLHttpRequest();
 var ugcCountsUrl = 'https://cdn-ws.turnto.com/v5/sitedata/Y52yQKWtdSFEM1psite/' + sku + '/d/ugc/counts/' + turnToConfig.locale;
 xhr.open('GET', ugcCountsUrl, true);
 xhr.addEventListener('load', function() {
   if (xhr.responseText) {
     populateTeaser(JSON.parse(xhr.responseText));
   }
 });
 xhr.send();
}

function populateTeaser(counts) {
 var fragment = document.createDocumentFragment();
 if (counts.reviews > 0) { // has reviews
     fragment.appendChild(generateTeaserStars(counts.avgRating));
     fragment.appendChild(generateReadReviews(counts.reviews));
     if (counts.questions > 0) {
        fragment.appendChild(document.createTextNode(' | '));
        fragment.appendChild(generateQuestions(counts.questions, counts.answers));
     }
     else if (counts.comments > 3) {
        fragment.appendChild(document.createTextNode(' | '));
    fragment.appendChild(generateReadComments(counts.comments));
     }
     fragment.appendChild(document.createTextNode(' or '));
     fragment.appendChild(generateWriteReview('Write a Review'));
} else { // no reviews
     if (counts.questions > 0) {
  fragment.appendChild(generateQuestions(counts.questions,  counts.answers));
        fragment.appendChild(document.createTextNode(' or '));
     }
     else if (counts.comments > 3) {
     fragment.appendChild(generateReadComments(counts.comments));
        fragment.appendChild(document.createTextNode(' or '));
     }
     fragment.appendChild(generateWriteReview('Be the first to write a review'));
}
 document.getElementById('tt-teaser').appendChild(fragment);
 // add event listener to handle click to open the write a review screen
 document.querySelector('.TTteaser__write-review').addEventListener('click',
   function(e) { TurnToCmd('reviewsList.writeReview');}
 );
}

function createTeaserElement(tag, className, text) {
 var el = document.createElement(tag);
 el.setAttribute('class', className);
 if (text) {
   el.innerText = text;
 }
 return el;
}

function generateWriteReview(text) {
 return createTeaserElement('button', 'TTteaser__write-review', text);
}

function generateQuestions(num_questions, num_answers) {
    // Populate with the number of questions
    var text = num_questions + ' Question' + (num_questions > 1 ? 's' : '');

     // Populate the number answers
     if (num_answers > 0) {
         text = text + ', ' + num_answers + ' Answer' + (num_answers > 1 ? 's' : '');
     }

     var el = createTeaserElement('a', 'TTteaser__read-qa', text);
     el.setAttribute('href', '#tt-qa-list-anchor');

      //For the Q&A Instant Answers widget set to the following
      //el.setAttribute('href', '#tt-instant-answers-widget');
      return el;
}

function generateReadComments(numComments) {
 // Populate the 'x Buyer Comments' text with the number of comments and set
 var text = numComments + ' Buyer Comment' + (numComments > 1 ? 's' : '');
 var el = createTeaserElement('a', 'TTteaser__read-comments', text);
 el.setAttribute('href', '#tt-chatter-widget');
 return el;
}

function generateReadReviews(numReviews) {
 // Populate the 'Read x Reviews' text with the number of reviews and set
 var text = 'Read ' + numReviews + ' Review' + (numReviews > 1 ? 's' : '');
 var el = createTeaserElement('a', 'TTteaser__read-reviews', text);
 el.setAttribute('href', '#tt-reviews-list-anchor');
 return el;
}

function generateTeaserStar(starType) {
 var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
 svgEl.setAttribute('class', 'TTteaser__icon--' + starType);
 useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
 useEl.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
   '#tt-teaser-star--' + starType);
 svgEl.appendChild(useEl);
 var el = createTeaserElement('span', 'TTteaser__star');
 el.appendChild(svgEl);
 return el;
}

// adjusts/rounds the rating to have decimal value of .0 or .5
function getAdjustedRating(rating) {
  var floorValue = Math.floor(rating);
  var rounded = Math.round(rating * 100) / 100;
  var decimalValue = parseFloat((rounded - floorValue).toFixed(2));
  if (decimalValue < 0.25) {
    return floorValue;
  } else if (decimalValue < 0.75) {
    return floorValue + 0.5;
  }
  return floorValue + 1;
}
function generateTeaserStars(rating) {
  var el = createTeaserElement('div', 'TTteaser__rating');
  var adjustedRating = getAdjustedRating(rating);
  for (var i = 1; i <= 5 ; i++) {
    if (i > adjustedRating && i - adjustedRating >= 1) {
      el.appendChild(generateTeaserStar('empty'));
    } else if (i <= adjustedRating) {
      el.appendChild(generateTeaserStar('full'));
    } else {
      el.appendChild(generateTeaserStar('half'));
    }
  }
  return el;
}