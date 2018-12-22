export default {
  search: function(searchTerm, searchLimit = 99, sortBy = 'asc') {
    return fetch( 
      `http://www.reddit.com/search.json?q=${searchTerm}&limit=${searchLimit}` 
    )
      .then(res => res.json())
      .then(data => {
        return data.data.children.map(data => data.data);
      })
      .catch(err => console.log(err));
  }
};