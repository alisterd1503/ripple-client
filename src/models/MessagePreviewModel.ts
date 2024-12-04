export interface MessagePreviewModel {
    message: string;
    username: string;
    isGroupChat: boolean;
    isImage: boolean;
    hasRead?: boolean;
  }