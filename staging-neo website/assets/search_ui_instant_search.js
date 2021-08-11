const searchClient = algoliasearch(
    '7S3USZR1F3',
    '8813ea2e418b6ec6978aaed6701d7b60'
);

const search = instantsearch({
  indexName: 'shopify_products', // your Algolia products index name
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox', // update this selector to match your search page
  }),

  instantsearch.widgets.hits({
    container: '#hits', // update this selector to match your search page
  })
]);

search.start();
