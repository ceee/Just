import { Collection } from '@signaldb/core'
import { type Post } from '@/models';
import createIndexedDBAdapter from './createIndexedDBAdapter';

const posts = new Collection<Post>({
  persistence: createIndexedDBAdapter('posts')
});

export {
  posts,
  createIndexedDBAdapter
}