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
      author: this.userId
    });
  },

  'paper.remove': function(paper) {
    return papers_submit.remove(paper);
  },

  'paper_review.update': function(paper, content) {
    return papers_submit.update(paper._id, {$set: { reviews: content } });
  },

  'paper.review': function(paper, email) {
    return papers_submit.update(paper._id, {$push: { reviewers: email} });
  }

});

export const papers_submit = new Mongo.Collection('papers_submit');
