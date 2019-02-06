import React from 'react';

import Loading from '../Loading';

const FetchMore = ({
  hasNextPage,
  fetchMore,
  variables,
  updateQuery,
  loading,
  children
}) => {
  if (!hasNextPage) {
    return null;
  }

  if (loading) {
    return <Loading/>
  }

  const handleClick = () => {
    fetchMore({
      variables,
      updateQuery
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default FetchMore;