import {Mongo} from 'meteor/mongo';

Meteor.methods({
 'paper.insert': function(file) {
    return papers_submit.insert({
      createdAt: new Date(),
      address: "",
      fileobj: file,
      reviewers: [],
      reviews: [],
      reviewed: [],
      accepts: 0,
      rejects: 0,
      author: this.userId,
      submitted: false
    });
  },

  'paper.remove': function(paper_id) {
    return papers_submit.remove(paper_id);
  },

  'paper_review.update': function(paper, content) {
    return papers_submit.update(paper._id, {$set: { reviews: content } });
  },

  'paper_review.submit': function(paper, content, vote) {
  //  return papers_submit.update(paper._id, {$set: { reviews: content } });
    if(vote == true){
      return papers_submit.update(paper._id, { $inc: {accepts: 1}});
    }
    else{
      return papers_submit.update(paper._id, { $inc: {rejects: 1}});
    }

  },

  'paper.submit': function(paper_id) {
    return papers_submit.update(paper_id, {$set: { submitted: true }, });
  },

  'paper.review': function(paper, email) {
    return papers_submit.update(paper._id, {$push: { reviewers: email} });
  }

});

export const papers_submit = new Mongo.Collection('papers_submit');
