import React, { useState } from 'react';

import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputRequest, setInputRequest] = useState('');

  const onInputSubmit = inputQuery => {
    const normalizedInputRequest = inputQuery.trim().toLowerCase();

    if (!normalizedInputRequest || inputRequest === normalizedInputRequest) {
      return;
    }

    // console.log(normalizedInputRequest);

    setCurrentPage(1);
    setInputRequest(normalizedInputRequest);
  };

  const onLoadMoreClick = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={onInputSubmit} />

      <ImageGallery
        currentPage={currentPage}
        inputRequest={inputRequest}
        onLoadMore={onLoadMoreClick}
      />

      {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Hello, this is content</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Exercitationem, aliquid? Sapiente nisi minima ab. Unde consequatur
              quia id nihil distinctio.
            </p>
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </Modal>
        )} */}
    </div>
  );
};
