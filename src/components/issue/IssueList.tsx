import React, { useMemo } from 'react';

import IssueItem from './IssueItem';
import { IIssues } from '../../interfaces';

import './issue.style.scss';
import { ListGroup } from 'react-bootstrap';

const IssueList = ({ items, selectedIndex, ...props }: { items: IIssues[], selectedIndex: number }): JSX.Element => {
  const issueItems = useMemo(
    () =>
      items.map(({ id, ...values }: IIssues, idx: number) => (
        <IssueItem
          key={id}
          data={{id, ...values}}
          selected={selectedIndex === idx}
        />
      )),
    [items, selectedIndex],
  );

  return (
    <div className="issue-list" {...props}>
      <ListGroup>{issueItems}</ListGroup>
    </div>
  );
};

export { IssueList };
