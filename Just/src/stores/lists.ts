import { taskListsCollection, tasksCollection } from '.'
import { type TaskList } from '@/models'

/**
 * Stores a new task list
 * @param name The name of the list
 * @returns The newly created task list
 */
export async function add(name: string): Promise<TaskList>
{
  const modelBefore: TaskList | undefined = await taskListsCollection.find(undefined, {
    limit: 1,
    sort: {
      sort: -1
    },
  }).fetch().pop();

  const sort: number = (modelBefore?.sort ?? 0) + 1;
  const date: number = Date.now();

  return await taskListsCollection.insert({
    name,
    sort,
    createdAt: date,
    lastModifiedAt: date
  });
}


/**
 * Stores updated properties of a list
 * (only name + sort get updated)
 * @param model The existing list
 * @returns The updated task list
 */
export async function update(model: TaskList): Promise<TaskList>
{
  const lastModifiedAt = Date.now();

  let updated: boolean = (await taskListsCollection.updateOne({ id: model.id }, {
    $set: {
      lastModifiedAt,
      name: model.name,
      sort: model.sort
    }
  })) === 1;

  if (updated)
  {
    model.lastModifiedAt = lastModifiedAt;
  }

  return model;
}


/**
 * Try to get a single task list from the store
 * @param id Id of the list
 * @returns The task list, if found
 */
export async function get(id: string): Promise<TaskList | undefined>
{
  return await taskListsCollection.findOne({ id });
}


/**
 * Get all task lists from the store
 * @returns Alle stored task lists
 */
export async function getAll(): Promise<TaskList[]>
{
  return await taskListsCollection.find(undefined, {
    sort: {
      sort: 1
    }
  }).fetch();
}


/**
 * Tries to remove a task list by id.
 * This also removes all associated tasks.
 * @param id Id of the list
 */
export async function remove(id: string): Promise<void>
{
  await taskListsCollection.removeOne({ id });
  await tasksCollection.removeMany({ listId: id });
}