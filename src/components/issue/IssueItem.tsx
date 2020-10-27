import React, { useMemo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { IIssues, IIssueLabel } from '../../interfaces';
import Label from './label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'

interface IPropsIssue {
  data: IIssues;
  selected: boolean;
}

const IssueItem =
  ({ data: { title, labels = [], url, comments, comments_url}, selected }: IPropsIssue):JSX.Element => {
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
        <div className='d-flex'>
          <div className='col-11'>
            <a href={url} className="issue-title">
              {title}
            </a>
            {labelItems}
          </div>
          <div className='col-1 text-center'>
            <a href={comments_url} rel="noreferrer" target='_blank'>
              <FontAwesomeIcon icon={faCommentAlt}/>
              <span className="text-bold">{comments}</span>
            </a>
          </div>
        </div>
      </ListGroup.Item>
    );
};

export default IssueItem;
