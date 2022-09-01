import Comment from "../../models/Comment";

export type ICommentCreation = Omit<Comment, "id">;

export type ICommentID = {
    comment_id: string;
}

export type ICommentUpdate = {
    id : string;
    description : string;
}
