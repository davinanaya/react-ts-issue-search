import * as request from './index';

describe('Service request', () => {
    const dataMock = [{
        id: 1,
        labels: [{ id: 1, name: 'Type: discussion', color: '#d4d4d4', url: 'link-issue-label.com' }],
        state: 'test1',
        title: 'Test issue title',
        url: 'link-issue.com',
        comments: 12,
        comments_url: 'link-issue-comment.com'
    },
    {
        id: 2,
        labels: [{ id: 2, name: 'Type: Bug', color: '#b60205', url: 'link-issue2-label.com' }],
        state: 'test2',
        title: 'Test issue title2',
        url: 'link-issue2.com',
        comments: 4,
        comments_url: 'link-issue2-comment.com'
    }];

    beforeEach(() => {
        global.fetch = jest.fn().mockImplementation(() => {
            return new Promise((resolve) =>
                resolve({
                    ok: true,
                    json: () => {
                        return { items: dataMock };
                    }
                })
            );
        });
    });

    it('Should respond successfully request Github', async () => {
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.resolve({
                ok: true,
                json: () => ({ items: dataMock })
            })
        );

        const result = await request.getIssues('test search');
        expect(result).toEqual(dataMock);
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.github.com/search/issues?q=repo:facebook/react+test search', {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
        });
    });

    it('Should throw an error', async () => {
        global.fetch = jest.fn().mockImplementation(() => 
            Promise.reject({ ok: false, message: 'Error fetching the data' })
        );

        try {
            await request.getIssues('test search');
        } catch (error) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual('Error fetching the data');
        }
    });
});