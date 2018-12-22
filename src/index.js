import React from "react";
import ReactDOM from "react-dom";
import Post from "./Post";
import "./index.css";
import reddit from './redditapi';


 const MAX_ITEM_PER_PAGE = 9;

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postsMap: new Map(), search:'fa fa-search',page: 0,ArrowIcon:'hidden',noresult:false}; 
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getPostInPage = this.getPostInPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

  }

  componentWillMount() { 
  }  
  


  componentDidMount() {
  }  


  search(param){
      let posts = []; 
      let indexItem = 0;
      let pageNumber = 0;
      const postsMap = new Map();

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
   })

  }
  
handleKeyDown(e) {
   if (e.keyCode === 13){
      this.setState ({ search:'fa fa-spinner' });  
      this.search(e.target.value)
      const searchElm = e.target.parentNode;
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
    let pagePosts =  Array.from(this.state.postsMap)
                          .filter((posts,page)=> page === this.state.page);
    let postsInPage = this.getPostInPage(pagePosts);
       
    return (
      <div className="gallery-container">
          <div className="search">
              <span className={this.state.search}></span>
              <input placeholder ="Type subreddit" onKeyDown={this.handleKeyDown} />
           </div>   
            <div className={this.state.ArrowIcon}>
              <span onClick = {this.prevPage} className="fa fa-arrow-circle-left"></span>
              <span onClick = {this.nextPage} className="fa fa-arrow-circle-right"></span>
            </div>
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



ReactDOM.render(<Gallery />, document.querySelector('.gallery-container'));