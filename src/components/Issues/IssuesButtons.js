import React from 'react';

import { ISSUE_STATES } from './constants';

const IssuesButtons = ({ onClick, issueState }) => (
  <div className="buttons">
    <button
      type="button"
      onClick={onClick(ISSUE_STATES.NONE)}
      disabled={ISSUE_STATES.NONE === issueState}
    >
      {ISSUE_STATES.NONE}
    </button>
    <button
      type="button"
      onClick={onClick(ISSUE_STATES.OPEN)}
      disabled={ISSUE_STATES.OPEN === issueState}
    >
      {ISSUE_STATES.OPEN}
    </button>
    <button
      type="button"
      onClick={onClick(ISSUE_STATES.CLOSED)}
      disabled={ISSUE_STATES.CLOSED === issueState}
    >
      {ISSUE_STATES.CLOSED}
    </button>
  </div>
);

export default IssuesButtons;