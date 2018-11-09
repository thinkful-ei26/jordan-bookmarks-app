/* global Item, store, cuid */
'use strict';

const bookmarkList = (function(){


  function generateItemElement(item) {

    return `
    <li data-item-id="${item.id}">${item.name}</li>`
  };

  function generateBookmarkString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  };


  function generateAddBookmarkForm(){

    return `<div class="container"><div class="row">
    <div class="add title">
      <label for="bookmarkTitle">Bookmark Title</label>
      <input class="u-full-width" placeholder="Bookmark Title Here" id="bookmarkTitle">
      <label for="bookmarkURL">Bookmark URL</label>
      <input class="u-full-width" placeholder="Bookmark URL Here" id="bookmarkURL">
    </div>
    <div class="add rating">
      <label for="rating">Rating</label>
      <select class="u-full-width" id="rating-input">
        <option value="5">5 Stars</option><span>&#9733;</span>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>
    </div>
  </div>
  <div class = "add description">
  <label for="description">Description</label>
  <textarea class="u-full-width" placeholder="Bookmark Description Here" id="description"></textarea>
</div>`
  }


    // if (!item.expanded) {
    //   return `<ul class="bookmark-list js-bookmark-list" data-item-id="${item.id}">   
    //   <li class="bookmark-name">${item.name}</li>
      
    //     <div class="bookmark-add-expand">
    //         <div></div>
    //       <button class="description">View More</button>
    //     </div>  
    //   </ul>
    //   </div>`;


//   if (item.expanded === true) {
//     return `<ul class="bookmark-list js-bookmark-list" data-item-id="${item.id}">   
// <li class="bookmark-name">${item.title}</li> 
// <div class ="bookmark-add-expand">
//   <div class="add-title">
//       <div><div class="add-rating">
//       <div class="add-description">
//         <div>
//          ${obj.description}
//         </div>
//       </div>
//         <div class="link-delete-container">
//             <a href="${obj.url}">${obj.url}</a>
    
//     <button class="description">View Less</button>
//   </div>
//   </div  
// </ul>
// </div>`
//     }
//   };

  function render() {
    console.log(`render ran`)

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

    $('.js-bookmark-list').html(bookmarkListItemsString);
    };

//when bookmark form is submitted, set store.adding === false
    
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
          store.adding = true;
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

      function bindEventListeners() {
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