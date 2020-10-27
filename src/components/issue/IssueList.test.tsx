import React from 'react';
import { render } from '@testing-library/react';
import { IssueList } from './IssueList';

describe('<IssueList />', () => {
    let setup;

    beforeEach(() => {
        setup = () => {
            const items = [
                {
                    id: 1,
                    labels: [{ id: 1, name: 'Type: discussion', color: '#d4d4d4', url: 'link-issue-label.com' }],
                    state: 'test1',
                    title: 'Test issue title',
                    url: 'link-issue.com'
                },
                {
                    id: 2,
                    labels: [{ id: 2, name: 'Type: Bug', color: '#b60205', url: 'link-issue2-label.com' }],
                    state: 'test2',
                    title: 'Test issue title2',
                    url: 'link-issue2.com'
                }
            ]

            const utils = render(<IssueList
                items={items}
                selectedIndex={1}
            />,
            );

            return {
                ...utils,
            }
        }
    })

    it('should validate the second item of the list issues', () => {
        const { container } = setup()
        const items = container.getElementsByClassName('list-group-item') as HTMLCollection;
        const link = items[1].querySelector('a') as HTMLAnchorElement;
        const span = items[1].querySelector('span') as HTMLSpanElement;

        expect(link.text).toBe('Test issue title2');
        expect(link.href).toContain('link-issue2.com');
        expect(span.textContent).toBe('Type: Bug');
    });
});
