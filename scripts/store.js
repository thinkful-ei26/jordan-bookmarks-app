// eslint-disable-next-line no-unused-vars
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
/* global Item, cuid */
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function() {
console.log(store)
  const items = [
    { id: cuid(), name: 'New York Times', rating: 5, expanded: false},
    { id: cuid(), name: 'The Onion', rating: 3, expanded: false },
    { id: cuid(), name: 'Fox News', rating: 0, expanded: false },
  ];

  function addBookmark(name, rating) {
    try {
      //validate name
      Item.validateName(name);
      //create the item & push it to items array
      this.items.push(Item.create(name, rating));
    }
    catch(error) {
      console.log(error.message);
    }
  }

  function findByRating(rating) {
    console.log('findById ran');
    return this.items.find(item => item.rating === rating);
  };

  function filterByRating(rating) {

    const ratingArr = [this.items.rating]

    for (let i = 0; i >= ratingArr; i++) {
      return rating[i];
    }
    for (let i = 1; i >= ratingArr; i++) {
      return rating[i];
    }
    for (let i = 2; i >= ratingArr; i++) {
      return rating[i];
    }
    for (let i = 3; i >= ratingArr; i++) {
      return rating[i];
    }
    for (let i = 4; i >= ratingArr; i++) {
      return rating[i];
    }
    for (let i = 5; i === ratingArr; i++) {
      return rating[i];
    }
  }

  return {
    items,
    addBookmark,
    findByRating,
    filterByRating,
  };

}() );
