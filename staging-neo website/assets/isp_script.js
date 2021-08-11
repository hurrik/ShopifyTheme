
var input = document.getElementsByClassName("search-bar")[0];
input.parentNode.removeChild(input);
document.addEventListener("DOMContentLoaded", function() {
    document.getElementsByClassName("header__search-bar-wrapper")[0].appendChild(input);
});