import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState } from 'react';

import { OnSearchButton } from 'components/Button/Button';
import styles from './SearchForm.module.css';

export const SearchForm = ({ onSubmit }) => {
  const [inputRequest, setInputrequest] = useState('');

  const onInputUpdate = ({ target }) => {
    setInputrequest(target.value);
  };

  const onInputSubmit = event => {
    event.preventDefault();
    // console.log('searchform', inputRequest);
    onSubmit(inputRequest);
  };

  return (
    <form className={styles.searchForm} onSubmit={onInputSubmit}>
      <OnSearchButton />
      <input
        className={styles.searchInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={onInputUpdate}
        value={inputRequest}
      />
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
