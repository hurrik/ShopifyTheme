/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
function getYear() {
	var today = new Date();
	var year = today.getFullYear();
    let el = document.getElementById("currentYear");
  
  	el.innerHTML = year;
}

getYear();

document.addEventListener('variant:changed', function(event) {
  var variant = event.detail.variant; 
  
  var edpId = "edp-" + variant.id;
  
  if(document.getElementById(curEdpId)) {
  	document.getElementById(curEdpId).style.display = "none";
    
    if(document.getElementById(edpId)){ 
      document.getElementById(edpId).style.display = "inline";
      
      curEdpId = edpId;
    }
  }
  
 });

document.addEventListener('variant:changed', function(event) {
  var variant = event.detail.variant;
  var varprice = variant.price;
  
  if (varprice >= 19900) {
  	document.getElementById('qualify-shipping').innerHTML = 'This Item Ships <span>FREE</span>';
  } else if (varprice <= 19900) {
  	document.getElementById('qualify-shipping').innerHTML = '';
  } else {
  	document.getElementById('qualify-shipping').innerHTML = '';
  }

});

document.addEventListener('variant:changed', function(event) {
  var variant = event.detail.variant; // Gives you access to the whole variant details
  var productCondition = variant.title
  var conditionTipHolder = document.querySelector(".tooltip-container")

  if (productCondition == "Used Good") {
    conditionTipHolder.innerHTML = `
      <a href="#" class="tooltip">Learn More</a>
      <div class="tooltip--box">
      <strong>Used Good</strong>
      <p>Typically open box customer returns with limited use (typically less than 30-days of use). Items carry full manufacturer's warranties. </p>
      <a href="#" class="tooltip--box-close">close</a>
      </div>`
      const tipLink = document.querySelector(".tooltip")
      const tipBox = document.querySelector(".tooltip--box")
      const tipClose = document.querySelector(".tooltip--box-close")

      tipLink.addEventListener('click', (e) => openToolTip(e))
      tipClose.addEventListener('click', (e) => closeToolTip(e))  

      function openToolTip(e) {
        tipBox.classList.add("tooltip--box--visible")
      e.preventDefault()
    }

    function closeToolTip(e) {
      tipBox.classList.remove("tooltip--box--visible")
      e.preventDefault()
    }
  } else if (productCondition == "Touring") {
      conditionTipHolder.innerHTML = `
      <a href="#" class="tooltip">Learn More</a>
        <div class="tooltip--box">
        <strong>Touring Gear - Used</strong>
        <p>Equipment that has been out on tour and or rental. Some items are available with touring cases/transport racks, please contact us for details. All items carry a 90-Day warranty and are guaranteed to be in good working order. </p>
        <a href="#" class="tooltip--box-close">close</a>
        </div>
        `
        const tipLink = document.querySelector(".tooltip")
        const tipBox = document.querySelector(".tooltip--box")
        const tipClose = document.querySelector(".tooltip--box-close")

        tipLink.addEventListener('click', (e) => openToolTip(e))
        tipClose.addEventListener('click', (e) => closeToolTip(e))  

        function openToolTip(e) {
        tipBox.classList.add("tooltip--box--visible")
        e.preventDefault()
        }

        function closeToolTip(e) {
        tipBox.classList.remove("tooltip--box--visible")
        e.preventDefault()
  }
  } else if (productCondition == "New" || "Used"){
//     conditionTipHolder.innerHTML = '<span class="tooltip-container"></span>'
  }
  
});
function removeRatingBox() {
	let ratingSelector = document.getElementsByClassName("ais-facet-meta.turnto.product_rating")[0]; 
  	ratingSelector.style.display = "none";
    
}

function checkImg() {
	let el = document.getElementById('rondellCarousel');
  let el2 = document.getElementsByClassName('pdp-newtag')[0];
  let h = el.offsetHeight;
  	
  if (h < 500) {
  	let newOffset = h - 140;
    el2.style.top = newOffset + "px";
  }
}

function makeSelected(collectionName, index) {
	
  if (collectionName == 'New Products') {
  	console.log(collectionName);
    let el = document.getElementsByClassName('ais-sort-by-selector--item')[3];
   
    el.setAttribute("selected", "selected");
  }
}


        
window.ratingGen = function(x){
  if (x == 5) {
    let ratingDisplayNum = "5.0";
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -180px"></span><span class="rating-num">' + ratingDisplayNum + '</span>';
  } else if (x == 4.9 || x == 4.8) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -180px"></span><span class="rating-num">' + x + '</span>';
  } else if (x <= 4.7 && x >= 4.4) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -162px"></span><span class="rating-num">' + x + '</span>';
  } else if (x <= 4.3 && x >= 4.1) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -142px"></span><span class="rating-num">' + x + '</span>';
  } else if (x == 4) {
    let ratingDisplayNum = "4.0";
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -142px"></span><span class="rating-num">' + ratingDisplayNum + '</span>';
  } else if (x == 3.9 || x == 3.8) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -142px"></span><span class="rating-num">' + x + '</span>';
  } else if (x <= 3.7 && x >= 3.4) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -124px"></span><span class="rating-num">' + x + '</span>';
  } else if (x <= 3.3 && x >= 3.1) {
    var htmlElement = '<span  class="rating-stars" style="background-position: 50% -107px"></span><span class="rating-num">' + x + '</span>';
  } else if (x == 3) {
    let ratingDisplayNum = "3.0";
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -107px"></span><span class="rating-num">' + ratingDisplayNum + '</span>';
  } else if (x == 2.9 || x == 2.8) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -107px"></span><span class="rating-num">' + x + '</span>';
  } else if (x <= 2.7 && x >= 2.4) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -90px"></span><span class="rating-num">' + x + '</span>';
  } else if (x <= 2.3 && x >= 2.1) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -72px"></span><span class="rating-num">' + x + '</span>';
  } else if (x == 2) {
    let ratingDisplayNum = "2.0";
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -72px"></span><span class="rating-num">' + ratingDisplayNum + '</span>';
  } else if (x == 1.9 || x == 1.8) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -72px"></span><span class="rating-num">' + x + '</span>';
  } else if (x == 1.7 && x >= 1.4) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -54px"></span><span class="rating-num">' + x + '</span>';
  } else if (x == 1.3 && x >= 1.1) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -38px"></span><span class="rating-num">' + x + '</span>';
  } else if (x == 1) {
    let ratingDisplayNum = "1.0";
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -38px"></span><span class="rating-num">' + ratingDisplayNum + '</span>';
  } else if (x < 1 ) {
    var htmlElement = '<span class="rating-stars" style="background-position: 50% -38px"></span><span class="rating-num">' + x + '</span>';
  }
  return htmlElement;
};	


window.AddRatingContainer = function(){
  $('.ais-facet-conjunctive').each(function(ind,facet){
    var classes = $(facet).attr("class").split(/\s+/);
    if($(facet).hasClass('ais-facet-meta.turnto.product_rating')){
      $(facet).addClass('rating-container');
      $(facet).find('.ais-facet--label').each(function(ing,fsl){
        if($(fsl).find('.rating-num').length > 0){
          var rating =  window.ratingGen(parseFloat($(fsl).find('.rating-num').html()));
        }else{
          var rating =  window.ratingGen(parseFloat($(fsl).html().replace(/<[^>]*>?/gm, '').split(' ')[1]));
        }
        var number =  parseInt($(fsl).find('.ais-facet--count').html());
        var html = rating+'<span class="ais-RefinementList-count ais-facet--count">'+number+'</span>';
        $(fsl).html(html);
      })
    }
  });
}

$(document).on('click','.ais-current-refined-values--link',function(){
  setTimeout(function(){ 
    window.AddRatingContainer();
  }, 2000);

})


var interval = setInterval(doStuff, 2000);
function doStuff() {
  if($('.ais-facet-conjunctive').length > 0){
    clearInterval(interval);
    window.AddRatingContainer();
  }else{
  	 setTimeout(function(){  clearInterval(interval);  }, 2000);
  }
}

var oldXHR = window.XMLHttpRequest;
var checkValues = 'indexes/*/queries';
function newXHR() {
  var realXHR = new oldXHR();
  realXHR.addEventListener("readystatechange", function() {
    if(realXHR.readyState==4){
      if(realXHR.responseURL.indexOf(checkValues) >=0){
        var results = JSON.parse(realXHR.responseText).results[0];
        setTimeout(function(){ 
          window.AddRatingContainer();
        }, 1000);
      }
    }
  }, false);
  return realXHR;
}
window.XMLHttpRequest = newXHR;


