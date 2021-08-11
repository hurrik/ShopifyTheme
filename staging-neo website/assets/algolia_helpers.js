/* See https://www.algolia.com/doc/integration/shopify/advanced-customization/customizing-instant-search/#hogan */

(function(algolia) {
  'use strict';

  var _ = algolia._;

  var formatPrice = function formatPrice(value) {
    return algolia.formatMoney(Number(value) * 100);
  };

  function formattedPriceWithComparison(price, compare_at_price, price_ratio) {
    var comparing =  Number(compare_at_price) && Number(compare_at_price) > Number(price);
    var discount_ratio = 1.0 - price_ratio;
    var res = '<b>' + formatPrice(price) + '</b>';
    if (comparing) {
      res += ' <span class="ais-hit--price-striked"><span>' + formatPrice(compare_at_price) + '</span></span> ';
      res += ' <span class="ais-hit--price-discount" style="font-weight: ' +  Math.floor(discount_ratio * 10) * 100 +';">-' +Math.floor(discount_ratio * 100) +'%</span>';
    }

    return res;
  }

  var escapeHtml = function escapeHtml(unsafe) {
    return (unsafe || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  algolia.helpers = {
    formatNumber: function formatNumber(text, render) {
      return Number(render(text)).toLocaleString();
    },
    formattedPrice: function formattedPrice(text, render) {
      return formatPrice(render(text));
    },
    formattedPriceWithoutDecimals: function formattedPriceWithoutDecimals(
      text,
      render
    ) {
      return formatPrice(render(text)).replace(/\.\d+$/, '');
    },
    autocompletePrice: function autocompletePrice() {
//       console.log(' GD-DJM-S9 ',this.meta)
      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        var option1 = this.option1;
        var prodPrice = this.price;
        var optionTitle = this.options.title;
        if (optionTitle === "New") {
        	return '<b>' + formatPrice(prodPrice) + '</b>';
        	} else if (optionTitle === "Used Good") {
          		return 'Used from: <b>' + formatPrice(prodPrice) + '</b>';
        	} else if (optionTitle ===  "Refurbished") {
          		return 'Refurb from: <b>' + formatPrice(prodPrice) + '</b>';
        	} 
      }
      return formattedPriceWithComparison(this.price, null);
    },
    instantsearchPrice: function instantsearchPrice() {
      if (this._distinct) {
        var min = this.variants_min_price;
        var max = this.variants_max_price;
        var option1 = this.option1;
        var prodPrice = this.price;
        var optionTitle = this.options.title;
        if (optionTitle === "New") {
        	return '<b>' + formatPrice(prodPrice) + '</b>';
        	} else if (optionTitle === "Used Good") {
          		return 'Used from: <b>' + formatPrice(prodPrice) + '</b>';
        	} else if (optionTitle ===  "Refurbished") {
          		return 'Refurb from: <b>' + formatPrice(prodPrice) + '</b>';
        	}else if (optionTitle ===  "Touring Gear - Used") {
              return 'Used from: <b>' + formatPrice(prodPrice) + '</b>';
            } 
      	}
      return formattedPriceWithComparison(
        this.price,
        this.compare_at_price,
        this.price_ratio
      );
    },
    
    collectionAutocomplete: function collectionAutocomplete() {
      if(this.meta.global && this.meta.global.no_collection_search && this.meta.global.no_collection_search){
        return "display:none;"
      }
    },
    
    instantsearchLink: function instantsearchLink() {
      var addVariantId = !this._distinct && this.objectID !== this.id;
      return (
        '/products/' +
        this.handle +
        (addVariantId ? '?variant=' + this.objectID : '')
      );
    },
    fullTitle: function fullTitle() {
      var res = this.title;
      if (
        !this._distinct &&
        this.variant_title &&
        this.variant_title !== 'Default Title' &&
        this.variant_title !== 'Default'
      ) {
        res += ' (' + this.variant_title + ')';
      }

      return escapeHtml(res);
    },
    fullHTMLTitle: function fullHTMLTitle() {
      var res = this._highlightResult.title.value;
      if (
        !this._distinct &&
        this.variant_title &&
        this.variant_title !== 'Default Title' &&
        this.variant_title !== 'Default'
      ) {
        res +=
          ' <span class="algolia-variant">(' +
          this._highlightResult.variant_title.value +
          ')</span>';
      }

      return res;
    },
    floor: function floor(text, render) {
      return '' + Math.floor(Number(render(text)));
    },
    ceil: function ceil(text, render) {
      return '' + Math.ceil(Number(render(text)));
    },
    sizedImage: function sizedImage(text, render) {
      var image = this._distinct ? this.product_image : this.image;
      if (!image) {
        return 'http://cdn.shopify.com/s/images/admin/no-image-compact.gif';
      }
      var size = render(text).replace(/^\s+|\s+$/g, ''); // Render and trim
      if (size === 'original') {
        return image;
      }
      return image.replace(/\/(.*)\.(\w{2,4})/g, '/$1_' + size + '.$2');
    },
    variantPrice: function variantPrice(text, render) {
  		var p = this.price;
        var q = p * 100;
        
      	
      	return q;
  	},
    getRating: function getRating(text, render) {
    
        var ratingNum = this.meta.turnto.product_rating;
        
        function ratingGen(x){
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
        
       return ratingGen(ratingNum);
    },
    quoteRequest: function quoteRequest() {
      if(this.tags.includes('Quote')) {
         return '<p class="ais-hit--price">View For Quote</p>';
        }
       else {
      	return '<p class="ais-hit--price">[[# helpers.instantsearchPrice ]][[/ helpers.instantsearchPrice ]]</p>';
      };
    },
    quoteRequestAC: function quoteRequestAC() {
      if(this.tags.includes('Quote')) {
         return '<p class="aa-product-price">View For Quote</p>';
        }
       else {
      	return '<p class="aa-product-price">[[# helpers.autocompletePrice ]][[/ helpers.autocompletePrice ]]</p>';
      };
    },
	checkSale: function checkSale() {
    	if(this.tags.includes('Sale') && this.named_tags_names.includes('Rebate')) {
          const rebateText = this.named_tags.Rebate;
        	return '<div class="rebateBox">' + rebateText + '</div>';
       }
      else if(this.named_tags_names.includes('Rebate')) {
      	const rebateText = this.named_tags.Rebate;
           return '<div class="rebateBox">' + rebateText + '</div>';
      } 
       else if(this.tags.includes('Sale')) {
         return '<span class="sales-tag"><img data-src="//cdn.shopify.com/s/files/1/0277/2631/5568/files/Sale_67829bd4-58db-403d-a190-074c51615ef6.png" class="lazyload"></span>';
      };
    },
    addAffirm: function addAffirm() {
  			return '<div class="affirm-as-low-as" data-page-type="search" data-amount="[[# helpers.variantPrice ]][[/ helpers.variantPrice ]]" data-affirm-type="text" data-learnmore-show="false"></div>'
  		},
    checkNew: function checkNew() {
      if(this.collections.includes('new-product')) {
  			return '<div class="newTag"></div>';
  	  }
    } 
   
  };

  _.forEach(
    [
      'pico',
      'icon',
      'thumb',
      'small',
      'compact',
      'medium',
      'large',
      'grande',
      'original',
    ],
    function(size) {
      algolia.helpers[size + 'Image'] = (function(_size) {
        return function() {
          var image = this._distinct ? this.product_image : this.image;
          if (!image) {
            return 'http://cdn.shopify.com/s/images/admin/no-image-compact.gif';
          }
          if (_size === 'original') {
            return image;
          }
          return image.replace(/\/(.*)\.(\w{2,4})/g, '/$1_' + _size + '.$2');
        };
      })(size); // We need to create a new scope so that the internal size has the good value.
    }
  );

  /* Create an Hogan lambda, which doesn't respect the mustache doc */
  algolia.hoganHelpers = _.reduce(
    Object.assign({}, algolia.helpers, algolia.translation_helpers),
    function(res, helper, name) {
      var newRes = Object.assign({}, res);
      newRes[name] = function() {
        return function(text) {
          var render = function(value) {
            return window.Hogan.compile(value, algolia.hoganOptions).render(
              this
            );
          }.bind(this);
          return helper.call(this, text, render);
        }.bind(this);
      };
      return newRes;
    },
    {}
  );
})(window.algoliaShopify);
