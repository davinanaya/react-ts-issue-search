export interface IIssues {
    id: number;
    title: string;
    state: string;
    url: string;
    labels: IIssueLabel[];
}

export interface IIssueLabel {
    id: number;
    name: string;
    url: string;
    color: string;
}
