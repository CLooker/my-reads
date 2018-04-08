import React from 'react';
import BookRow from './BookRow';
import SearchButton from './SearchButton';

const CurrentBookCollectionView = ({ returnMyReadsProps, ...routeProps }) => (
  <div>
    <BookRow {...returnMyReadsProps('Currently Reading', routeProps)} />
    <BookRow {...returnMyReadsProps('Want To Read', routeProps)} />
    <BookRow {...returnMyReadsProps('Read', routeProps)} />
    <SearchButton {...routeProps} />
  </div>
);

export default CurrentBookCollectionView;
