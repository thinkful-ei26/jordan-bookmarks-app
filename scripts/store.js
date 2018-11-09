// eslint-disable-next-line no-unused-vars
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
/* global Item, cuid */
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {

  const items = [ 
    { id: cuid(), name: 'New York Times', url: "https://www.nytimes.com/", rating: 5, expanded: false},
    { id: cuid(), name: 'The Onion', url: "https://www.theonion.com/", rating: 3, expanded: false},
    { id: cuid(), name: 'Fox News', url: "https://www.foxnews.com/", rating: 0, expanded: false},
  ];

  const added = true; 

  function addBookmark(item) {
    console.log(`addBookmark ran`)
      this.items.push(Item.create(item));
    };

  function viewItemDescription(name, url, rating, description) {
    console.log(`itemDescription ran`)
    this.items.push(Item.create(name, url, rating, description))

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

  return {
    items,
    added,
    viewItemDescription,
    findById,
    addBookmark,
    filterByRating,
  };

}() );
