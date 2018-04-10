import React from 'react';
import BookRow from './BookRow';
import SearchButton from './SearchButton';
import PropTypes from 'prop-types';

const CurrentBookCollectionView = ({ returnMyReadsProps, ...routeProps }) => (
  <div>
    <BookRow {...returnMyReadsProps('Currently Reading', routeProps)} />
    <BookRow {...returnMyReadsProps('Want To Read', routeProps)} />
    <BookRow {...returnMyReadsProps('Read', routeProps)} />
    <SearchButton {...routeProps} />
  </div>
);

CurrentBookCollectionView.propTypes = {
  returnMyReadsProps: PropTypes.func.isRequired
};

export default CurrentBookCollectionView;
