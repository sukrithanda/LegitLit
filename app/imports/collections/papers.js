import {Mongo} from 'meteor/mongo';

Meteor.methods({
 'paper.insert': function(file, filename) {
    return papers_submit.insert({
      createdAt: new Date(),
      address: "",
      fileobj: file,
      name: filename,
      reviewers: ['reviewer1@gmail.com', 'reviewer2@gmail.com'],
      reviews: '',
      reviewArray: [],
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

  'paper_review.submit': function(paper, content, vote, email, reviewers) {
  //  return papers_submit.update(paper._id, {$set: { reviews: content }
    var temp = [];
    //console.log(reviewers);
    for (var i=0; i < reviewers.length; i++){
        console.log(email);
        console.log('2');
        console.log(reviewers[i]);
        if (reviewers[i] !== email.address){
            temp.push(reviewers[i]);
        }
    }
    if(vote == true){
      papers_submit.update(paper._id, { $inc: {accepts: 1}});
    }
    else{
      papers_submit.update(paper._id, { $inc: {rejects: 1}});
    }
    //console.log(email);
    papers_submit.update(paper._id, {$set: { reviewers: [] }}, {multi: true} )
    papers_submit.update(paper._id, {$push: {reviewArray: content}})
    papers_submit.update(paper._id, {$set: {reviews: ''}})
    return papers_submit.update(paper._id, {$set: { reviewers: temp} })
  },

  'paper.submit': function(paper_id) {
    return papers_submit.update(paper_id, {$set: { submitted: true }, });
  },

  'paper.review': function(paper, email) {
    return papers_submit.update(paper._id, {$push: { reviewers: email} });
  }

});

export const papers_submit = new Mongo.Collection('papers_submit');
