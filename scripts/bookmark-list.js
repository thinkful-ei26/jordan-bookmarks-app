/* global Item, store, cuid */
'use strict';

const bookmarkList = (function(){


//   function generateItemElement(item) {
  
//     if (!item.expanded) {
//       return `<ul class="bookmark-list js-bookmark-list" data-item-id="${item.id}">   
//       <li class="bookmark-name">${item.name}</li>
      
//         <div class="bookmark-add-expand">
//             <div></div>
//           <button class="description">View More</button>
//         </div>  
//       </ul>
//       </div>`;
// };

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


  // function generateBookmarkString(bookmarkList) {
  //   const items = bookmarkList.map((item) => generateItemElement(item));
  //   return items.join('');
  // };

  function render() {
    console.log(`render ran`)
    console.log(store.items)
     let items = store.items ;
     if (store.handleViewItemDescription) {
       items = store.items.filter(item => !item.checked)
     }
      // render the shopping list in the DOM
    console.log('`render` ran');
    // const bookmarkListItemsString = generateBookmarkItemsString(items);

    // insert that HTML into the DOM
    // $('.js-bookmark-list').html(bookmarkListItemsString);
    };



    
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

      function bindEventListeners() {
        // generateItemElement();
        addItemToBookmarkList();
        // generateBookmarkString();
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