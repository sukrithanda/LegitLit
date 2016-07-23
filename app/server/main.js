import { Meteor } from 'meteor/meteor';
import {papers_submit} from './../imports/collections/papers';

Meteor.startup(() => {
  Meteor.publish('papers_submit', function() {
    return papers_submit.find({ author: this.userId });
  });
  Meteor.publish('papers_review', function(){
    const user = Meteor.users.findOne(this.userId);

    if (!user) {return;}

    const email = user.emails[0].address;

    return papers_submit.find({
      reviewers:{ $elemMatch: { $eq: email }},
      author:  {$ne: this.userId}
    });

    Meteor.publish('userList', function (){
      return Meteor.users.find({});
    });
  });
});
