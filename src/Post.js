import React from "react";

class Post extends React.Component {




  render() {
  	const {thumbnail, permalink, title} = this.props.post;
    let href = `https://www.reddit.com/${permalink}`;

  	return (<div key={href}>
        <div className="tooltip">
          <a href={href} target="_blank">
            <img src={thumbnail} />
          </a>
           <span className="tooltiptext">{title}</span>
          </div>
      </div>)
  }
}



 
export default Post;
 