import { type Task, type TaskList } from '@/models';
import createCollection from './createCollection.ts'

export const taskListsCollection = await createCollection<TaskList>('taskLists');
export const tasksCollection = await createCollection<Task>('tasks');

export * as tasks from './tasks.ts';
export * as taskLists from './lists.ts';