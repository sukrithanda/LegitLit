import React, {Component} from 'react';

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = [{"constant":false,"inputs":[{"name":"_paper_id","type":"string"},{"name":"_review","type":"string"}],"name":"rejectPaper","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_paper_id","type":"string"},{"name":"_review","type":"string"}],"name":"acceptPaper","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_paper_id","type":"string"}],"name":"submitPaper","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}];


var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0xdbfd3fe74b192e8915ed16ff9f0e8e5fe66c6202');
class ReviewVote extends Component {


  onSubmitVote(event){
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var vote;
    if (document.getElementById('accept').checked) {
      vote = true;
      //console.log(this.props.paper)
      myContractInstance.acceptPaper(this.props.paper._id, this.props.paper.reviews, function(err, results){
           if(err) {
               console.log(err);
           }
      });
    }
    else if(document.getElementById('reject').checked){
      vote = false;
      myContractInstance.rejectPaper(this.props.paper._id, this.props.paper.reviews, function(err, results){
           if(err) {
               console.log(err);
           }
      });
   }
      var email = Meteor.user().emails[0];
      //console.log(email);
      Meteor.call('paper_review.submit', this.props.paper, this.props.paper.reviews, vote, email, this.props.paper.reviewers);

      var btn = document.getElementById('submitbutton');
      btn.disabled = true;
      btn.style = "DISPLAY: none;";

      var input1 = document.getElementById('form');
      input1.style = "DISPLAY: none;";

      var input2 = document.getElementById('reject');
      input2.style = "DISPLAY: none;";

  /*  var msg = document.getElementById('review_msg');
    msg.style.display = 'block';*/

  }

  render(){

    return (
      <footer className="review-vote">
        <div className="input-group">
        <form id="form">
            <div>
                <input id="accept" type="radio" name="vote" value="true" />Accept
            </div>
            <div>
                <input id = "reject" type="radio" name="vote" value="false" />Reject
            </div>
          </form>
          <div className="input-group-btn">
              <button
                id = "submitbutton"
                onClick={this.onSubmitVote.bind(this)}
                className="btn btn-dang">
                Submit
              </button>
          </div>

        </div>

      </footer>
    );
  }
}

export default ReviewVote;
