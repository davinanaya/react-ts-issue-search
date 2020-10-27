export interface IIssues {
    id: number;
    title: string;
    state: string;
    url: string;
    labels: IIssueLabel[];
    comments: number;
    comments_url: string;
}

export interface IIssueLabel {
    id: number;
    name: string;
    url: string;
    color: string;
}
