import { Collection,type BaseItem } from '@signaldb/core'
import createIndexedDBAdapter from './createIndexedDBAdapter';

async function waitForPersistence(collection: Collection<any>, timeout?: number) : Promise<number | undefined>
{
  return new Promise((resolve, reject) => {
    const timeoutId = timeout && setTimeout(() => {
      reject(new Error('setup timeout'))
    }, timeout);

    collection.once('persistence.init', () => {
      if (timeoutId)
      {
        clearTimeout(timeoutId)
      }
      resolve(timeoutId)
    })
  })
}

export default async function createCollection<T extends BaseItem>(name: string)
{
  const collection = new Collection<T>({
    persistence: createIndexedDBAdapter(name)
  });
  await waitForPersistence(collection);
  return collection;
}