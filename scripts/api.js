
const API = (function() {
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jordan/bookmarks';
  
  
    function getItemList(callback) {
      $.getJSON(`${BASE_URL}/bookmarks`, callback);
    }
  
    function addItem(itemObject, callback, errorCallback) {
      $.ajax({
        url: `${BASE_URL}`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(itemObject),
        success: callback,
        error: errorCallback
      });
    }
  
    function deleteItem(id, callback) {
      $.ajax({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE',
        success: callback,
      });
    }
  
    return {
      getItemList,
      addItem,
      deleteItem,
    };
  })();