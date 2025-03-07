import { type Entity } from './entity';

export type Task = {
  name: string,
  done: boolean,
  listId: string,
  dueAt?: Date,
  remindAt?: Date
} & Entity;