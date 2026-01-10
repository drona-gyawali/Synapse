export const ContentType = {
  YOUTUBE: 'youtube',
  X: 'x',
  PDF: 'pdf',
  GENERAL: 'general',
};

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

export const YTREGREX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/;
