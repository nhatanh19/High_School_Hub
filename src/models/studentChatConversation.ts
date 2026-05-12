export type ChatMessageType = 'text' | 'file' | 'image';

export type ChatFileAttachment = {
  type: 'pdf' | 'gdocs' | 'image';
  name: string;
  icon?: string;
};

export type ChatMessage = {
  id: string;
  type: ChatMessageType;
  content: string;
  isMine: boolean;
  timestamp?: string;
  attachment?: ChatFileAttachment;
  avatarInitial?: string;
  avatarTone?: 'teal' | 'blue' | 'pink' | 'gray';
};

export type ChatConversation = {
  id: string;
  title: string;
  subtitle?: string;
  messages: ChatMessage[];
  photos?: string[];
};
