export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface TokenPayload {
  id?: string;
  username?: string;
}

export interface Content {
  title: string;
  content: string;
  link: string;
  tags?: string;
  type?: string;
  isPublic?: boolean;
  userId: string;
}

export interface Link {
  hash: string;
  userId: string;
}
export type contentUpdate = Omit<Partial<Content>, 'userId'>;
export type linkUpdate = Omit<Partial<Link>, 'userId'>;
export type detailType = number | object | undefined | string | unknown;

export interface Settings {
  deactiveAccount?: boolean;
  deleteLinks?: boolean;
  language?: string;
  grantPersonalData?: boolean;
  userId: string;
}
