import {Mongo} from 'meteor/mongo';

Meteor.methods({
 'paper.insert': function(file) {
    return papers_submit.insert({
      createdAt: new Date(),
      fileobj: file,
      reviewers: [],
      reviews: [],
      accepts: 0,
      rejects: 0,
      author: this.userId,
      submitted: false
    });
  },

  'paper.remove': function(paper_id) {
    return papers_submit.remove(paper_id);
  },

  'paper.submit': function(paper_id) {
    return papers_submit.update(paper_id, {$set: { submitted: true }, });
  },

  'paper.review': function(paper, email) {
    return papers_submit.update(paper._id, {$push: { sharedWith: email} });
  }

  /*'papers.submit': function(paper, email) {
    return papers_submit.update(paper._id, {$push: { sharedWith: email} });
  }*/
});

var createFileObj = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).stream().pipe(writeStream);
};

/*papers_submit = new FS.Collection("papers-submit", {
  paper: [
      new FS.Store.GridFS("paper_pdf", { transformWrite: createFileObj }),
  ],


});*/

export const papers_submit = new Mongo.Collection('papers_submit');
//export const papers_review = new Mongo.Collection('papers-review');
