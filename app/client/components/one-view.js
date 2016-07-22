import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {papers_submit} from './../../imports/collections/papers';

class OneView extends Component{

    render() {
        return (
            <h1>Hello</h1>
        );
    }

}

export default createContainer( () => {
    Meteor.subscribe('papers_submit');

    return { papers: papers_submit.find({}).fetch()};
}, OneView);
