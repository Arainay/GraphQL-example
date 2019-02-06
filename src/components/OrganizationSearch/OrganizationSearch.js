import React, { useRef } from 'react';

const OrganizationSearch = ({ organizationName, setOrganizationName }) => {
  const inputElem = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();

    setOrganizationName(inputElem.current.value);
  };

  return (
    <form className="navigation-search" onSubmit={handleSubmit}>
      <input type="text" ref={inputElem} defaultValue={organizationName}/>
      <button type="submit">Search</button>
    </form>
  );
};

export default OrganizationSearch;