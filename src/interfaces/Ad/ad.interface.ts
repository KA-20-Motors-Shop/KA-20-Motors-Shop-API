import Ad from "../../models/Ad";

export type IAdCreation = Omit<Ad, "id">;
export type IAdList = Omit<Ad, "id" | "createdOn">;
