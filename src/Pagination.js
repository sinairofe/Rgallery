import React from "react";

class Pagination extends React.Component {
 
 prevPage = (e) => {
    this.props.prev(e);
 };

 nextPage = (e) => {
    this.props.next(e) ;
  };

  render() {

  	return (<div className={this.props.arrowIcon}>
              <span onClick = {this.prevPage} className="fa fa-arrow-circle-left"></span>
              <span>{this.props.pageIndex}</span>
              <span onClick = {this.nextPage} className="fa fa-arrow-circle-right"></span>
            </div>)
  }
}



 
export default Pagination;
 