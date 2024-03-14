import { createContext } from 'react';

export type UserType = {
  username: string;
  displayName: string;
  email?: string;
  bio?: string;
  avatar: string;
  backgroundImage?: string;
  settings?: {
    hideWhenMade?: boolean;
    hidePosts?: boolean;
  };
};

export type DispatchTypes = {
  type: string;
  user?: UserType | null;
  token?: string | null;
  username?: string;
  mediaType?: string;
  mediaFile?: string | Blob;
  updateType?: any;
  params?: any;
  userName?: string;
  formData?: any;
  postID?: any;
};

export type UserAuth = {
  userToken: string | null;
  user: UserType | null;
  setData: (user?: UserType | null, token?: string | null) => void;
  dispatch: (action: DispatchTypes) => Promise<any>;
};

export const AuthContext = createContext<UserAuth | null>(null);
