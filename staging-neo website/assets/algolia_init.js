(function(algolia, $, _, Shopify) {
  'use strict';

  if (algolia.config.powered_by) {
    // eslint-disable-next-line no-console
    console.log(
      "You're using Algolia !\n" +
        'Visit https://www.algolia.com/ for more insight about what we do.'
    );
  }

  /* No conflict */
  algolia.$ = algolia.jQuery = $;
  algolia.jQuery = algolia.$;
  algolia._ = _.noConflict();
  algolia.underscore = algolia._;
  algolia.lodash = algolia._;

  /* Store variables */
  algolia.storeName = window.location.hostname
    .replace(/^www\./, '')
    .replace(/^([^.]*)\..*$/, '$1');

  /* Client setup */
  algolia.client = window.algoliasearch(
    algolia.config.app_id,
    algolia.config.search_api_key
  );
  algolia.templates = {};
  algolia.indices = {};
  algolia.full_results = window.location.href.match(/\/search/);
  // we want to match /collections/<handle> but only if handle != 'all'
  algolia.is_collection_results_page = Boolean(
    window.location.pathname.match(/^\/collections\/(?!all$)([^/]+)[/]*$/)
  );

  /* We use Hogan as our templating engine with a custom delimiter: [[ ... ]] */
  algolia.hoganOptions = { delimiters: '[[ ]]' };
  algolia.getTemplate = function getTemplate(name) {
    return document.getElementById('template_algolia_' + name).innerHTML;
  };
  algolia.compileTemplate = function compileHoganTemplate(name) {
    return window.Hogan.compile(
      algolia.getTemplate(name),
      algolia.hoganOptions
    );
  };
  algolia.render = function render(template, obj) {
    var newObj = Object.assign({}, obj, { helpers: algolia.hoganHelpers });
    return template.render(newObj);
  };

  // Current collection page ID
  var current_collection_id_string = algolia
    .getTemplate('current_collection_id')
    .replace(/^\s+|\s+$/g, '');

  if (current_collection_id_string) {
    try {
      var current_collection_id_object = JSON.parse(
        current_collection_id_string
      );
      algolia.current_collection_id =
        current_collection_id_object.currentCollectionID;
    } catch (error) {
      // Encountered an error while trying to parse the collection ID.
      // This most probably means that we aren't on a collection page.
    }
  }

  /* Add CSS block after current script */
  algolia.appendStyle = function appendStyle(content) {
    function insertAfter(newNode, referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    var scripts = document.getElementsByTagName('script');
    var currentScript = scripts[scripts.length - 1];
    var style = document.createElement('style');
    style.innerHTML = content;
    insertAfter(style, currentScript);
  };

  /* Here because we need to ensure we have a fallback with '$ '. */
  algolia.money_format = algolia
    .getTemplate('money_format')
    .replace(/^\s+|\s+$/g, '');
  algolia.formatMoney = function formatMoney(cents) {
    var val = (cents / 100.0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    var format = algolia.money_format;

    /**
     * Uncomment the following block to support Shopify multi currency
     * and convert prices from store currency to the currency selected by
     * the user (aka "presentment" currency).
     * Please note that this relies on the `Shopify.currency` object exposed
     * by Shopify which is an undocumented feature and can change at any time.
     */
    // if (
    //   !_.isUndefined(Shopify) &&
    //   !_.isUndefined(Shopify.currency) &&
    //   !_.isUndefined(Shopify.currency.rate)
    // ) {
    //   // Convert to "presentment" currency using the rate provided by Shopify
    //   val = val * Shopify.currency.rate;
    //   // Round up to the nearest whole number keeping in accordance with
    //   // the default rounding strategy of Shopify
    //   val = Math.ceil(val);
    //   // Convert back to string to allow formatting
    //   val = val.toString();
    // }

    // Not necessary, but allows for more risk tolerance if Shopify.formatMoney doesn't work as we want
    var regexp = /^([^{}]*)\{\{amount\}\}([^{}]*)$/;
    if (format.match(regexp)) {
      return format.replace(regexp, '$1' + val + '$2');
    }

    regexp = /^([^{}]*)\{\{amount_with_comma_separator\}\}([^{}]*)$/;
    if (format.match(regexp)) {
      var money = val.replace(/[.]/, '|');
      money = money.replace(/[,]/, '.');
      money = money.replace(/[|]/, ',');
      return format.replace(regexp, '$1' + money + '$2');
    }

    if (!_.isUndefined(Shopify) && !_.isUndefined(Shopify.formatMoney)) {
      return Shopify.formatMoney(cents, format);
    }

    return '$' + val;
  };
})(window.algoliaShopify, window.$, window._, window.Shopify);
