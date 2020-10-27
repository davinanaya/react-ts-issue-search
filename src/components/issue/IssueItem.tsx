import React, { useMemo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { IIssueLabel } from '../../interfaces';
import Label from './label';

interface IPropsIssue {
  title: string;
  url: string;
  labels: IIssueLabel[];
  selected: boolean;
}

const IssueItem = ({ title, labels = [], url, selected }: IPropsIssue): JSX.Element => {
  const isSelected = selected ? 'issue-selected' : '';

  const labelItems = useMemo(
    () =>
      labels.map(({ id, name, color }: Omit<IIssueLabel, 'url'>) => (
        <Label key={id} color={color}>
          {name}
        </Label>
      )),
    [labels],
  );

  return (
    <ListGroup.Item className={`list-group-item-action ${isSelected}`}>
      <a href={url} className="issue-title">
        {title}
      </a>
      {labelItems}
    </ListGroup.Item>
  );
};

export default IssueItem;
