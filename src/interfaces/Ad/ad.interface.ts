import Ad from "../../models/Ad";

export type IAdCreation = Omit<Ad, "id">;
export type IAdShow = Omit<Ad, "id" | "createdOn">;
