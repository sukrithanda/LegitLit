import {Mongo} from 'meteor/mongo';

Meteor.methods({
 'paper.insert': function(file) {
    return papers_submit.insert({
      createdAt: new Date(),
      fileobj: file,
      reviewers: [],
      reviews: "",
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
  
  'paper.submit': function(paper_id) {
    return papers_submit.update(paper_id, {$set: { submitted: true }, });
  },

  'paper.review': function(paper, email) {
    return papers_submit.update(paper._id, {$push: { reviewers: email} });
  }

});

export const papers_submit = new Mongo.Collection('papers_submit');
