import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator((name) => `ayanami_${name}`);
export const postStatus = pgEnum('status', ['published', 'draft']);
export const imageType = pgEnum('image_type', ['post', 'avatar']);

// 文章表
export const posts = createTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  status: postStatus('status').default('draft').notNull(),
  createdTime: timestamp('created_time'),
  updateTime: timestamp('update_time'),
  categoriesId: varchar('resource_id', { length: 255 })
    .notNull()
    .references(() => categories.id),
});

// 分类表
export const categories = createTable('categories', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdTime: timestamp('created_time'),
  updateTime: timestamp('update_time'),
});

export type postsInsert = typeof posts.$inferInsert;
export const post2Categories = relations(categories, ({ many }) => ({
  posts: many(posts),
}));

// 标签表
export const tags = createTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar('name', { length: 50 }).notNull().unique(),
  createdTime: timestamp('created_time'),
  updateTime: timestamp('update_time'),
});

// 文章标签关联表 (多对多关系)
export const post2Tags = createTable(
  'post_tags',
  {
    postId: varchar('post_id').references(() => posts.id),
    tagId: varchar('tag_id').references(() => tags.id),
  },
  (table) => ({
    pk: uniqueIndex('post_tag_pk').on(table.postId, table.tagId),
  }),
);

// 7. 图片表
export const images = createTable('images', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  url: varchar('url', { length: 255 }).notNull(),
  compressedUrl: varchar('compressed_url', { length: 255 }),
  thumbnailUrl: varchar('thumbnail_url', { length: 255 }),
  postId: varchar('post_id').references(() => posts.id),
  imageType: imageType('image_type').default('post').notNull(),
  createdTime: timestamp('created_time'),
  updateTime: timestamp('update_time'),
});

export const post2Image = relations(posts, ({ many }) => ({
  images: many(images),
}));
