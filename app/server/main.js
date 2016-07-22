import { Meteor } from 'meteor/meteor';
import {papers_submit, papers_review} from './../imports/collections/papers';

Meteor.startup(() => {
  Meteor.publish('papers-submit', function() {
    return papers-submit.find({ ownerId: this.userId });
  });
  Meteor.publish('papers-review', function(){
    const user = Meteor.users.findOne(this.userId);

    if (!user) {return;}

    const email = user.emails[0].address;

    return papers-review.find({
      peers:{ $elemMatch: { $eq: email }}
    });
  });
});
