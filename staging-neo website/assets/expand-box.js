function checkHeight() {
  
  console.log("CheckHeight function is called");
    
    let facetBody = document.getElementsByClassName("ais-facet--body");
  	let facetEl = document.getElementsByClassName("ais-facet");
  	let facetMore = document.getElementsByClassName("more-btn");
  	
  
  	for (let step = 0; step < facetEl.length; step++) {
  		let facetHeight = facetBody[step].offsetHeight;
    	let moreEl = facetMore[step - 1];
    	
 
      	if (facetHeight > 400) {
    		facetEl[step].style.maxHeight = "426px";
          	facetEl[step].style.borderBottom = "1px solid #ffffff";
      		moreEl.style.display = "block";
          	console.log("Let the loop begin!");
    	}
  	}
}
 
facetEl = document.getElementsByClassName("ais-facet");
let toggleSwitch = 0;
  
function showMore(a,b) {
  if(!toggleSwitch) {
   facetEl[a].style.maxHeight = "none";
   document.getElementsByClassName("more-btn")[b].innerHTML = "- Show Less";
   toggleSwitch = 1;
  } else {
    facetEl[a].style.maxHeight = "430px";
   	document.getElementsByClassName("more-btn")[b].innerHTML = "+ Show More";
    toggleSwitch = 0;
  }
}

