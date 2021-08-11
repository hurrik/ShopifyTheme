(function(algolia, instantsearch) {
  var collectionPage =
    Boolean(algolia.is_collection_results_page) &&
    Boolean(algolia.config.instant_search_enabled_on_collection);

  if (
    (!algolia.full_results && !collectionPage) ||
    !algolia.config.instant_search_enabled
  ) {
    return;
  }

  var _ = algolia._;
  var $ = algolia.jQuery;

  var collectionFacetFilter = null;
  var collectionRulesContextValue = null;
  if (collectionPage) {
    var matches = window.location.pathname.match(/\/collections\/([^/]+)/i);
    var handle = Boolean(matches) && matches.length === 2 ? matches[1] : null;

    if (algolia.config.collection_id_indexing) {
      collectionFacetFilter = algolia.current_collection_id
        ? 'collection_ids:"' + algolia.current_collection_id + '"'
        : null;
    } else {
      collectionFacetFilter = 'collections:"' + handle + '"';
    }

    collectionRulesContextValue = algolia.config.collection_id_query_rules
      ? algolia.current_collection_id
      : handle;
  }

  var results_selector = collectionPage
    ? algolia.config.collection_css_selector
    : algolia.config.results_selector;

  var activeSortOrders =
    collectionPage && algolia.collectionSortOrders
      ? algolia.collectionSortOrders
      : algolia.sortOrders;

  results_selector += ', .algolia-shopify-instantsearch';

  var $hiding = $(
    '<style>' + results_selector + ' { visibility: hidden }</style>'
  );
  $hiding.appendTo($('head'));

  var instant = {
    colors: algolia.config.colors,
    distinct: Boolean(algolia.config.show_products),
    facets: {
      hidden:
        collectionPage && algolia.collectionHiddenFacets
          ? algolia.collectionHiddenFacets
          : algolia.hiddenFacets,
      shown:
        collectionPage && algolia.collectionShownFacets
          ? algolia.collectionShownFacets
          : algolia.shownFacets,
      list:
        collectionPage && algolia.collectionFacets
          ? algolia.collectionFacets
          : algolia.facets,
      widgets:
        collectionPage && algolia.collectionFacetsWidgets
          ? algolia.collectionFacetsWidgets
          : algolia.facetsWidgets,
    },
    hitsPerPage:
      collectionPage && algolia.config.collections_full_results_hits_per_page
        ? algolia.config.collections_full_results_hits_per_page
        : algolia.config.products_full_results_hits_per_page,
    poweredBy: algolia.config.powered_by,
    search: instantsearch({
      appId: algolia.config.app_id,
      apiKey: algolia.config.search_api_key,
      indexName: '' + algolia.config.index_prefix + 'products',
      searchParameters: {
        clickAnalytics: true,
        filters: "meta.BCS.BCS_nosearch:N"
      },
      urlSync: {},
      searchFunction: function(searchFunctionHelper) {
        // Set query parameters here because they're not kept when someone
        // presses the Back button if set in the `init` function of a custom widget
        var helper = instant.search.helper;
        var page = helper.getPage();
        helper.setQueryParameter(
          'highlightPreTag',
          '<span class="ais-highlight">'
        );
        helper.setQueryParameter('highlightPostTag', '</span>');
        if (instant.distinct) {
          helper.setQueryParameter('distinct', true);
        }
        
        // 1/22/2020 - Tim - set to filter out metafield based items that should now appear in search
     // helper.setQueryParameter('filters', 'meta.BCS.BCS_nosearch:N');
        
        // Collection page features
        if (collectionPage) {
          // Collection page filtering
          if (collectionFacetFilter) {
           //  helper.setQueryParameter('filters', collectionFacetFilter); 
            helper.setQueryParameter('filters', `${collectionFacetFilter} AND meta.BCS.BCS_nosearch:N`);
          //  helper.setQueryParameter('filters', 'meta.BCS.BCS_nosearch:N');
          }

          // Collection page merchandising:
          // send rulesContext for promoted results only if no filters active
          var currentState = helper.getState();
          if (
            _.keys(currentState.facetsRefinements).length === 0 &&
            _.keys(currentState.numericRefinements).length === 0 &&
            _.keys(currentState.disjunctiveFacetsRefinements).length === 0 &&
            Number(page) === 0
          ) {
            // If we are on a collection page, `collectionRulesContextValue` is defined
            if (collectionRulesContextValue) {
              helper.setQueryParameter('ruleContexts', [
                collectionRulesContextValue.toString(),
              ]);
            }
          } else {
            helper.setQueryParameter('ruleContexts', []);
          }
        }

        helper.setPage(page);
        searchFunctionHelper.search();
      },
    }),
    selector: results_selector + ', .algolia-shopify-instantsearch',
    sortOrders: activeSortOrders,
    storeName: algolia.storeName,
    templates: {
      currentItem: algolia.getTemplate(
        'instant_search_current_refined_values_item'
      ),
      empty: algolia.getTemplate('instant_search_no_result'),
      page: algolia.compileTemplate('instant_search'),
      product: algolia.getTemplate('instant_search_product'),
      stats: algolia.getTemplate('instant_search_stats'),
      style: algolia.compileTemplate('instant_search.css'),
    },
  };

  algolia.instantsearch = instant;

  if (instant.poweredBy) {
    // eslint-disable-next-line no-console
    console.log('Algolia: Instant-Search');
  }

  function readjust() {
    var width = instant.$results.outerWidth();

    var suffix = 'lg';
    if (width < 400) suffix = 'xs';
    else if (width < 800) suffix = 'sm';
    else if (width < 1200) suffix = 'md';

    instant.$results
      .removeClass('ais-results-size-xs')
      .removeClass('ais-results-size-sm')
      .removeClass('ais-results-size-md')
      .removeClass('ais-results-size-lg')
      .addClass('ais-results-size-' + suffix);
  }

  // Bind helpers
  _.forEach(
    Object.assign({}, algolia.helpers, algolia.translation_helpers),
    function(helper, name) {
      instant.search.templatesConfig.helpers[name] = helper;
    }
  );
  instant.search.templatesConfig.compileOptions = algolia.hoganOptions;

  algolia.appendStyle(
    algolia.render(instant.templates.style, {
      distinct: instant.distinct,
      colors: instant.colors,
    })
  );

  $(document).ready(function() {
    if (
      collectionPage &&
      $(algolia.config.collection_css_selector).length === 0
    ) {
      throw new Error(
        'Instant search CSS selector for collection page is incorrect\nFore more info see : https://www.algolia.com/doc/integration/shopify/building-search-ui/instant-search/#css-selector'
      );
    } else if ($(algolia.config.results_selector).length === 0) {
      throw new Error(
        'Instant search CSS selector is incorrect\nFore more info see : https://www.algolia.com/doc/integration/shopify/building-search-ui/instant-search/#css-selector'
      );
    }

    instant.$results = $(instant.selector);

    instant.$results.html(
      algolia.render(instant.templates.page, {
        facets: instant.facets.list,
        storeName: instant.storeName,
        translations: algolia.translations,
        multipleSortOrders: activeSortOrders.length > 1,
      })
    );

    readjust();

    $(window).resize(function() {
      readjust();
    });

    // Mobile facets display
    instant.search.addWidget({
      init: function() {
        var $button = $('.ais-facets-button');
        $button.on('click', function() {
          var $facets = $('.ais-facets');

          if ($facets.hasClass('ais-facets__shown')) {
            $button.text('Show filters');
            $facets.removeClass('ais-facets__shown');
          } else {
            $button.text('Hide filters');
            $facets.addClass('ais-facets__shown');
          }
        });
      },
    });

    // Search input
    instant.search.addWidget(
      instantsearch.widgets.searchBox({
        container: '.ais-search-box-container',
        placeholder: algolia.translations.searchForProduct,
        poweredBy: false,
      })
    );

    // Logo & clear
    instant.search.addWidget({
      init: function(opts) {
        if (!instant.poweredBy) {
          $('.ais-algolia-icon').hide();
        }
        $('.ais-clear-input-icon').on('click', function() {
          opts.helper.setQuery('').search();
          $('.ais-search-box--input')
            .val('')
            .focus();
        });
      },
      render: function(opts) {
        if (!opts.state.query) {
          if (instant.poweredBy) {
            $('.ais-algolia-icon').show();
          }
          $('.ais-clear-input-icon').hide();
        } else {
          $('.ais-clear-input-icon').show();
          $('.ais-algolia-icon').hide();
        }
      },
    });

    // Stats
    instant.search.addWidget(
      instantsearch.widgets.stats({
        container: '.ais-stats-container',
        templates: {
          body: instant.templates.stats,
        },
        transformData: {
          body: function(data) {
            return Object.assign({}, data, {
              processingTimeS: data.processingTimeMS / 1000,
              start: data.page * data.hitsPerPage + 1,
              end: Math.min((data.page + 1) * data.hitsPerPage, data.nbHits),
              translations: algolia.translations,
            });
          },
        },
      })
    );

    // Sort orders
    if (activeSortOrders.length > 1) {
      instant.search.addWidget(
        instantsearch.widgets.sortBySelector({
          container: '.ais-sort-orders-container',
          indices: instant.sortOrders,
        })
      );
    }

    // Change display
    instant.search.addWidget({
      init: function() {
        $('.ais-search-header').on(
          'click',
          '.ais-change-display-block',
          function() {
            $(
              '.ais-change-display-block:not(.ais-change-display-selected)'
            ).addClass('ais-change-display-selected');
            $(
              '.ais-change-display-list.ais-change-display-selected'
            ).removeClass('ais-change-display-selected');
            $('.ais-results-as-list')
              .removeClass('ais-results-as-list')
              .addClass('ais-results-as-block');
          }
        );
        $('.ais-search-header').on(
          'click',
          '.ais-change-display-list',
          function() {
            $(
              '.ais-change-display-list:not(.ais-change-display-selected)'
            ).addClass('ais-change-display-selected');
            $(
              '.ais-change-display-block.ais-change-display-selected'
            ).removeClass('ais-change-display-selected');
            $('.ais-results-as-block')
              .removeClass('ais-results-as-block')
              .addClass('ais-results-as-list');
          }
        );
      },
    });

    // Hidden facets
    var list = _.map(instant.facets.hidden, function(facet) {
      return facet.name;
    });
    instant.search.addWidget({
      getConfiguration: function() {
        return {
          facets: list,
          disjunctiveFacets: list,
        };
      },
      init: function() {},
    });

    // Current refined values
    var attributes = _.map(instant.facets.shown, function(facet) {
      return {
        name: facet.name,
        label: facet.title,
      };
    });
    instant.search.addWidget(
      instantsearch.widgets.currentRefinedValues({
        container: '.ais-current-refined-values-container',
        cssClasses: {
          root: 'ais-facet',
          header: 'ais-facet--header',
          body: 'ais-facet--body',
        },
        templates: {
          header: algolia.translations.selectedFilter,
          item: instant.templates.currentItem,
          clearAll: algolia.translations.clearAll,
        },
        onlyListedAttributes: true,
        attributes: attributes,
      })
    );

    // Facets
    _.forEach(instant.facets.widgets, function(widget) {
      instant.search.addWidget(
        instantsearch.widgets[widget.name](widget.params)
      );
    });

    // Hits
    instant.search.addWidget(
      instantsearch.widgets.hits({
        container: '.ais-hits-container',
        hitsPerPage: instant.hitsPerPage,
        templates: {
          empty: instant.templates.empty,
          item: instant.templates.product,
        },
        transformData: {
          item: function(product) {
            return Object.assign({}, product, {
              _distinct: instant.distinct,
              can_order:
                product.inventory_management !== 'shopify' ||
                product.inventory_policy === 'continue' ||
                product.inventory_quantity > 0,
              translations: algolia.translations,
              queryID: instant.search.helper.lastResults._rawResults[0].queryID,
              productPosition: product.__hitIndex + 1,
            });
          },
          empty: function(params) {
            return Object.assign({}, params, {
              translations: algolia.translations,
            });
          },
        },
      })
    );

    // Redirect to product on click
    instant.search.addWidget({
      init: function() {
        $('.ais-hits-container').on('click', '.ais-hit', function(e) {
          var $this = $(this);
          var dataHandle = $this.attr('data-handle');
          var variant_id = $this.attr('data-variant-id');
          var distinct = $this.attr('data-distinct');

          var link = '/products/' + dataHandle;
          if (distinct !== 'true') {
            link += '?variant=' + variant_id;
          }
          if (algolia.config.analytics_enabled) {
            algolia.clickTracker(e);
          }
          window.location.href = link;
        });
        $('.ais-hits-container').on('click', '.ais-hit a', function(e) {
          e.stopPropagation();
          if (algolia.config.analytics_enabled) {
            algolia.clickTracker(e);
          }
        });
      },
    });

    // Add to cart
    instant.search.addWidget({
      init: function() {
        $('.ais-hits-container').on('click', '.ais-hit--cart-button', function(
          e
        ) {
          e.stopPropagation();
          var $this = $(this);
          var formId = $this.attr('data-form-id');

          if (formId) {
            document.getElementById(formId).submit();
          }
        });
      },
    });

    // No result actions
    instant.search.addWidget({
      init: function(opts) {
        $('.ais-hits-container').on(
          'click',
          '.ais-hit-empty--clear-filters',
          function() {
            var helper = opts.helper;
            helper.clearTags();
            _.forEach(instant.facets.list, function(facet) {
              helper.clearRefinements(facet.name);
            });
            helper.search();
          }
        );

        $('.ais-hits-container').on(
          'click',
          '.ais-hit-empty--clear-input',
          function() {
            opts.helper.setQuery('').search();
            $('.ais-search-box--input')
              .val('')
              .focus();
          }
        );
      },
    });

    // Pagination
    instant.search.addWidget(
      instantsearch.widgets.pagination({
        container: '.ais-pagination-container',
        padding: 2,
        maxPages: 20,
      })
    );
    
    instant.search.on('render', function() {
		if ($('#canonical-link')) {
			var link = $('#canonical-link');
			link.attr('href', window.location.href);
          	console.log("Change link");
		}
	});
  
  	// Stars
  	//instant.search.addWidget(
  	  //instantsearch.widgets.starRating({
  		//container: '#star-rating',
  		//attributeName: 'meta.turnto.product_rating',
  		//max: 5,
	   //})
    //);
    
    //var onRenderHandler = function() {
    
      //affirm.ui.ready(function(){
     //		affirm.ui.refresh();
	 //});

    //};
	//instant.search.on('render', onRenderHandler);
		// on renderHandler will be called
		// until removeListener is call	

    // Main
    instant.search.start();
    $hiding.remove();
    
});  
})(window.algoliaShopify, window.instantsearch);

