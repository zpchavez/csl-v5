export type LinkEntity = {
  resource_id: number;
  title_id: number;
  resource_title: string;
  cover: string;
  relation: "website about" | "book about" | "book of";
  web_url: string;
  worldcat_url: string;
  amazon_url: string;
  misc_url: string;
  misc_text: string;
  description: string;
};
