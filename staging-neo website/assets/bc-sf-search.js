// Override Settings
var bcSfSearchSettings = {
    search: {
      	suggestionMobileStyle: 'style2'
    }
}; 

// Customize style of Suggestion box
BCSfFilter.prototype.customizeSuggestion = function(suggestionElement, searchElement, searchBoxId) {  
};

BCSfFilter.prototype.buildSearchResultHeader = function(data){
  	jQ('.bc-sf-filter-breadcrumb').each(function(index, breadcrumb){
  		var html = jQ(breadcrumb).html();
      	html = html.replace(/{{terms}}/, bcsffilter.queryParams.q)
        jQ(breadcrumb).html(html);
      	jQ(breadcrumb).removeClass('hidden');
    })	
};

BCSfFilter.prototype.initSearchBox = function (id) {
	if (this.getSettingValue('search.enableSuggestion')) {

		//Remove theme's instant search
		removeThemeSearchEvent();

		var self = this;
		if (typeof id === 'undefined') {
			jQ('input[name="' + this.searchTermKey + '"]').each(function (i) {
				if (!jQ(this)[0].hasAttribute('data-no-bc-search')) {
					var id = 'bc-sf-search-box-' + i;
					jQ(this).attr('id', id);
					self.buildSearchBox('#' + id)
				}
			});
		} else {
			this.buildSearchBox(id);
		}
		if (this.isMobile()) {
			// Clear cache when going back from another page
			window.onpageshow = function (event) {
				if (event.persisted) {
					window.location.reload();
				}
			};
			// Build Suggestion mobile on top
			if (this.getSettingValue('search.suggestionMobileStyle') == 'style1') {
				this.buildSuggestionMobile();
			}
		}
	}
};

function removeThemeSearchEvent() {
	// Remove all events
	if (jQ('.header__search-bar-wrapper').length > 0) {
		var cloneSearchBar = jQ('.header__search-bar-wrapper:first').clone();
		jQ('.header__search-bar-wrapper').replaceWith(cloneSearchBar);
		jQ('.search-bar__filter').hide();
	}
	// Rebuild some event
	if (jQ('[data-action="toggle-search"]').length > 0) {
		jQ('[data-action="toggle-search"]').on('click', function () {
			jQ('.header__search-bar-wrapper').toggleClass('is-visible');
		})
	}
	if (jQ('[data-action="clear-input"]').length > 0) {
		jQ('[data-action="clear-input"]').on('click', function () {
			jQ('input[name="' + bcsffilter.searchTermKey + '"]').val('');
		})
	}
}