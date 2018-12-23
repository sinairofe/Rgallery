import React from "react";

class Search extends React.Component {

  handleKeyDown = (e) => {
    this.props.keydown(e);
  };


  render() {
  	const icon = this.props.icon;

  	return (<div className="search">
              <span className={icon}></span>
              <input placeholder ="Type subreddit" onKeyDown={this.handleKeyDown} />
           </div>) 
  }
}



 
export default Search;
 