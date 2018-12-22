import React from "react";
import ReactDOM from "react-dom";
import Post from "./Post";
import "./index.css";
import reddit from './redditapi';


let posts = []; 

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], search:'fa fa-search' }; 
    this.handleKeyDown = this.handleKeyDown.bind(this);

  }

  componentWillMount() { 

  }  
  *


  componentDidMount() {
  }  


  search(param){
      posts = []; 
       reddit.search(param).then(results => {
         results.forEach(post => {
          if( post.thumbnail && post.thumbnail.startsWith('http')){
            posts.push(post); 
          }
      }) 
       this.setState ({ posts: posts,search:'fa fa-search' });  
   })

  }
  
handleKeyDown(e) {
   if (e.keyCode === 13){
      this.setState ({ posts: posts,search:'fa fa-spinner' });  
      this.search(e.target.value)
      e.target.parentNode.classList.add('mt-0'); 
    }
  }


  render() {
    return (
      <div className="gallery-container">
      <div className="search">
          <span className={this.state.search}></span>
          <input placeholder ="Type subreddit" onKeyDown={this.handleKeyDown} />
       </div>   
        <div className="gallery-grid">
          {this.state.posts.map((p)=>
            <Post key={p.permalink} post={p} ></Post>
            )}
        </div>
      </div>
    )
  }
} 



ReactDOM.render(<Gallery />, document.querySelector('.gallery-container'));