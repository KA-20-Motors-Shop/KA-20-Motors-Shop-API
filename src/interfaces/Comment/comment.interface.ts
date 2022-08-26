import Comment from "../../models/Comment";

export type ICommentCreation = Omit<Comment, "id" | "createdOn">;
