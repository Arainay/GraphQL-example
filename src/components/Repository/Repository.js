import React from 'react';
import { Mutation } from 'react-apollo';

import Issues from '../Issues';

import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
  WATCH_REPOSITORY
} from '../Repositories/operations/mutations';
import { REPOSITORY_FRAGMENT } from './operations/fragments';

import { VIEWER_SUBSCRIPTIONS, STARS } from './constants';

const isWatch = viewerSubscription => viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const readFragment = (cache, id, fragment) => cache.readFragment({ id, fragment });

const writeFragment = (cache, id, fragment, data) => {
  cache.writeFragment({ id, fragment, data });
};

const updateStarCount = (cache, mutationResult) => {
  const { ADD_STAR, REMOVE_STAR } = STARS;

  const mutationType = mutationResult.data.hasOwnProperty(ADD_STAR) ? ADD_STAR : REMOVE_STAR;
  const { data: { [mutationType]: { starrable: { id } } } } = mutationResult;

  const repository = readFragment(cache, `Repository:${id}`, REPOSITORY_FRAGMENT);

  const { totalCount } = repository.stargazers;
  const stargazersTotalCount = mutationType === ADD_STAR ? totalCount + 1 : totalCount - 1;

  const data = {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount: stargazersTotalCount
    }
  };

  writeFragment(cache, `Repository:${id}`, REPOSITORY_FRAGMENT, data);
};

const updateWatcherCount = (cache, mutationResult) => {
  const { data: { updateSubscription: { subscribable: { id, viewerSubscription } } } } = mutationResult;
  const repository = readFragment(cache, `Repository:${id}`, REPOSITORY_FRAGMENT);

  const { totalCount } = repository.watchers;
  const watchersTotalCount = isWatch(viewerSubscription) ? totalCount + 1 : totalCount - 1;

  const data = {
    ...repository,
    watchers: {
      ...repository.watchers,
      totalCount: watchersTotalCount
    }
  };

  writeFragment(cache, `Repository:${id}`, REPOSITORY_FRAGMENT, data);
};

const updateStarCountOptimisticResponse = (id, viewerHasStarred) => {
  return !viewerHasStarred ?
    {
      addStar: {
        __typename: 'Mutation',
        starrable: {
          __typename: 'Repository',
          id,
          viewerHasStarred
        }
      }
    } :
    {
      removeStar: {
        __typename: 'Mutation',
        starrable: {
          __typename: 'Repository',
          id,
          viewerHasStarred
        }
      }
    };
};

const Repository = ({
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
}) => (
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
        optimisticResponse={{
          updateSubscription: {
            __typename: 'Mutation',
            subscribable: {
              __typename: 'Repository',
              id,
              viewerSubscription: isWatch(viewerSubscription)
                ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                : VIEWER_SUBSCRIPTIONS.SUBSCRIBED
            }
          }
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
      <Mutation
        mutation={!viewerHasStarred ? STAR_REPOSITORY : UNSTAR_REPOSITORY}
        variables={{ id }}
        optimisticResponse={updateStarCountOptimisticResponse(id, viewerHasStarred)}
        update={updateStarCount}
      >
        {(updateStar, { data, loading, error }) => (
          <button
            type="button"
            onClick={updateStar}
          >
            {stargazers.totalCount} Star
          </button>
        )}
      </Mutation>
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
    <Issues repositoryOwner={owner.login} repositoryName={name}/>
  </div>
);

export default Repository;