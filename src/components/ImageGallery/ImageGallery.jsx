// import { Component } from 'react';
import { useState, useEffect } from 'react';

import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { fetchData } from 'components/Utils/fetchApi';

import { ImageGalleryList } from './ImageGalleryList/ImageGalleryList';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';

Notify.init({
  distance: '20px',
  cssAnimationStyle: 'from-top',
  fontSize: '16px',
  timeout: 2000,
  backOverlay: true,
  clickToClose: true,
});

export const ImageGallery = ({ inputRequest, currentPage, onLoadMore }) => {
  const [status, setStatus] = useState('idle');
  const [galleryHits, setGalleryHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (status === 'idle') {
      return Notify.success('Please, fill your request!');
    }
  }, [status]);

  useEffect(() => {
    if (!inputRequest) return;

    setStatus('pending');

    fetchData(inputRequest, currentPage)
      .then(fetchImages => {
        if (fetchImages.hits.length === 0) {
          return setStatus('failed');
        }

        setGalleryHits(prevState =>
          currentPage === 1
            ? fetchImages.hits
            : [...prevState, ...fetchImages.hits]
        );

        setTotalHits(fetchImages.totalHits);
        setStatus('resolved');
      })
      .catch(() => setStatus('rejected'));
  }, [currentPage, inputRequest]);

  // if (status === 'idle') {
  //   // console.log('render');
  //   return Notify.success('Please, fill your request!');
  // }

  if (status === 'pending' && totalHits === 0) {
    // console.log('search');
    return <Loader />;
  }

  if (status === 'rejected') {
    return Notify.failure(
      'Sorry, something went wrong, please try again later!'
    );
  }

  if (status === 'failed') {
    console.log('failed');
    return Notify.failure('Sorry, we found no images(');
  }

  if (status === 'resolved' || (status === 'pending' && totalHits > 0)) {
    const remainedtotalHits = totalHits - currentPage * 12;

    return (
      <>
        <ImageGalleryList galleryHits={galleryHits} />
        {remainedtotalHits > 0 && (
          <LoadMoreButton onLoadMore={onLoadMore} status={status} />
        )}
      </>
    );
  }
};

ImageGallery.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  inputRequest: PropTypes.string.isRequired,
};
