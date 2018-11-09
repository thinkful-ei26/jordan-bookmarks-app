/* global Item, cuid */
/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
/* global store, cuid */

const bookmarkList = (function(){


    function generateNewItemHtml(item) {
      let itemName = `<li class = bookmark-list-items>><button class="submit"
      name="${item.name}</button></li>`

      return itemName;
    }

    function generateExpandedView() {

      const expanded = `<li class="bookmark-list-expanded" data-item-id="${Item.id}" 
      <h3 class="bookmark-name js-bookmark-name">${Item.name}</h3>
      <a class="bookmark-link js-bookmark-link" href="${Item.url}" target="_blank">${Item.url}</a>
      <p class="bookmark-description js-bookmark-description>${Item.description}</p>
      <section class="bookmark-rating js-bookmark-rating">
        <p class="bookmark-rating js-bookmark-rating">${Item.rating}</p>
      </section>
      </li>`

      return expanded;
    }

    function addItemToBookmarkList(name, url, rating, description) {
        try {
          store.items.push({ id: cuid(), name: name, url: url, rating: rating, description: description, expanded: false });
        } catch(error) {
          console.log(`'Cannot add bookmark: ${error.message}'`);
        }
        render();
      };

      function handleNewBookmarkClick() {
        $('#js-bookmark-list-form').submit(function (event) {
          event.preventDefault();
          store.added = true;
          render();
        });
      };


      function handleRatingClick() {
        $('.js-bookmark-list').on('click', function(event) {
          event.preventDefault();
          const val = $(event.currentTarget).val();
          store.filterByRating(val);
          render();
        });
      }

      function render() {
        console.log(store.items)
          // return store.items 
        };


      function bindEventListeners() {
        generateNewItemHtml();
        generateExpandedView();
        addItemToBookmarkList();
        handleNewBookmarkClick();
        handleRatingClick();
      };

return {
render: render,
bindEventListeners: bindEventListeners,
   };
}());