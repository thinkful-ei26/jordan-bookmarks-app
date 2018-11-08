/* global Item, cuid */
/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
/* global store, cuid */

const bookmarkList = (function(){

    function render() {
    
        return store.items 

      };

    function addItemToBookmarkList(itemName) {
        try {
          Item.validateName(itemName);
          Item.addRating(rating);
          store.items.push({ id: cuid(), name: itemName, rating: rating });
        } catch(error) {
          console.log(`'Cannot add item: ${error.message}'`);
        }
        render();
      };

      function handleNewItemSubmit() {
        $('#js-bookmart-list-form').submit(function (event) {
          event.preventDefault();
          const newItemName = $('.js-bookmark-list-entry').val();
          $('.js-bookmark-list-entry').val('');
          addItemToBookmarkList(newItemName);
          render();
        });
      };

      function handleToggleFilterClick() {
        $('.js-bookmark-list').on('click', '#rating', event => {
          store.filterByRating(event.currentTarget);
          render();
        });
      };

      function bindEventListeners() {
        addItemToBookmarkList();
        handleNewItemSubmit();
        handleToggleFilterClick();
      };

return {
render: render,
bindEventListeners: bindEventListeners,
   };
}());