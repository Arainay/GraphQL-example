import React from 'react';
import { Mutation } from 'react-apollo';

import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
  WATCH_REPOSITORY
} from './operations/mutations';
import { REPOSITORY_FRAGMENT } from './operations/fragments';

import { VIEWER_SUBSCRIPTIONS, STARS } from './constants';

const isWatch = viewerSubscription => viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const readFragment = (client, id, fragment) => client.readFragment({ id, fragment });

const writeFragment = (client, id, fragment, data) => {
  client.writeFragment({ id, fragment, data });
};

const updateStarCount = (client, mutationResult) => {
  const { ADD_STAR, REMOVE_STAR } = STARS;

  const mutationType = mutationResult.data.hasOwnProperty(ADD_STAR) ? ADD_STAR : REMOVE_STAR;
  const { data: { [mutationType]: { starrable: { id } } } } = mutationResult;

  const repository = readFragment(client, `Repository:${id}`, REPOSITORY_FRAGMENT);

  const { totalCount } = repository.stargazers;
  const stargazersTotalCount = mutationType === ADD_STAR ? totalCount + 1 : totalCount - 1;

  const data = {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount: stargazersTotalCount
    }
  };

  writeFragment(client, `Repository:${id}`, REPOSITORY_FRAGMENT, data);
};

const updateWatcherCount = (client, mutationResult) => {
  const { data: { updateSubscription: { subscribable: { id, viewerSubscription } } } } = mutationResult;
  const repository = readFragment(client, `Repository:${id}`, REPOSITORY_FRAGMENT);

  const { totalCount } = repository.watchers;
  const watchersTotalCount = isWatch(viewerSubscription) ? totalCount + 1 : totalCount - 1;

  const data = {
  ...repository,
      watchers: {
    ...repository.watchers,
        totalCount: watchersTotalCount
    }
  };

  writeFragment(client, `Repository:${id}`, REPOSITORY_FRAGMENT, data);
};

export const Repository = ({
  descriptionHTML,
  id,
  name,
  owner,
  primaryLanguage,
  stargazers,
  url,
  viewerHasStarred,
  viewerSubscription,
  watchers
}) => {
  return (
    <div className="repositories__item repository">
      <div className="repository__title">
        <h2>
          <a href={url}>{name}</a>
        </h2>
        <Mutation
          mutation={WATCH_REPOSITORY}
          variables={{
            id,
            viewerSubscription: isWatch(viewerSubscription)
              ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
              : VIEWER_SUBSCRIPTIONS.SUBSCRIBED
          }}
          update={updateWatcherCount}
        >
          {(updateSubscription, { data, loading, error }) => (
            <button
              type="button"
              onClick={updateSubscription}
            >
              {watchers.totalCount} {isWatch(viewerSubscription) ? 'Unwatch' : 'Watch'}
            </button>
          )}
        </Mutation>
        {!viewerHasStarred ? (
          <Mutation
            mutation={STAR_REPOSITORY}
            variables={{ id }}
            update={updateStarCount}
          >
            {(addStar, { data, loading, error }) => (
              <button
                type="button"
                onClick={addStar}
              >
                {stargazers.totalCount} Star
              </button>
            )}
          </Mutation>
        ) : (
          <Mutation
            mutation={UNSTAR_REPOSITORY}
            variables={{ id }}
            update={updateStarCount}
          >
            {(removeStar, { data, loading, error }) => (
              <button
                type="button"
                onClick={removeStar}
              >
                {stargazers.totalCount} Star
              </button>
            )}
          </Mutation>
        )}
      </div>
      <div className="repository__description">
        <div className="repository__description-info"
             dangerouslySetInnerHTML={{ __html: descriptionHTML }}/>
        <div className="repository__description-details">
          <div className="repository__description-details-item">
            {primaryLanguage && (
              <span>Language: {primaryLanguage.name}</span>
            )}
          </div>
          <div className="repository__description-details-item">
            {owner && (
              <span>Owner: <a href={owner.url}>{owner.login}</a></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};