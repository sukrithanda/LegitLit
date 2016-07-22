import {Mongo} from 'meteor/mongo';

Meteor.methods({
 'papers.insert': function() {
    return papers_submit.insert({
      createdAt: new Date(),
      content: '',
      sharedWith: [],
      ownerId: this.userId
    });
  },

  /*'bins.remove': function(bin) {
    return Bins.remove(bin);
  },

  'bins.update': function(bin, content) {
    return Bins.update(bin._id, {$set: { content: content } });
  },

  'bins.share': function(bin, email) {
    return Bins.update(bin._id, {$push: { sharedWith: email} });
  }*/

  'papers.submit': function(bin, email) {
    return papers_submit.update(bin._id, {$push: { sharedWith: email} });
  }
});

/*var createThumb = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('256', '256').stream().pipe(writeStream);
};

var createMedium = function(fileObj, readStream, writeStream) {
  gm(readStream, fileObj.name()).resize('800', '800').stream().pipe(writeStream);
};*/

//papers-submit = new FS.Collection("papers-submit", {
//  stores: [
      //new FS.Store.GridFS("thumbs", { transformWrite: createThumb }),
    //  new FS.Store.GridFS("medium", { transformWrite: createMedium })
  //]
//});

export const papers_submit = new Mongo.Collection('papers-submit');
export const papers_review = new Mongo.Collection('papers-review');
