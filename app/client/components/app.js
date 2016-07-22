import React from 'react';
import Header from'./header';
import PaperSubmit from './paper_submit';
import MySubmissions from './my-papers';
import MyReviews from './my-reviews';

export default (props) => {
  return (
    <div>
      <Header />
      <PaperSubmit />
      <MySubmissions />
      <MyReviews />
     </div>
  );
}
