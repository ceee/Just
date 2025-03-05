import { type Post } from '@/models';
import createCollection from '@/db/createCollection.ts'

export const posts = await createCollection<Post>('posts');