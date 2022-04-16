export interface IComment {
    commentId: number,
    message: string,
    user: string,
    created: string,
    canDelete: boolean,
    canApprove: boolean
}
