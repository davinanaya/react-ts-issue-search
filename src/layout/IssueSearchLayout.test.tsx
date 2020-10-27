import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import IssueSearchLayout from './IssueSearchLayout';
import * as request from '../services';

describe('<IssueSearchLayout />', () => {
    let setup;
    let mockApi;

    beforeEach(() => {
        mockApi = jest.spyOn(request, 'getIssues'); // spy on the default export of config
        mockApi.mockImplementation(() => Promise.resolve([{
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
        }]));

        setup = () => {
            const utils = render(<IssueSearchLayout />);
            const input = utils.getByPlaceholderText('Type to search') as HTMLInputElement;
            // trigger the input search
            fireEvent.change(input, { target: { value: 'clarify ssr' } })
            return {
                input,
                ...utils,
            }
        }
    });

    it('should render the list of issues', async () => {
        const { container } = setup();
        // wait for the mock api to update the states of the component 
        await waitFor(() => expect(mockApi).toHaveBeenCalledTimes(1))
        const issues = container.getElementsByClassName('list-group-item-action') as HTMLCollection;
        const link = issues[0].querySelector('a') as HTMLAnchorElement;
        const span = issues[0].querySelector('span') as HTMLSpanElement;

        expect(issues.length).toEqual(2);
        expect(link.text).toBe('Test issue title');
        expect(link.href).toContain('link-issue.com');
        expect(span.textContent).toBe('Type: discussion');
    });

    it('should set class active on issue item', async () => {
        const { input, container } = setup();
        // wait for the mock api to update the states of the component 
        await waitFor(() => expect(mockApi).toHaveBeenCalledTimes(1))
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' })
        const issues = container.getElementsByClassName('list-group-item-action') as HTMLCollection;

        // check the first item has the class issue-selected 
        expect(issues[0].classList.contains('issue-selected')).toBe(true)
        expect(issues[1].classList.contains('issue-selected')).toBe(false)

        // check the second item has the class issue-selected 
        fireEvent.keyDown(input, { key: 'ArrowDown', code: 'ArrowDown' })
        expect(issues[0].classList.contains('issue-selected')).toBe(false)
        expect(issues[1].classList.contains('issue-selected')).toBe(true)
    });
});
