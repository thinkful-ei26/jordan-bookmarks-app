/* global Item, cuid */
/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
/* global store, cuid */

const bookmarkList = (function(){


    // function generateNewItemHtml(item) {
    //   let itemName = `<li class = bookmark-list-items>><button class="submit"
    //   name="${item.name}</button></li>`

    //   return itemName;
    // }

    // function generateExpandedView() {

    //   const expanded = `<li class="bookmark-list-expanded" data-item-id="${Item.id}" 
    //   <h3 class="bookmark-name js-bookmark-name">${Item.name}</h3>
    //   <a class="bookmark-link js-bookmark-link" href="${Item.url}" target="_blank">${Item.url}</a>
    //   <p class="bookmark-description js-bookmark-description>${Item.description}</p>
    //   <section class="bookmark-rating js-bookmark-rating">
    //     <p class="bookmark-rating js-bookmark-rating">${Item.rating}</p>
    //   </section>
    //   </li>`

    //   return expanded;
    // }

    
    function addItemToBookmarkList(name, url, rating, description) {
      console.log(`addItemToBookmarkList ran`);
        try {
          store.items.push({ id: cuid(), name: name, url: url, rating: rating, description: description, expanded: false });
        } catch(error) {
          console.log(`'Cannot add bookmark: ${error.message}'`);
        }
        render();
      };

      // function handleDeleteItem() {

      // }

      function handleBookmarkClick() {
        console.log(`handleBookmarkClick ran`);
        $('.js-add-bookmark').on('click', function (event) {
          event.preventDefault();
          store.added = true;
          render();
        });
      };

      function handleViewItemDescription(){
        console.log(`handleViewItemDescription ran`);
        $('.js-bookmark-list').on('click', function (event) {
          event.preventDefault();
          store.items.expanded = true;
          render();
        })
      };

      function handleRatingClick() {
        console.log(`handleRatingClick Ran`);
        $('.js-ratings-menu').on('click', function(event) {
          event.preventDefault();
          const value = $(event.currentTarget).val();
          store.filterByRating(value);
          render();
        });
      };

      function render() {
        console.log(`render ran`)
      console.log(store.items)
          return store.items 
        };


      function bindEventListeners() {
        // generateNewItemHtml();
        // generateExpandedView();
        addItemToBookmarkList();
        // handleDeleteItem();
        handleBookmarkClick();
        handleViewItemDescription();
        handleRatingClick();
      };

return {
render: render,
bindEventListeners: bindEventListeners,
   };
}());