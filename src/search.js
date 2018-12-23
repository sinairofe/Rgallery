import React from "react";

class Search extends React.Component {


 constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleKeyDown = (e) => {
    this.props.keydown(e);
  };

  search = (e) => {
    this.props.search(this.textInput.value);
  };

  render() {
  	const icon = this.props.icon;

  	return (<div className="search">
              <span onClick={this.search} className={icon}></span>
              <input ref={this.textInput} placeholder ="Type subreddit" onKeyDown={this.handleKeyDown} />
           </div>) 
  }
}



 
export default Search;
 