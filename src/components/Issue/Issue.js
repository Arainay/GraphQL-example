import React from 'react';

const Issue = ({
  id,
  number,
  state,
  title,
  url,
  bodyHTML
}) => (
  <div className="issues__item issue">
    <div className="issue__title">
      <h3>
        <a href={url}>{title}</a>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }}/>
    </div>
  </div>
);

export default Issue;