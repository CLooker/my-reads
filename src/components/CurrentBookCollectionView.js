import React, { Component } from 'react';
import BookRow from './BookRow';
import SearchButton from './SearchButton';

export default class CurrentBookCollectionView extends Component {
  render() {
    const { returnMyReadsProps, ...routeProps } = this.props;
    return (
      <div>
        <BookRow {...returnMyReadsProps('Currently Reading', routeProps)} />
        <BookRow {...returnMyReadsProps('Want To Read', routeProps)} />
        <BookRow {...returnMyReadsProps('Read', routeProps)} />
        <SearchButton {...routeProps} />
      </div>
    );
  }
}
