/* global Item, store, cuid */
'use strict';

const bookmarkList = (function(){


  function generateItemElement(item) {
    console.log(`generateItemElement ran`)
    // console.log(item)
    
    if (!item.expanded){
    return `<li data-item-id="${item.id}" class = 'js-item-element'>${item.name}
            <button class = "expanded-view" aria-label="View More">View More</button>   
            <button class = "delete-bookmark" aria-label="Delete">Delete</button></li>  
    `
  }
    else {
      return `<div class = 'collapsed js-item-element' data-item-id="${item.id}"><table>
    <thead>
        <tr>
            <th colspan="2" aria-label="Bookmark Title" >${item.name}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td aria-label="Bookmark URL">${item.url}</td></tr>
            <tr>
            <td aria-label="Bookmark Description">${item.description}</td>
        </tr>
        <tfoot>
          <tr>
        <th colspan="2" aria-label="Bookmark Rating">${item.rating}</th>
          </tr>
        </tfoot>
    </tbody>
</table>
<button class = "collapsed-view" aria-label="View Less">View Less</button>
<div>`
  };
}

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    // console.log(items)
    return items.join('');
  };

function generateRatingStars(){
 return `<label for="ratings-menu" aria-label="select a rating">Minimum Rating</label><br>
  <select name="ratings-menu">
  <div class="ratings">
    <option value="5" aria-label="five stars">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
    <option value="4" aria-label="four stars">&#9733;&#9733;&#9733;&#9733;</option>
    <option value="3" aria-label="three stars">&#9733;&#9733;&#9733;</option>
    <option value="2" aria-label="two stars">&#9733;&#9733;</option>
    <option value="1" aria-label="one star">&#9733;</option>
  </select></label></div>`
}

  function generateAddBookmarkForm(){

    return `<form><div class="container"><div class="row">
    <div class="add title">
      <label for="bookmarkTitle" aria-label="add bookmark title">Title</label>
      <input type="text" placeholder="Bookmark Title Here" id="bookmarkTitle">
      </div>
      <div class="add url">
      <label for="bookmarkURL" aria-label="add bookmark URL">URL</label>
      <input type="text" placeholder="Bookmark URL Here" id="bookmarkURL">
      <div>
    </div>
    <div class = "add description">
  <label for="description" aria-label="add Bookmark Description">Description</label>
  <textarea class="u-full-width" placeholder="Description Here" id="bookmarkDescription"></textarea>
</div>
    <div class="add rating">
      <label for="bookmarkRating" aria-label="add Bookmark Rating">Rating</label>
      <select class="u-full-width" id="bookmarkRating">
        <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
        <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
        <option value="3">&#9733;&#9733;&#9733;</option>
        <option value="2">&#9733;&#9733;</option>
        <option value="1">&#9733;</option>
      </select>
    </div>
    <div class="save-bookmark">
      <input type="submit" aria-label="save bookmark" name="save-bookmark" value ="save">
  </div></form>`
  }


  function render() {
    // console.log(`render ran`)

    if (store.adding === true) {
      const form = generateAddBookmarkForm()
      $('.js-add-bookmark').hide()
      $('.bookmark-add-expand').html(form) 
    }
    else {
      $('.js-add-bookmark').show()
      $('.bookmark-add-expand').empty()
    }
   
    const bookmarkListItemsString = generateBookmarkString(store.items);
console.log(bookmarkListItemsString)
    $('.js-bookmark-list').html(bookmarkListItemsString);
    };


      function addItemToBookmarks(name, url, description, rating) {
        try {
          Item.validateName(name, url, description, rating);
          store.items.push({ id: cuid(), name: name, url: url, description: description, rating: rating, expanded: false });
        } catch(error) {
          console.log(`'Cannot add item: ${error.message}'`);
        }
        render();
      }

      function handleAddBookmarkClick() {
        console.log(`handleBookmarkClick ran`);
        $('.js-add-bookmark').on('click', function (event) {
          event.preventDefault();
          store.adding = true;
          render();
        });
      };

      function handleSaveItemToBookmarksClick() {
        console.log(`handleAddItemToBookmarksClick ran`);
        $('.bookmark-add-expand').on('submit', 'form', function (event) {
          event.preventDefault();
          const name = $('#bookmarkTitle').val();
          const url =$('#bookmarkURL').val()
          const description = $('#bookmarkDescription').val()
          const rating =  $('#bookmarkRating').val()

         addItemToBookmarks(name, url, description, rating);
         store.adding = false;
          render();
        })
      }

      function getItemIdFromElement(item) {
        return $(item)
        .closest('.js-item-element')
        .data('item-id')
    };

      function handleViewMoreClick(){
        $('.js-bookmark-list').on('click', '.expanded-view', function (event) {
          event.preventDefault();
          //update the state to reflect that one of these items should be expanded
          //console log id of the clicked bookmark
          //update that bookmark's expanded property to be true
          const id = getItemIdFromElement(event.currentTarget)
          store.findById(id).expanded = true;
          render();
        })
      };

      function handleViewLessClick(){
        $('.js-bookmark-list').on('click', '.collapsed-view', function (event) {
          event.preventDefault();
          const id = getItemIdFromElement(event.currentTarget)
          store.findById(id).expanded = false;
          render();
          }
        )};

        function handleDeleteItem() {
          $('.js-bookmark-list').on('click', '.delete-bookmark', function (event) {
            event.preventDefault();
            const id = getItemIdFromElement(event.currentTarget);
            store.findAndDelete(id);
            render();
          }
        )};

        function handleRatingFilter() {
          console.log(`handleRatingFilter Ran`);
          $('.ratings-menu').on('change', function(event) {
            event.preventDefault();
            store.starRating = parseInt($('.ratings-menu option:selected').val())
            render();
          });
        };

      function bindEventListeners() {
        handleDeleteItem();
        handleAddBookmarkClick();
        handleSaveItemToBookmarksClick();
        handleViewMoreClick();
        handleViewLessClick();
        handleRatingFilter();
      };

return {
render: render,
bindEventListeners: bindEventListeners,
   };
}());