// eslint-disable-next-line no-unused-vars
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
/* global Item, cuid */
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {

  const items = [];

  let adding = false; 
  let starRating = 0;

  function addBookmark(name, url, rating, description) {
    console.log(`addBookmark ran`)
      this.items.push(Item.create(name, url, rating, description));
  
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
    findById,
    addBookmark,
    filterByRating,
    starRating,
    findAndDelete
  };

}() );
