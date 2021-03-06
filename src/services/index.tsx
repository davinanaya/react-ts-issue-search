import { IIssues } from '../interfaces';

export const getIssues = async (query: any): Promise<IIssues[]> => {
    try {
        const response = await fetch(
            `https://api.github.com/search/issues?q=repo:facebook/react+${query}`,
            {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
            },
        );

        if (response.ok) {
            const data = await response.json();
            return data.items;
        }

        throw Error(response.statusText);
    } catch (error) {
        throw Error(error.message);
    }
};
