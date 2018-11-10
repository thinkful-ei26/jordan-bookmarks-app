// eslint-disable-next-line no-unused-vars
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
/* global Item, cuid */
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {

  const items = [ 
    { id: cuid(), name: 'New York Times', url: "https://www.nytimes.com/", description: "...", rating: 5, expanded: false},
    { id: cuid(), name: 'The Onion', url: "https://www.theonion.com/", description: "...", rating: 3, expanded: false},
    { id: cuid(), name: 'Fox News', url: "https://www.foxnews.com/", description: "...", rating: 0, expanded: false},
  ];

  let adding = false; 
  let starRating = 1;

  function addBookmark(item) {
    console.log(`addBookmark ran`)
      this.items.push(Item.create(item));
    };

  function findById(id) {
    console.log(`findById ran`)
    return this.items.find(item => item.id === id);
  };

  function filterByRating(rating) {
    console.log(`filterByRating ran`)
    this.items = this.items.filter(item => {
      return item.rating >= rating;
    });
  }

  const findAndDelete = function(id) {
    console.log(`findAndDelete ran`)
    this.items = this.items.filter(item => item.id !== id);
  };

  return {
    items,
    adding,
    starRating,
    findById,
    addBookmark,
    filterByRating,
    findAndDelete
  };

}() );
