import { IClassList } from '@/domain/Class/models/class';

interface IAccount {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: null;
  role: 'USER' | 'ADMIN' | 'SUPERUSER';
  classList: IClassList[];
}

export { type IAccount };
