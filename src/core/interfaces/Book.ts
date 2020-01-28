import { ISODate } from '@app/core';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string[];
  year: string;
  publisher: string;
  language: string;
  pages: number;
  fileInfo: string;
  downloadUrl: string;
  referer: string;
  coverUrl: string;
  downloadCount: number;
  createdBy?: string;
  createdAt?: ISODate;
  lastModifiedBy?: string;
  lastModifiedAt?: ISODate;
}
