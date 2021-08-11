var onSale = false;
var soldOut = false;
var priceVaries = false;
var images = [];
var firstVariant = {};

// Override Settings
var bcSfFilterSettings = {
	general: {
		limit: bcSfFilterConfig.custom.products_per_page,
		loadProductFirst: true,
		numberFilterTree: 2
	}
};

// Declare Templates
var bcSfFilterTemplate = {

	'saleLabelHtml': '<span class="product-label product-label--on-sale">' + bcSfFilterConfig.label.sale + '</span>',
	'tagLabelHtml': '<span class="product-label {{tagLabelClass}}">{{tagLabel}}</span>',
	'imageHtml': '<img class="{{imageClass}} lazyload image--blur-up" src="{{imageUrl}}" data-image-id="{{imageId}}" data-src="{{image_url}}" data-sizes="auto" alt="{{itemTitle}}">',
	'reviewHtml': '<a class="product-item__reviews-badge link" href="{{itemUrl}}#product-reviews"><span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span></a>',

	// Grid Template
	'productGridItemHtml': 	'<div class="product-item product-item--vertical 1/3--tablet-and-up {{gridWidthClass}} ">' +
								'<div class="product-item__label-list">' +
									'{{itemLabels}}' +
								'</div>' +
								'<a href="{{itemUrl}}" class="product-item__image-wrapper {{imageWrapperClass}}">' +
									'<div class="aspect-ratio {{imageAspectRatioClass}}" style="padding-bottom: {{imagePadding}}%">' +
										'{{itemImages}}' +
									'</div>' +
								'</a>' +
								'<div class="product-item__info">' +
									'<div class="product-item__info-inner">' +
										'{{itemInfo}}' +
										'{{itemReview}}' +
										'{{itemInventory}}' +
									'</div>' +
									'{{itemQuickView}}' +
								'</div>' +
							'</div>',

	//QuickView template
	'quickViewHtml': 	'<form method="post" action="/cart/add" id="product_form_{{itemId}}" accept-charset="UTF-8" class="product-item__action-list {{quickViewClass}} button-stack" enctype="multipart/form-data">' +
							'<input type="hidden" name="form_type" value="product">' +
							'<input type="hidden" name="utf8" value="✓">' +
							'<input type="hidden" name="quantity" value="1">' +
							'<input type="hidden" name="id" value="{{variantId}}">' +
							'{{quickBuy}}' +
							'<button type="button" class="product-item__action-button {{quickViewButtonClass}} button button--small button--ternary hidden-phone" data-action="open-modal" data-secondary-action="open-quick-view" aria-controls="modal-quick-view-'+ bcSfFilterConfig.general.template +'-template" data-product-url="{{itemUrl}}">Quick view</button>' +
						'</form>',

	//QuickBuy Template
	'quickBuyHtml': '<button type="submit" class="product-item__action-button {{quickBuyButtonClass}} button button--small button--primary" data-action="add-to-cart">' + bcSfFilterConfig.label.add_to_cart + '</button>',
	'quickBuyChooseOptionsHtml': '<a type="button" class="product-item__action-button {{quickBuyButtonClass}} button button--small button--primary" href="{{itemUrl}}">' + bcSfFilterConfig.label.choose_options + '</a>',
	'quickBuySoldOutHtml': '<button class="product-item__action-button {{quickBuyButtonClass}} button button--small button--disabled" disabled>' + bcSfFilterConfig.label.sold_out + '</button>',

	// Pagination Template
	'pageItemPreviousHtml': '<a class="pagination__prev link" rel="prev" title="Previous"  href="{{itemUrl}}">' +
								'<svg class="icon icon--arrow-left" viewBox="0 0 8 12" role="presentation">' +
									'<path stroke="currentColor" stroke-width="2" d="M6 10L2 6l4-4" fill="none" stroke-linecap="square"/>' +
								'</svg>' +
								bcSfFilterConfig.label.previous_page +
							'</a>',
	'pageItemNextHtml': '<a class="pagination__next link" rel="next" title="Next" href="{{itemUrl}}">' +
							bcSfFilterConfig.label.next_page +
							'<svg class="icon icon--arrow-right" viewBox="0 0 8 12" role="presentation">' +
								'<path stroke="currentColor" stroke-width="2" d="M2 2l4 4-4 4" fill="none" stroke-linecap="square"/>' +
							'</svg>' +
						'</a>',
	'pageItemHtml': '<a href="{{itemUrl}}" class="pagination__nav-item {{activeClass}}">{{itemTitle}}</a>',
	'paginateHtml': '<div class="pagination__inner">' +
						'{{previous}}' +
						'<div class="pagination__nav">' +
							'{{pageItems}}' +
						'</div>' +
						'{{next}}' +
					'</div>',

	// Sorting Template
	'sortingHtml': 	'<button class="value-picker-button" id="sort-by-toggler" aria-haspopup="true" aria-expanded="false" aria-controls="sort-by-selector" data-action="open-value-picker">' +
                        '<span class="hidden-tablet-and-up"></span>' +
                        '<span class="hidden-phone"></span>' +
                        '<svg class="icon icon--arrow-bottom" viewBox="0 0 12 8" role="presentation">' +
                            '<path stroke="currentColor" stroke-width="2" d="M10 2L6 6 2 2" fill="none" stroke-linecap="square"/>' +
                        '</svg>' +
                    '</button>' +
                    '<div id="sort-by-selector" class="value-picker">' +
                        '<svg class="icon icon--nav-triangle-borderless" viewBox="0 0 20 9" role="presentation">' +
                            '<path d="M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z" fill="#ffffff"/>' +
                        '</svg>' +
                        '<div class="value-picker__inner">' +
                            '<div class="value-picker__choice-list">' +
                                '{{sortingItems}}' +
                            '</div>' +
                        '</div>' +
                    '</div>',

	// Sorting Item Template
	'sortingItemHtml':  '<button class="value-picker__choice-item link {{sortingActiveClass}}" data-action="select-value" data-sort="{{sortingValue}}">' +
                            '{{sortingName}}' +
                            '<svg class="icon icon--check-2" viewBox="0 0 13 11" role="presentation">' +                     
                                '<path d="M1 4.166456L5.317719 9 12 1" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd"/>' +
                            '</svg>' +
                        '</button>',    

	// Show Limit Template
	'showLimitHtml': '<label>' + bcSfFilterConfig.label.show_limit + '</label><select class="bc-sf-filter-filter-dropdown">{{showLimitItems}}</select>',
	// Breadcrumb Template
	'breadcrumbHtml': '<a href="/">' + bcSfFilterConfig.label.breadcrumb_home + '</a> {{breadcrumbDivider}} {{breadcrumbItems}}',
	'breadcrumbDivider': '<span class="divider">/</span>',
	'breadcrumbItemLink': '<a href="{{itemLink}}">{{itemTitle}}</a>',
	'breadcrumbItemSelected': '<span>{{itemTitle}}</span>',
};

/**************** CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM ****************/
function prepareShopifyData(data) {
	// Displaying price base on the policy of Shopify, have to multiple by 100
	soldOut = !data.available; // Check a product is out of stock
	onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
	priceVaries = data.price_min != data.price_max; // Check a product has many prices
	// Convert images to array
	images = data.images_info;
	// Get First Variant (selected_or_first_available_variant)
	if (data.variants && data.variants.length > 0) {
		firstVariant = data.variants[0];
		if (getParam('variant') !== null && getParam('variant') != '') {
			var paramVariant = data.variants.filter(function (e) {
				return e.id == getParam('variant');
			});
			if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
		} else {
			for (var i = 0; i < data.variants.length; i++) {
				if (data.variants[i].available) {
					firstVariant = data.variants[i];
					break;
				}
			}
		}
	}
	return data;
}


/***************************** BUILD PRODUCT LIST ****************************/
// Build Product Grid Item
BCSfFilter.prototype.buildProductGridItem = function (data, index) {
	// Get Template
	var itemHtml = bcSfFilterTemplate.productGridItemHtml;
	// Customize API data to get the Shopify data
	data = prepareShopifyData(data);

	// Add Grid Width class
	itemHtml = itemHtml.replace(/{{gridWidthClass}}/g, buildGridWidthClass(data));

	// Add Label
	itemHtml = itemHtml.replace(/{{itemLabels}}/g, buildLabels(data));

	// Add Image Properties
	var imageWrapperClass = bcSfFilterConfig.custom.show_secondary_image ? 'product-item__image-wrapper--with-secondary' : '';
	itemHtml = itemHtml.replace(/{{imageWrapperClass}}/g, imageWrapperClass);

	var imageAspectRatioClass = 'aspect-ratio--' + bcSfFilterConfig.custom.product_image_size;
	itemHtml = itemHtml.replace(/{{imageAspectRatioClass}}/g, imageAspectRatioClass);

	var imagePadding = 100;
	if (images && images.length > 0 && images[0].width && images[0].height) {
		imagePadding = 100 / (images[0].width / images[0].height);
	}
	itemHtml = itemHtml.replace(/{{imagePadding}}/g, imagePadding);

	// Add Images
	itemHtml = itemHtml.replace(/{{itemImages}}/g, buildImages(data));

	// Add Info 
	var itemInfoHtml = bcSfFilterConfig.custom.product_price_position == 'after_title' ?
		'{{itemVendor}}{{itemTitleWrapper}}{{itemSwatch}}{{itemPrice}}' :
		'{{itemPrice}}{{itemTitleWrapper}}{{itemVendor}}{{itemSwatch}}';

	itemHtml = itemHtml.replace(/{{itemInfo}}/g, itemInfoHtml);

	// Add Vendor
	var itemVendorHtml = bcSfFilterConfig.custom.show_vendor ? ('<a class="product-item__vendor link">' + data.vendor + '</a>') : '';
	itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

	// Add Title 
	var itemTitleWrapperHtml = '<a href="{{itemUrl}}" class="product-item__title text--strong link">{{itemTitle}}</a>';
	itemHtml = itemHtml.replace(/{{itemTitleWrapper}}/g, itemTitleWrapperHtml);

	// Add price
	itemHtml = itemHtml.replace(/{{itemPrice}}/g, buildPrice(data));

	// Add Swatch
	var itemSwatchHtml = bcSfFilterConfig.custom.show_color_swatch ? buildSwatch(data) : '';
	itemHtml = itemHtml.replace(/{{itemSwatch}}/g, itemSwatchHtml);

	// Add Review
	var itemReviewHtml = bcSfFilterConfig.custom.show_reviews_badge ? bcSfFilterTemplate.reviewHtml : '';
	itemHtml = itemHtml.replace(/{{itemReview}}/g, itemReviewHtml);

	// Add Inventory
	itemHtml = itemHtml.replace(/{{itemInventory}}/g, buildInventory(data));

	// Add Quickview
	itemHtml = itemHtml.replace(/{{itemQuickView}}/g, buildQuickView(data));


	// Add main attribute (Always put at the end of this function)
	itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
	itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
	itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
	itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
	itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));
	return itemHtml;
};

/************************ BUILD PRODUCT ITEM ELEMENTS ***********************/
function buildGridWidthClass() {
	var gridWidthClass = '';
	switch (bcSfFilterConfig.custom.products_per_row) {
		case 3:
			gridWidthClass = '1/3--desk';
			break;
		case 4:
			gridWidthClass = '1/4--desk';
			break;
		default:
			gridWidthClass = '1/3--desk';
			break;
	}
	return gridWidthClass;
}

function buildLabels(data) {
	// Build Sale label
	var saleLabelHtml = '';
	if (bcSfFilterConfig.custom.show_discount && onSale) {
		var saveAmount = '';
		if (bcSfFilterConfig.custom.discount_mode === 'saving') {
			saveAmount = bcsffilter.formatMoney(data.compare_at_price_min - data.price_min);
		} else {
			saveAmount = Math.round((data.compare_at_price_min - data.price_min) * 100 / data.compare_at_price_min) + '%';
		}
		saleLabelHtml = bcSfFilterTemplate.saleLabelHtml.replace(/{{savings}}/g, saveAmount);
	}

	//Build tag labels
	var tagLabelHtmls = '';
	if (data.tags && data.tags.length > 0) {
		var tagLabelHtml1 = '';
		var tagLabelHtml2 = '';
		for (var i = 0; i < data.tags.length; i++) {
			var tag = data.tags[i];
			if (tag.indexOf('__label:') !== -1) {
				tagLabelHtml1 += bcSfFilterTemplate.tagLabelHtml.replace(/{{tagLabelClass}}/g, 'product-label--custom1');
				tagLabelHtml1 = tagLabelHtml1.replace(/{{tagLabel}}/g, tag.split('__label:')[1]);
			}

			if (tag.indexOf('__label1:') !== -1) {
				tagLabelHtml1 += bcSfFilterTemplate.tagLabelHtml.replace(/{{tagLabelClass}}/g, 'product-label--custom1');
				tagLabelHtml1 = tagLabelHtml1.replace(/{{tagLabel}}/g, tag.split('__label1:')[1]);
			}

			if (tag.indexOf('__label2:') !== -1) {
				tagLabelHtml2 += bcSfFilterTemplate.tagLabelHtml.replace(/{{tagLabelClass}}/g, 'product-label--custom2');
				tagLabelHtml2 = tagLabelHtml2.replace(/{{tagLabel}}/g, tag.split('__label2:')[1]);
			}
		}
		tagLabelHtmls = tagLabelHtml1 + tagLabelHtml2;
	}

	// Build Labels
	return tagLabelHtmls + saleLabelHtml;
}

function buildImages(data) {
	// Build Main Image
	var firstImageHtml = bcSfFilterTemplate.imageHtml;
	if (images.length > 0) {
		var thumbUrl = bcsffilter.optimizeImage(images[0].src, '60x');
		firstImageHtml = firstImageHtml.replace(/{{imageUrl}}/g, thumbUrl);
		firstImageHtml = firstImageHtml.replace(/{{imageId}}/g, images[0].id);
		firstImageHtml = firstImageHtml.replace(/{{image_url}}/g, bcsffilter.optimizeImage(images[0].src, '{width}x'));
	} else {
		firstImageHtml = firstImageHtml.replace(/{{imageUrl}}/g, bcSfFilterConfig.general.no_image_url);
		firstImageHtml = firstImageHtml.replace(/{{imageId}}/g, '');
		firstImageHtml = firstImageHtml.replace(/{{image_url}}/g, bcsffilter.optimizeImage(bcSfFilterConfig.general.no_image_url, '{width}x'));
	}

	// Build Image Swap
	var secondImageHtml = '';
	if (bcSfFilterConfig.custom.show_secondary_image && images.length > 1) {
		var flipImageUrl = bcsffilter.optimizeImage(images[1].src, '60x');
		secondImageHtml = bcSfFilterTemplate.imageHtml;
		secondImageHtml = secondImageHtml.replace(/{{imageUrl}}/g, flipImageUrl);
		secondImageHtml = secondImageHtml.replace(/{{imageId}}/g, images[1].id);
		secondImageHtml = secondImageHtml.replace(/{{image_url}}/g, bcsffilter.optimizeImage(images[1].src, '{width}x'));
		secondImageHtml = secondImageHtml.replace(/{{imageClass}}/g, 'product-item__secondary-image');
		firstImageHtml = firstImageHtml.replace(/{{imageClass}}/g, 'product-item__primary-image');
	} else {
		firstImageHtml = firstImageHtml.replace(/{{imageClass}}/g, '');
	}

	return firstImageHtml + secondImageHtml;
}

function buildPrice(data) {
	var priceHtml = '<div class="product-item__price-list price-list">';
	if (data.price_min) {
		priceHtml += '<span class="price {{priceClass}}" data-money-convertible="">{{amount}}</span>';

		var priceAmount = priceAmount = bcsffilter.formatMoney(data.price_min);
		if (priceVaries) {
			priceAmount = bcSfFilterConfig.label.from.replace(/{{price_min}}/g, bcsffilter.formatMoney(data.price_min));
		}
		priceHtml = priceHtml.replace(/{{amount}}/g, priceAmount);
		priceHtml = priceHtml.replace(/{{priceClass}}/g, onSale ? 'price--highlight' : '');

		if (onSale) {
			priceHtml += '<span class="price price--compare" data-money-convertible="">' + bcsffilter.formatMoney(data.compare_at_price_min) + '</span>';
		}
	}
	priceHtml += '</div>';
	return priceHtml;
}

function buildSwatch(data) {
	var swatchHtml = '';
	if (bcSfFilterConfig.custom.show_filter_color_swatch) {
		var color_labels = 'color,colour,couleur,colore,farbe,색,色,カラー,färg,farve'.split(',');
		var foundColorOption = false;
		var swatchItems = [];
		data.options_with_values.forEach(function (option, optionIndex) {
			if (foundColorOption) return;

			if (color_labels.indexOf(option.name.toLowerCase()) !== -1) {
				foundColorOption = true;
				option.values.forEach(function (colorValue, colorIndex) {
					var colorName = colorValue.title;

					// Get variant with the color
					var variant = null;
					data.variants.forEach(function (dataVariant) {
						var variantColorName = dataVariant.merged_options[optionIndex].split(':')[1];
						if (variantColorName == colorName) {
							if (!variant) {
								variant = dataVariant;
							} else if (!variant.image && dataVariant.image) {
								variant = dataVariant;
							}
						}
					})

					// Get variant image info
					var variantImageInfo = {
						src: bcSfFilterConfig.general.no_image_url,
						id: 0,
						width: 480,
						height: 480
					};
					if (variant) {
						if (data.images_info.length > 0) variantImageInfo = data.images_info[0];
						data.images_info.forEach(function (image_info) {
							if (image_info.src == variant.image) {
								variantImageInfo = image_info;
							}
						})
					}

					// Build swatch item
					if (variant) {
						var swatchItemHtml = 	'<div class="color-swatch {{whiteColorClass}}">' +
													'<input class="color-swatch__radio" type="radio" {{checked}} aria-hidden="true" ' +
														'name="collection-template-{{itemId}}" ' +
														'id="collection-template-{{itemId}}-{{colorIndex}}" ' +
														'value="{{colorName}}" ' +
														'data-variant-url="{{variantUrl}}" ' +
														'data-image-id="{{variantImageId}}" ' +
														'data-image-url="{{variantImageUrl}}" ' +
														'data-image-widths="[200,300,400,500,600,700]" ' +
														'data-image-aspect-ratio="{{aspectRatio}}">' +
													'<label class="color-swatch__item" ' +
														'for="collection-template-{{itemId}}-{{colorIndex}}" ' +
														'style="background-color: {{colorBackground}}" ' +
														'title="{{colorName}}">' +
													'</label>' +
													'<a href="{{itemUrl}}" class="color-swatch__item-link">+{{colorIndexBackwards}}</a>' +
												'</div>';

						swatchItemHtml = swatchItemHtml.replace(/{{whiteColorClass}}/g, colorName.toLowerCase() == 'white' ? 'color-swatch--white' : '');
						swatchItemHtml = swatchItemHtml.replace(/{{checked}}/g, colorIndex == 0 ? 'checked="checked"' : '');
						swatchItemHtml = swatchItemHtml.replace(/{{colorIndex}}/g, colorIndex);
						swatchItemHtml = swatchItemHtml.replace(/{{colorIndexBackwards}}/g, option.values.length - colorIndex);
						swatchItemHtml = swatchItemHtml.replace(/{{colorName}}/g, colorName);
						swatchItemHtml = swatchItemHtml.replace(/{{colorBackground}}/g, bcsffilter.slugify(colorName).split('-').pop());
						swatchItemHtml = swatchItemHtml.replace(/{{variantUrl}}/g, bcsffilter.buildProductItemUrl(data) + '?variant=' + variant.id);
						swatchItemHtml = swatchItemHtml.replace(/{{variantImageId}}/g, variantImageInfo ? variantImageInfo.id : '');
						swatchItemHtml = swatchItemHtml.replace(/{{variantImageUrl}}/g, variantImageInfo ? variantImageInfo.src : '');
						swatchItemHtml = swatchItemHtml.replace(/{{aspectRatio}}/g, variantImageInfo ? (variantImageInfo.width / variantImageInfo.height) : '');
						swatchItems.push(swatchItemHtml);
					}
				});
			}
		})
		if (swatchItems.length > 0) {
			swatchHtml = 	'<div class="product-item__swatch-list">' +
								'<div class="color-swatch-list">' +
									swatchItems.join(' ') +
								'</div>' +
							'</div>';
		}

	}
	return swatchHtml;
}

function buildInventory(data) {
	var inventoryHtml = '';
	if (bcSfFilterConfig.custom.show_inventory_quantity) {
		inventoryHtml = '<span class="product-item__inventory inventory {{inventoryClass}}">{{inventoryText}}</span>';
		if (soldOut) {
			inventoryHtml = inventoryHtml.replace(/{{inventoryClass}}/g, '');
			inventoryHtml = inventoryHtml.replace(/{{inventoryText}}/g, bcSfFilterConfig.label.sold_out);
		} else if (data.variants && data.variants.length > 0) {
			if (bcSfFilterConfig.custom.low_inventory_threshold > 0) {
				var numberInStock = 0;
				for (var i = 0; i < data.variants.length; i++) {
					numberInStock += data.variants[i].inventory_quantity;
				}
				if (numberInStock > bcSfFilterConfig.custom.low_inventory_threshold) {
					var inventoryText = numberInStock == 1 ? bcSfFilterConfig.label.in_stock_with_quantity_count.one : bcSfFilterConfig.label.in_stock_with_quantity_count.other;
					inventoryText = inventoryText.replace(/{{count}}/g, numberInStock);
					inventoryHtml = inventoryHtml.replace(/{{inventoryClass}}/g, 'inventory--high');
					inventoryHtml = inventoryHtml.replace(/{{inventoryText}}/g, inventoryText);
				} else {
					var inventoryText = numberInStock == 1 ? bcSfFilterConfig.label.low_stock_with_quantity_count.one : bcSfFilterConfig.label.low_stock_with_quantity_count.other;
					inventoryText = inventoryText.replace(/{{count}}/g, numberInStock);
					inventoryHtml = inventoryHtml.replace(/{{inventoryClass}}/g, 'inventory--low');
					inventoryHtml = inventoryHtml.replace(/{{inventoryText}}/g, inventoryText);
				}
			} else {
				inventoryHtml = inventoryHtml.replace(/{{inventoryClass}}/g, 'inventory--high');
				inventoryHtml = inventoryHtml.replace(/{{inventoryText}}/g, bcSfFilterConfig.label.in_stock);
			}
		}
	}
	return inventoryHtml;
}

function buildQuickView(data) {
	var quickViewHtml = '';
	var quickBuyHtml = '';
	if (bcSfFilterConfig.custom.show_quick_view == 'list' ||
		bcSfFilterConfig.custom.show_quick_view == 'list_grid' ||
		bcSfFilterConfig.custom.show_quick_buy == 'list' ||
		bcSfFilterConfig.custom.show_quick_buy == 'list_grid') {

		var quickViewClass = (bcSfFilterConfig.custom.show_quick_buy == 'list' && bcSfFilterConfig.custom.show_quick_view == 'list') ? 'product-item__action-list--list-view-only' : '';
		var quickViewButtonClass = bcSfFilterConfig.custom.show_quick_view == 'list' ? 'product-item__action-button--list-view-only' : '';
		var quickBuyButtonClass = bcSfFilterConfig.custom.show_quick_buy == 'list' ? 'product-item__action-button--list-view-only' : '';

		//Quick buy button
		if (soldOut) {
			quickBuyHtml = bcSfFilterTemplate.quickBuySoldOutHtml;
		} else {
			if (data.variants && data.variants.length > 1) {
				quickBuyHtml = bcSfFilterTemplate.quickBuyChooseOptionsHtml;
			} else {
				quickBuyHtml = bcSfFilterTemplate.quickBuyHtml;
			}
		}
		quickBuyHtml = quickBuyHtml.replace(/{{quickBuyButtonClass}}/g, quickBuyButtonClass);

		//Quick view
		quickViewHtml = bcSfFilterTemplate.quickViewHtml;
		quickViewHtml = quickViewHtml.replace(/{{variantId}}/g, firstVariant.id);
		quickViewHtml = quickViewHtml.replace(/{{quickBuy}}/g, quickBuyHtml);
		quickViewHtml = quickViewHtml.replace(/{{quickViewClass}}/g, quickViewClass);
		quickViewHtml = quickViewHtml.replace(/{{quickViewButtonClass}}/g, quickViewButtonClass);
	}
	return quickViewHtml;
}


/***************************** BUILD TOOLBAR *******************************/
// Build Pagination
BCSfFilter.prototype.buildPagination = function (totalProduct) {
	// Get page info
	var currentPage = parseInt(this.queryParams.page);
	var totalPage = Math.ceil(totalProduct / this.queryParams.limit);
	// If it has only one page, clear Pagination
	if (totalPage == 1) {
		jQ(this.selector.pagination).html('');
		return false;
	}
	if (this.getSettingValue('general.paginationType') == 'default') {
		var paginationHtml = bcSfFilterTemplate.paginateHtml;
		// Build Previous
		var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.pageItemPreviousHtml : '';
		previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
		paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
		// Build Next
		var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.pageItemNextHtml : '';
		nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
		paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
		// Create page items array
		var beforeCurrentPageArr = [];
		for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
			beforeCurrentPageArr.unshift(iBefore);
		}
		if (currentPage - 4 > 0) {
			beforeCurrentPageArr.unshift('...');
		}
		if (currentPage - 4 >= 0) {
			beforeCurrentPageArr.unshift(1);
		}
		beforeCurrentPageArr.push(currentPage);
		var afterCurrentPageArr = [];
		for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
			afterCurrentPageArr.push(iAfter);
		}
		if (currentPage + 3 < totalPage) {
			afterCurrentPageArr.push('...');
		}
		if (currentPage + 3 <= totalPage) {
			afterCurrentPageArr.push(totalPage);
		}
		// Build page items
		var pageItemsHtml = '';
		var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
		for (var iPage = 0; iPage < pageArr.length; iPage++) {
			var activeClass = '';
			var pageLink = '';
			if (pageArr[iPage] == currentPage) {
				activeClass = 'is-active';
			} else if (pageArr[iPage] != '...') {
				activeClass = 'link';
				pageLink = this.buildToolbarLink('page', currentPage, pageArr[iPage]);
			}
			pageItemsHtml += bcSfFilterTemplate.pageItemHtml;
			pageItemsHtml = pageItemsHtml.replace(/{{activeClass}}/g, activeClass);
			pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
			pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, pageLink);
		}
		paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
		jQ(this.selector.pagination).html(paginationHtml);
	}
};

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function () {
	if (bcSfFilterConfig.custom.show_sorting && bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
		jQ(this.selector.topSorting).html('');
		var sortingArr = this.getSortingList();
		if (sortingArr) {
			var paramSort = this.queryParams.sort || '';
			// Build content
			var sortingItemsHtml = ''
			var activeName = '';
			for (var sortingValue in sortingArr) {
				var sortingItemHtml = bcSfFilterTemplate.sortingItemHtml;
				var activeClass = paramSort == sortingValue ? 'is-selected' : '';
				var sortingName = sortingArr[sortingValue];
				if (paramSort == sortingValue) activeName = sortingName;
				sortingItemHtml = sortingItemHtml.replace(/{{sortingName}}/g, sortingName);
				sortingItemHtml = sortingItemHtml.replace(/{{sortingValue}}/g, sortingValue);
				sortingItemHtml = sortingItemHtml.replace(/{{sortingActiveClass}}/g, activeClass);
				sortingItemsHtml += sortingItemHtml;
			}
			var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
			jQ('.bc-sf-filter-custom-sorting').html(html);
			if (jQ('.bc-sf-filter-custom-sorting').hasClass("bc-sf-filter-sort-active")) {
				jQ('.bc-sf-filter-custom-sorting').toggleClass('bc-sf-filter-sort-active');
			}
			var labelSort = '';
			if (paramSort.length > 0 && activeName) {
				labelSort = bcSfFilterConfig.label.sorting + ": " + activeName;
			} else {
				labelSort = bcSfFilterConfig.label.sorting;
			}

			jQ('.bc-sf-filter-custom-sorting button span').text(labelSort);
		}
	}
};

// Build Sorting event
BCSfFilter.prototype.buildSortingEvent = function () {
	var _this = this;
	jQ('.bc-sf-filter-custom-sorting button.value-picker__choice-item').click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		onInteractWithToolbar(e, 'sort', _this.queryParams.sort, jQ(this).data('sort'));
	});
};


/************************ BUILD ADDITIONAL ELEMENTS *************************/
// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function (data, eventType) {
	if (window.SPR) {
		SPR.initDomEls();
		SPR.loadBadges();
	}

	if (bcSfFilterConfig.custom.currency_conversion_enabled) {
		convertAll();
	}
};

// Build additional elements
BCSfFilter.prototype.buildAdditionalElements = function (data, eventType) {

	buildProductCount(data);
	buildSearchBreadcrumbs(data);
	buildDisplayType();
	styleFilterIcon(data);

	jQ('body').find('.bc-sf-filter-skeleton-button').remove();
};

function convertAll(selector) {
	var _this = this;

	var moneyFormats = {
		"USD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} USD"
		},
		"EUR": {
			"money_format": "&euro;{{amount}}",
			"money_with_currency_format": "&euro;{{amount}} EUR"
		},
		"GBP": {
			"money_format": "&pound;{{amount}}",
			"money_with_currency_format": "&pound;{{amount}} GBP"
		},
		"CAD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} CAD"
		},
		"ALL": {
			"money_format": "Lek {{amount}}",
			"money_with_currency_format": "Lek {{amount}} ALL"
		},
		"DZD": {
			"money_format": "DA {{amount}}",
			"money_with_currency_format": "DA {{amount}} DZD"
		},
		"AOA": {
			"money_format": "Kz{{amount}}",
			"money_with_currency_format": "Kz{{amount}} AOA"
		},
		"ARS": {
			"money_format": "${{amount_with_comma_separator}}",
			"money_with_currency_format": "${{amount_with_comma_separator}} ARS"
		},
		"AMD": {
			"money_format": "{{amount}} AMD",
			"money_with_currency_format": "{{amount}} AMD"
		},
		"AWG": {
			"money_format": "Afl{{amount}}",
			"money_with_currency_format": "Afl{{amount}} AWG"
		},
		"AUD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} AUD"
		},
		"BBD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} Bds"
		},
		"AZN": {
			"money_format": "m.{{amount}}",
			"money_with_currency_format": "m.{{amount}} AZN"
		},
		"BDT": {
			"money_format": "Tk {{amount}}",
			"money_with_currency_format": "Tk {{amount}} BDT"
		},
		"BSD": {
			"money_format": "BS${{amount}}",
			"money_with_currency_format": "BS${{amount}} BSD"
		},
		"BHD": {
			"money_format": "{{amount}} BD",
			"money_with_currency_format": "{{amount}} BHD"
		},
		"BYR": {
			"money_format": "Br {{amount}}",
			"money_with_currency_format": "Br {{amount}} BYR"
		},
		"BZD": {
			"money_format": "BZ${{amount}}",
			"money_with_currency_format": "BZ${{amount}} BZD"
		},
		"BTN": {
			"money_format": "Nu {{amount}}",
			"money_with_currency_format": "Nu {{amount}} BTN"
		},
		"BAM": {
			"money_format": "KM {{amount_with_comma_separator}}",
			"money_with_currency_format": "KM {{amount_with_comma_separator}} BAM"
		},
		"BRL": {
			"money_format": "R$ {{amount_with_comma_separator}}",
			"money_with_currency_format": "R$ {{amount_with_comma_separator}} BRL"
		},
		"BOB": {
			"money_format": "Bs{{amount_with_comma_separator}}",
			"money_with_currency_format": "Bs{{amount_with_comma_separator}} BOB"
		},
		"BWP": {
			"money_format": "P{{amount}}",
			"money_with_currency_format": "P{{amount}} BWP"
		},
		"BND": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} BND"
		},
		"BGN": {
			"money_format": "{{amount}} Ð»Ð²",
			"money_with_currency_format": "{{amount}} Ð»Ð² BGN"
		},
		"MMK": {
			"money_format": "K{{amount}}",
			"money_with_currency_format": "K{{amount}} MMK"
		},
		"KHR": {
			"money_format": "KHR{{amount}}",
			"money_with_currency_format": "KHR{{amount}}"
		},
		"KYD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} KYD"
		},
		"XAF": {
			"money_format": "FCFA{{amount}}",
			"money_with_currency_format": "FCFA{{amount}} XAF"
		},
		"CLP": {
			"money_format": "${{amount_no_decimals}}",
			"money_with_currency_format": "${{amount_no_decimals}} CLP"
		},
		"CNY": {
			"money_format": "&#165;{{amount}}",
			"money_with_currency_format": "&#165;{{amount}} CNY"
		},
		"COP": {
			"money_format": "${{amount_with_comma_separator}}",
			"money_with_currency_format": "${{amount_with_comma_separator}} COP"
		},
		"CRC": {
			"money_format": "&#8353; {{amount_with_comma_separator}}",
			"money_with_currency_format": "&#8353; {{amount_with_comma_separator}} CRC"
		},
		"HRK": {
			"money_format": "{{amount_with_comma_separator}} kn",
			"money_with_currency_format": "{{amount_with_comma_separator}} kn HRK"
		},
		"CZK": {
			"money_format": "{{amount_with_comma_separator}} K&#269;",
			"money_with_currency_format": "{{amount_with_comma_separator}} K&#269;"
		},
		"DKK": {
			"money_format": "{{amount_with_comma_separator}}",
			"money_with_currency_format": "kr.{{amount_with_comma_separator}}"
		},
		"DOP": {
			"money_format": "RD$ {{amount}}",
			"money_with_currency_format": "RD$ {{amount}}"
		},
		"XCD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "EC${{amount}}"
		},
		"EGP": {
			"money_format": "LE {{amount}}",
			"money_with_currency_format": "LE {{amount}} EGP"
		},
		"ETB": {
			"money_format": "Br{{amount}}",
			"money_with_currency_format": "Br{{amount}} ETB"
		},
		"XPF": {
			"money_format": "{{amount_no_decimals_with_comma_separator}} XPF",
			"money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} XPF"
		},
		"FJD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "FJ${{amount}}"
		},
		"GMD": {
			"money_format": "D {{amount}}",
			"money_with_currency_format": "D {{amount}} GMD"
		},
		"GHS": {
			"money_format": "GH&#8373;{{amount}}",
			"money_with_currency_format": "GH&#8373;{{amount}}"
		},
		"GTQ": {
			"money_format": "Q{{amount}}",
			"money_with_currency_format": "{{amount}} GTQ"
		},
		"GYD": {
			"money_format": "G${{amount}}",
			"money_with_currency_format": "${{amount}} GYD"
		},
		"GEL": {
			"money_format": "{{amount}} GEL",
			"money_with_currency_format": "{{amount}} GEL"
		},
		"HNL": {
			"money_format": "L {{amount}}",
			"money_with_currency_format": "L {{amount}} HNL"
		},
		"HKD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "HK${{amount}}"
		},
		"HUF": {
			"money_format": "{{amount_no_decimals_with_comma_separator}}",
			"money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} Ft"
		},
		"ISK": {
			"money_format": "{{amount_no_decimals}} kr",
			"money_with_currency_format": "{{amount_no_decimals}} kr ISK"
		},
		"INR": {
			"money_format": "Rs. {{amount}}",
			"money_with_currency_format": "Rs. {{amount}}"
		},
		"IDR": {
			"money_format": "{{amount_with_comma_separator}}",
			"money_with_currency_format": "Rp {{amount_with_comma_separator}}"
		},
		"ILS": {
			"money_format": "{{amount}} NIS",
			"money_with_currency_format": "{{amount}} NIS"
		},
		"JMD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} JMD"
		},
		"JPY": {
			"money_format": "&#165;{{amount_no_decimals}}",
			"money_with_currency_format": "&#165;{{amount_no_decimals}} JPY"
		},
		"JEP": {
			"money_format": "&pound;{{amount}}",
			"money_with_currency_format": "&pound;{{amount}} JEP"
		},
		"JOD": {
			"money_format": "{{amount}} JD",
			"money_with_currency_format": "{{amount}} JOD"
		},
		"KZT": {
			"money_format": "{{amount}} KZT",
			"money_with_currency_format": "{{amount}} KZT"
		},
		"KES": {
			"money_format": "KSh{{amount}}",
			"money_with_currency_format": "KSh{{amount}}"
		},
		"KWD": {
			"money_format": "{{amount}} KD",
			"money_with_currency_format": "{{amount}} KWD"
		},
		"KGS": {
			"money_format": "Ð»Ð²{{amount}}",
			"money_with_currency_format": "Ð»Ð²{{amount}}"
		},
		"LVL": {
			"money_format": "Ls {{amount}}",
			"money_with_currency_format": "Ls {{amount}} LVL"
		},
		"LBP": {
			"money_format": "L&pound;{{amount}}",
			"money_with_currency_format": "L&pound;{{amount}} LBP"
		},
		"LTL": {
			"money_format": "{{amount}} Lt",
			"money_with_currency_format": "{{amount}} Lt"
		},
		"MGA": {
			"money_format": "Ar {{amount}}",
			"money_with_currency_format": "Ar {{amount}} MGA"
		},
		"MKD": {
			"money_format": "Ð´ÐµÐ½ {{amount}}",
			"money_with_currency_format": "Ð´ÐµÐ½ {{amount}} MKD"
		},
		"MOP": {
			"money_format": "MOP${{amount}}",
			"money_with_currency_format": "MOP${{amount}}"
		},
		"MVR": {
			"money_format": "Rf{{amount}}",
			"money_with_currency_format": "Rf{{amount}} MRf"
		},
		"MXN": {
			"money_format": "$ {{amount}}",
			"money_with_currency_format": "$ {{amount}} MXN"
		},
		"MYR": {
			"money_format": "RM{{amount}} MYR",
			"money_with_currency_format": "RM{{amount}} MYR"
		},
		"MUR": {
			"money_format": "Rs {{amount}}",
			"money_with_currency_format": "Rs {{amount}} MUR"
		},
		"MDL": {
			"money_format": "{{amount}} MDL",
			"money_with_currency_format": "{{amount}} MDL"
		},
		"MAD": {
			"money_format": "{{amount}} dh",
			"money_with_currency_format": "Dh {{amount}} MAD"
		},
		"MNT": {
			"money_format": "{{amount_no_decimals}} &#8366",
			"money_with_currency_format": "{{amount_no_decimals}} MNT"
		},
		"MZN": {
			"money_format": "{{amount}} Mt",
			"money_with_currency_format": "Mt {{amount}} MZN"
		},
		"NAD": {
			"money_format": "N${{amount}}",
			"money_with_currency_format": "N${{amount}} NAD"
		},
		"NPR": {
			"money_format": "Rs{{amount}}",
			"money_with_currency_format": "Rs{{amount}} NPR"
		},
		"ANG": {
			"money_format": "&fnof;{{amount}}",
			"money_with_currency_format": "{{amount}} NA&fnof;"
		},
		"NZD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} NZD"
		},
		"NIO": {
			"money_format": "C${{amount}}",
			"money_with_currency_format": "C${{amount}} NIO"
		},
		"NGN": {
			"money_format": "&#8358;{{amount}}",
			"money_with_currency_format": "&#8358;{{amount}} NGN"
		},
		"NOK": {
			"money_format": "kr {{amount_with_comma_separator}}",
			"money_with_currency_format": "kr {{amount_with_comma_separator}} NOK"
		},
		"OMR": {
			"money_format": "{{amount_with_comma_separator}} OMR",
			"money_with_currency_format": "{{amount_with_comma_separator}} OMR"
		},
		"PKR": {
			"money_format": "Rs.{{amount}}",
			"money_with_currency_format": "Rs.{{amount}} PKR"
		},
		"PGK": {
			"money_format": "K {{amount}}",
			"money_with_currency_format": "K {{amount}} PGK"
		},
		"PYG": {
			"money_format": "Gs. {{amount_no_decimals_with_comma_separator}}",
			"money_with_currency_format": "Gs. {{amount_no_decimals_with_comma_separator}} PYG"
		},
		"PEN": {
			"money_format": "S/. {{amount}}",
			"money_with_currency_format": "S/. {{amount}} PEN"
		},
		"PHP": {
			"money_format": "&#8369;{{amount}}",
			"money_with_currency_format": "&#8369;{{amount}} PHP"
		},
		"PLN": {
			"money_format": "{{amount_with_comma_separator}} zl",
			"money_with_currency_format": "{{amount_with_comma_separator}} zl PLN"
		},
		"QAR": {
			"money_format": "QAR {{amount_with_comma_separator}}",
			"money_with_currency_format": "QAR {{amount_with_comma_separator}}"
		},
		"RON": {
			"money_format": "{{amount_with_comma_separator}} lei",
			"money_with_currency_format": "{{amount_with_comma_separator}} lei RON"
		},
		"RUB": {
			"money_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}}",
			"money_with_currency_format": "&#1088;&#1091;&#1073;{{amount_with_comma_separator}} RUB"
		},
		"RWF": {
			"money_format": "{{amount_no_decimals}} RF",
			"money_with_currency_format": "{{amount_no_decimals}} RWF"
		},
		"WST": {
			"money_format": "WS$ {{amount}}",
			"money_with_currency_format": "WS$ {{amount}} WST"
		},
		"SAR": {
			"money_format": "{{amount}} SR",
			"money_with_currency_format": "{{amount}} SAR"
		},
		"STD": {
			"money_format": "Db {{amount}}",
			"money_with_currency_format": "Db {{amount}} STD"
		},
		"RSD": {
			"money_format": "{{amount}} RSD",
			"money_with_currency_format": "{{amount}} RSD"
		},
		"SCR": {
			"money_format": "Rs {{amount}}",
			"money_with_currency_format": "Rs {{amount}} SCR"
		},
		"SGD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} SGD"
		},
		"SYP": {
			"money_format": "S&pound;{{amount}}",
			"money_with_currency_format": "S&pound;{{amount}} SYP"
		},
		"ZAR": {
			"money_format": "R {{amount}}",
			"money_with_currency_format": "R {{amount}} ZAR"
		},
		"KRW": {
			"money_format": "&#8361;{{amount_no_decimals}}",
			"money_with_currency_format": "&#8361;{{amount_no_decimals}} KRW"
		},
		"LKR": {
			"money_format": "Rs {{amount}}",
			"money_with_currency_format": "Rs {{amount}} LKR"
		},
		"SEK": {
			"money_format": "{{amount_no_decimals}} kr",
			"money_with_currency_format": "{{amount_no_decimals}} kr SEK"
		},
		"CHF": {
			"money_format": "{{amount}} CHF",
			"money_with_currency_format": "{{amount}} CHF"
		},
		"TWD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} TWD"
		},
		"THB": {
			"money_format": "{{amount}} &#xe3f;",
			"money_with_currency_format": "{{amount}} &#xe3f; THB"
		},
		"TZS": {
			"money_format": "{{amount}} TZS",
			"money_with_currency_format": "{{amount}} TZS"
		},
		"TTD": {
			"money_format": "${{amount}}",
			"money_with_currency_format": "${{amount}} TTD"
		},
		"TND": {
			"money_format": "{{amount}}",
			"money_with_currency_format": "{{amount}} DT"
		},
		"TRY": {
			"money_format": "{{amount}}TL",
			"money_with_currency_format": "{{amount}}TL"
		},
		"UGX": {
			"money_format": "Ush {{amount_no_decimals}}",
			"money_with_currency_format": "Ush {{amount_no_decimals}} UGX"
		},
		"UAH": {
			"money_format": "₴{{amount}}",
			"money_with_currency_format": "{{amount}} UAH"
		},
		"AED": {
			"money_format": "Dhs. {{amount}}",
			"money_with_currency_format": "Dhs. {{amount}} AED"
		},
		"UYU": {
			"money_format": "${{amount_with_comma_separator}}",
			"money_with_currency_format": "${{amount_with_comma_separator}} UYU"
		},
		"VUV": {
			"money_format": "{{amount}} VT",
			"money_with_currency_format": "{{amount}} VT"
		},
		"VEF": {
			"money_format": "Bs. {{amount_with_comma_separator}}",
			"money_with_currency_format": "Bs. {{amount_with_comma_separator}} VEF"
		},
		"VND": {
			"money_format": "{{amount_no_decimals_with_comma_separator}}&#8363;",
			"money_with_currency_format": "{{amount_no_decimals_with_comma_separator}} VND"
		},
		"XBT": {
			"money_format": "{{amount_no_decimals}} BTC",
			"money_with_currency_format": "{{amount_no_decimals}} BTC"
		},
		"XOF": {
			"money_format": "CFA{{amount}}",
			"money_with_currency_format": "CFA{{amount}} XOF"
		},
		"ZMW": {
			"money_format": "K{{amount_no_decimals_with_comma_separator}}",
			"money_with_currency_format": "ZMW{{amount_no_decimals_with_comma_separator}}"
		}
	};

	var baseCurrency = window.theme.shopCurrency,
		newCurrency = document.querySelector('.currency-selector').value;

	(selector || document).querySelectorAll('[data-money-convertible]').forEach(function (item) {
		if (!item.hasAttribute('data-currency-' + baseCurrency)) {
			item.setAttribute('data-currency-' + baseCurrency, item.innerHTML);
		}

		// If the amount has already been converted, we leave it alone.
		if (item.getAttribute('data-currency') === newCurrency) {
			return;
		}

		var baseAmount = item.getAttribute('data-currency-' + baseCurrency);

		// If we are converting to a currency that we have saved, we will use the saved amount.
		if (item.hasAttribute('data-currency-' + newCurrency)) {
			item.innerHTML = item.getAttribute('data-currency-' + newCurrency);
		} else {
			var newFormat = moneyFormats[newCurrency][window.theme.currencyConversionMoneyFormat] || '{{amount}}';

			// We have to normalize by replacing dot by comma and comma by dot
			if (window.theme.moneyFormat.indexOf('with_comma_separator') !== -1) {
				baseAmount = baseAmount.replace(/[,.]/g, function (match) {
					// If `,` is matched return `.`, if `.` matched return `,`
					return match === ',' ? '.' : ',';
				});
			}

			// Converting to Y for the first time? Let's get to it!
			var cents = window.Currency.convert(parseFloat(baseAmount.replace(/^[^0-9]+|[^0-9.]/g, '', ''), 10) * 100, baseCurrency, newCurrency);

			if (window.theme.currencyConversionRoundAmounts) {
				cents = Math.round(cents / 100) * 100;
			}
			var newFormattedAmount = bcsffilter.formatMoney(cents, newFormat);

			item.innerHTML = newFormattedAmount;
			item.setAttribute('data-currency-' + newCurrency, newFormattedAmount);
		}

		// We record the new currency locally.
		item.setAttribute('data-currency', newCurrency);
	});

	localStorage.setItem('currency', newCurrency);
}

function buildProductCount(data) {
	var fromProduct = (bcsffilter.queryParams.page - 1) * bcSfFilterConfig.custom.products_per_page + 1;
	var toProduct = Math.min(fromProduct + bcSfFilterConfig.custom.products_per_page - 1, data.total_product);
	var totalProduct = bcSfFilterConfig.label.showing_count.other;
	if (data.total_product == 1) {
		totalProduct = bcSfFilterConfig.label.showing_count.one;
	} else if (data.total_product == 0) {
		totalProduct = bcSfFilterConfig.label.showing_count.zero;
	}
	totalProduct = totalProduct.replace(/{{offset}}/g, fromProduct);
	totalProduct = totalProduct.replace(/{{page_size}}/g, toProduct);
	totalProduct = totalProduct.replace(/{{count}}/g, data.total_product);
	jQ('.bc-sf-filter-total-product').each(function () {
		jQ(this).html(totalProduct);
	})
}

function buildSearchBreadcrumbs(data) {
	if (bcsffilter.queryParams.q) {
		var breadcrumbsText = bcSfFilterConfig.label.search_title_with_terms.replace(/{{terms}}/g, bcsffilter.queryParams.q);
		jQ('.bc-sf-breadcrumbs').each(function () {
			jQ(this).html(breadcrumbsText);
		})
	}
}

function buildDisplayType() {
	var selectedLayout = jQ('.is-selected[data-action="change-layout"]');
	if (selectedLayout.length > 0) {
		selectedLayout.removeClass('is-selected');
		selectedLayout.click();
	} else {
		jQ('[data-action="change-layout"]:first').click();
	}
}

function styleFilterIcon(data) {
	var queryParams = Object.keys(bcsffilter.queryParams);
	var prefix = bcsffilter.queryParams['_'];
	var isFiltered = false;
	for (var i = 0; i < queryParams.length; i++) {
		var queryParam = queryParams[i];
		if (queryParam.startsWith(prefix)) {
			isFiltered = true;
			break;
		}
	}
	if (isFiltered) {
		jQ('.collection__filter-icon').addClass('collection__filter-icon--active');
	} else {
		jQ('.collection__filter-icon').removeClass('collection__filter-icon--active');
	}
}

// Build Default layout
function buildDefaultLink(a,b){var c=window.location.href.split("?")[0];return c+="?"+a+"="+b} BCSfFilter.prototype.buildDefaultElements = function(a) { var self = this; if (jQ(self.getSelector('bottomPagination')).length > 0) { jQ(self.getSelector('bottomPagination')).show(); } if (jQ(self.getSelector('topSorting')).length > 0) { jQ(self.getSelector('topSorting')).hide(); } jQ(self.getSelector('products')).attr('data-bc-sort', ''); if (typeof self.removePlaceholderForFilterTree == 'function') { self.removePlaceholderForFilterTree(); } };

BCSfFilter.prototype.prepareProductData = function(data) { var countData = data.length; for (var k = 0; k < countData; k++) { data[k]['images'] = data[k]['images_info']; if (data[k]['images'].length > 0) { data[k]['featured_image'] = data[k]['images'][0] } else { data[k]['featured_image'] = { src: bcSfFilterConfig.general.no_image_url, width: '', height: '', aspect_ratio: 0 } } data[k]['url'] = '/products/' + data[k].handle; var optionsArr = []; var countOptionsWithValues = data[k]['options_with_values'].length; for (var i = 0; i < countOptionsWithValues; i++) { optionsArr.push(data[k]['options_with_values'][i]['name']) } data[k]['options'] = optionsArr; if (typeof bcSfFilterConfig.general.currencies != 'undefined' && bcSfFilterConfig.general.currencies.length > 1) { var currentCurrency = bcSfFilterConfig.general.current_currency.toLowerCase().trim(); function updateMultiCurrencyPrice(oldPrice, newPrice) { if (typeof newPrice != 'undefined') { return newPrice; } return oldPrice; } data[k].price_min = updateMultiCurrencyPrice(data[k].price_min, data[k]['price_min_' + currentCurrency]); data[k].price_max = updateMultiCurrencyPrice(data[k].price_max, data[k]['price_max_' + currentCurrency]); data[k].compare_at_price_min = updateMultiCurrencyPrice(data[k].compare_at_price_min, data[k]['compare_at_price_min_' + currentCurrency]); data[k].compare_at_price_max = updateMultiCurrencyPrice(data[k].compare_at_price_max, data[k]['compare_at_price_max_' + currentCurrency]); } data[k]['price_min'] *= 100, data[k]['price_max'] *= 100, data[k]['compare_at_price_min'] *= 100, data[k]['compare_at_price_max'] *= 100; data[k]['price'] = data[k]['price_min']; data[k]['compare_at_price'] = data[k]['compare_at_price_min']; data[k]['price_varies'] = data[k]['price_min'] != data[k]['price_max']; var firstVariant = data[k]['variants'][0]; if (getParam('variant') !== null && getParam('variant') != '') { var paramVariant = data[k]['variants'].filter(function(e) { return e.id == getParam('variant') }); if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0] } else { var countVariants = data[k]['variants'].length; for (var i = 0; i < countVariants; i++) { if (data[k]['variants'][i].available) { firstVariant = data[k]['variants'][i]; break } } } data[k]['selected_or_first_available_variant'] = firstVariant; var countVariants = data[k]['variants'].length; for (var i = 0; i < countVariants; i++) { var variantOptionArr = []; var count = 1; var variant = data[k]['variants'][i]; var variantOptions = variant['merged_options']; if (Array.isArray(variantOptions)) { var countVariantOptions = variantOptions.length; for (var j = 0; j < countVariantOptions; j++) { var temp = variantOptions[j].split(':'); data[k]['variants'][i]['option' + (parseInt(j) + 1)] = temp[1]; data[k]['variants'][i]['option_' + temp[0]] = temp[1]; variantOptionArr.push(temp[1]) } data[k]['variants'][i]['options'] = variantOptionArr } data[k]['variants'][i]['compare_at_price'] = parseFloat(data[k]['variants'][i]['compare_at_price']) * 100; data[k]['variants'][i]['price'] = parseFloat(data[k]['variants'][i]['price']) * 100 } data[k]['description'] = data[k]['content'] = data[k]['body_html']; if(data[k].hasOwnProperty('original_tags') && data[k]['original_tags'].length > 0){ data[k].tags = data[k]['original_tags'].slice(0); }} return data };