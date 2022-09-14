import Ad from "../../models/Ad";

export type IAdCreation = Omit<Ad, "id" | "createdOn" | "comments">;
export type IAdShow = Omit<Ad, "id" | "createdOn">;
export type IAdUpdate = Omit<Ad, "createdOn" | "user" | "comments">;

export type IAdID = {
  ad_id: string;
};
