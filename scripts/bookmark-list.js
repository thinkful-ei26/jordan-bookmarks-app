/* global Item, store, cuid */
'use strict';

const bookmarkList = (function(){


  function generateItemElement(item) {
    console.log(`generateItemElement ran`)
    // console.log(item)
    
    if (!item.expanded){
    return `<li data-item-id="${item.id}" class = 'js-item-element'>${item.name} <br> ${item.rating} star(s)
            <button class = "expanded-view" label="View More" role="button">View More</button>   
            <button class = "delete-bookmark" label="Delete" role="button">Delete</button></li>  
    `
  }
    else {
      return `<div class = 'collapsed js-item-element' data-item-id="${item.id}"><table>
    <thead>
        <tr>
            <th colspan="2" label="Bookmark Title">${item.name}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td label="Bookmark URL">${item.url}</td></tr>
            <tr>
            <td label="Bookmark Description">${item.description}</td>
        </tr>
        <tfoot>
          <tr>
        <th colspan="2" aria-label="Bookmark Rating">${item.rating} star(s)</th>
          </tr>
        </tfoot>
    </tbody>
</table>
<button class = "collapsed-view" label="View Less" role="button">View Less</button>
<div>`
  };
}

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    // console.log(items)
    return items.join('');
  };


  function generateAddBookmarkForm(){

    return `<form><fieldset><div class = "container"><ul class="add-bookmark-form">
    <li>
    <div class="add title" role="textbox">
      <label for="bookmarkTitle" aria-label="add bookmark title">Title</label><br>
      <input type="text" placeholder="Bookmark Title Here" id="bookmarkTitle" aria-required="true" required>
      </div>
      </li>
      <li>
      <div class="add url" role="textbox">
      <label for="bookmarkURL" label="add bookmark URL">URL</label><br>
      <input type="url" placeholder="Bookmark URL Here" id="bookmarkURL" aria-required="true" required>
    </div>
    </li>
    <li>
    <div class = "add description" role="textbox">
  <label for="description" label="add Bookmark Description">Description</label><br>
  <textarea class="description" placeholder="Description Here" id="bookmarkDescription" aria-required="true" required></textarea>
  </div>
    </li>
    <li>
    <div class="add rating" role="radio-group">

      <select class="rating" id="bookmarkRating" aria-required="true" required>
        <option value="5" role="radio">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
        <option value="4" role="radio">&#9733;&#9733;&#9733;&#9733;</option>
        <option value="3" role="radio">&#9733;&#9733;&#9733;</option>
        <option value="2" role="radio">&#9733;&#9733;</option>
        <option value="1" role="radio">&#9733;</option>
      </select>
    </div>
    </li>
    <li>
    <div class="save-bookmark">
      <input type="submit" label="save bookmark" role="button" name="save-bookmark" value ="save">
      </div>
      </li>
      </ul>
      </div>
      </fieldset>
      </form>`
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

    let items = store.items;
    if (store.starRating) {
        items = store.items.filter(item => item.rating >= store.starRating);
    }
   
    const bookmarkListItemsString = generateBookmarkString(items);
    console.log(bookmarkListItemsString)
    $('.js-bookmark-list').html(bookmarkListItemsString);
    };


  function addItemToBookmarks(name, url, description, rating) {
    try {
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
      console.log(`ratings filter ran`)
      store.starRating = parseInt($('.ratings-menu option:selected').val());
      store.filterByRating(store.starRating);
      render();
    });
  };

  function bindEventListeners() {
    handleAddBookmarkClick();
    handleSaveItemToBookmarksClick();
    handleViewMoreClick();
    handleViewLessClick();
    handleDeleteItem();
    handleRatingFilter();
      };

return {
render: render,
bindEventListeners: bindEventListeners,
   };
}());

