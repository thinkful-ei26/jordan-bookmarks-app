// eslint-disable-next-line no-unused-vars
/* global shoppingList, cuid */

// Objective: Build an Item module that
//contains functions to validate and create items.

'use strict';

const Item = (function () {

  const create = function(name, url, rating, description) {
    return {
      id: cuid(),
      name: name,
      url: url,
      rating: rating,
      description: description,
      expanded: false 
    };

  };

  return {
    create
  };

}());
