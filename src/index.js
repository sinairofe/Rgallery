import React from "react";
import ReactDOM from "react-dom";
import Post from "./Post";
import Search from "./search";
import Pagination from "./Pagination";
import "./index.css";
import reddit from './redditapi';


const MAX_ITEM_PER_PAGE = 9;
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  postsMap: new Map(), 
                  search:'fa fa-search',
                  ArrowIcon:'hidden',
                  page: 0,
                  noresult:false
                }; 

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
  }

  componentWillMount() { 
  }  
  
  componentDidMount() {
  }  


  searchPosts(param){
      let posts = []; 
      let indexItem = 0;
      let pageNumber = 0;
      const postsMap = new Map();
      this.setState ({postsMap: new Map(),
                      page:0,
                      ArrowIcon: "hidden"});  

       reddit.search(param).then(results => {
         results.forEach(post => {
          if( post.thumbnail && post.thumbnail.startsWith('http')){
            pageNumber  = Math.floor(indexItem / MAX_ITEM_PER_PAGE);
            if (pageNumber === indexItem / MAX_ITEM_PER_PAGE){
              posts = [];
            }
            posts.push(post); 
            postsMap.set(pageNumber, posts);
            indexItem++;
          }
      }) 
         const noresult = indexItem > 0? false:true;
         const arrowIcon = indexItem > 0?"arrows":"hidden";
       this.setState ({ postsMap: postsMap,search:'fa fa-search',ArrowIcon: arrowIcon,noresult:noresult });  
      }).catch((err) => {
        // Handle any error that occurred in reddit search
      });

  }
  
 handleKeyDown(e) {
   if (e.keyCode === 13){
      this.setState ({ search:'fa fa-spinner' });  
      this.searchPosts(e.target.value);
      const searchElm = e.target.parentNode;
      searchElm.classList.add('above'); 
    }
  }

  clickSearch (e){
    const value  = e.value;
    if(value){ 
      this.setState ({ search:'fa fa-spinner' });  
      this.searchPosts(value);
      const searchElm = e.parentNode; 
      searchElm.classList.add('above'); 
    }
  }


  getPostInPage(pagePosts){
    return (pagePosts && pagePosts[0]&& pagePosts[0][1])? pagePosts[0][1]:[];
  }

  nextPage(){
    let pageNumber = this.state.page;
    const numOfPages = this.state.postsMap.size;
    if (pageNumber < numOfPages - 1)
    this.setState({page:++pageNumber});
  }

  prevPage(){
    let pageNumber = this.state.page;
    if (pageNumber > 0){
      this.setState({page:--pageNumber});
    }
  }

  render() {
    const pagePosts =  [...this.state.postsMap]
                          .filter((posts,page)=> page === this.state.page);
    const postsInPage = this.getPostInPage(pagePosts);
    const pageIndex = `${this.state.page+1}/${this.state.postsMap.size}`;
       
    return (
      <div className="gallery-wrapper">
           <Search icon={this.state.search} 
                    keydown={this.handleKeyDown}
                    search = {this.clickSearch}>
           </Search>  
           <Pagination   prev={this.prevPage} 
                         next={this.nextPage}  
                         pageIndex={pageIndex}
                         arrowIcon={this.state.ArrowIcon}>
           </Pagination> 
           <div className="gallery-grid"> 
              {
                postsInPage.map((p)=> {
                    if (p) return <Post key={p.permalink} post={p} ></Post>
                 })
              }
          </div>
          <div className={this.state.noresult ?"no-result" : "hidden"}>No result found</div>
      </div>
    )
  }
} 



ReactDOM.render(<Gallery />, document.querySelector('.gallery-wrapper'));