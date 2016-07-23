import React, {Component} from 'react';

class ReviewVote extends Component {


  onSubmitVote(event){
    var vote;
    if (document.getElementById('accept').checked) {
      vote = true;
    }
    else if(document.getElementById('reject').checked){
      vote = false;
    }

    Meteor.call('paper_review.submit', this.props.paper, this.props.paper.reviews, vote);

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
