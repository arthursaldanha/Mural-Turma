import { IAccount } from '@/domain/Account/models/account';

export interface IResponseGetPost {
  totalPages: number;
  totalElements: number;
  number: number;
  sort: ISort;
  size: number;
  content: IPost[];
  numberOfElements: number;
  pageable: IPageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  deadline: Date;
  createdAt: Date;
  tag: ITag;
  user: IAccount;
  comments: number;
  favorite: boolean;
  class: string;
}

export interface ITag {
  id: number;
  description: string;
}

export interface IPageable {
  sort: ISort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
