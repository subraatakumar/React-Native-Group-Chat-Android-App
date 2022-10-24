export type SingleChatMessageType = {
  docId: string | number; // document id from Firestore
  text: string;
  createdAt: any;
  sentId: string;
  receivedId: string;
  groupId: string | null;
  likes: string[] | null; // use the ids of users who liked this
};

export type FireStoreSingleChatMessageType = {
  text: string;
  createdAt: any;
  sentId: string;
  receivedId: string;
  groupId: string | null;
  likes: string[] | null; // use the ids of users who liked this
};

export type SingleUserType = {
  uid: string;
  name: string;
  email: string | null;
  isGroup: boolean;
  members: string | null;
  adminId: string | null;
  createdAt: number | null;
};
