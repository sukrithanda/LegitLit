import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';
import { Link } from 'react-router';

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = [{"constant":false,"inputs":[{"name":"_paper_id","type":"string"},{"name":"_review","type":"string"}],"name":"rejectPaper","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_paper_id","type":"string"},{"name":"_review","type":"string"}],"name":"acceptPaper","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_paper_id","type":"string"}],"name":"submitPaper","outputs":[{"name":"id","type":"string"}],"type":"function"},{"constant":true,"inputs":[],"name":"test","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}];

var MyContract = web3.eth.contract(abi);
var myContractInstance = MyContract.at('0xadf7d81b85a291c6e52e89546fd84646e9493dc6');

class MySubmissions extends Component {

  onPaperView(bin) {
    Meteor.call('bins.remove', bin);
  }

  handleSubmit(id){
      //console.log(myContractInstance.test());
      web3.eth.defaultAccount = web3.eth.accounts[0];
      myContractInstance.submitPaper(id, function(err, results){
           if(err) {
               console.log(err);
           }
           else {
               console.log(results);
               console.log("submit");
               Meteor.call('paper.submit', id);
           }
       });
  }

  handleRemove(id){
      console.log("remove");
      Meteor.call('paper.remove', id);
  }

  handleStatus(url){
      console.log("status");
      location.href = url;
  }

  renderList(){

    for(var i = this.props.papers.length - 1; i >= 0; i--) {
      if(this.props.papers[i].author !== Meteor.userId()) {
       this.props.papers.splice(i, 1);
      }
    }

    return this.props.papers.map(paper =>{
      const url =`/view/${paper._id}`;

      var button1;
      var button2;
      if (paper.submitted){
          button1 = <Link to={url}><button className="btn btn-primary">Status</button></Link>
      }
      else{
          button1 = <button className="btn btn-success" onClick={this.handleSubmit.bind(this, paper._id)}>Submit</button>
          button2 = <button className="btn btn-danger" onClick={this.handleRemove.bind(this, paper._id)}>Remove</button>
      }

      return(
        <li className="list-group-item" key={paper._id}>
          <a href={paper.fileobj}>{paper.name}</a>
          <span className="pull-right">
              {button1}
              {button2}
          </span>
        </li>
      );
    });
  }
  render(){
    return (
      <div>
        <label> My Submissions </label>

      <ul className="list-group">
        {this.renderList()}
      </ul>
    </div>
    );
  }
}


export default createContainer(() => {

  Meteor.subscribe('papers_submit');


  return { papers: papers_submit.find({}).fetch()};
}, MySubmissions);
