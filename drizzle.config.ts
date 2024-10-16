import { type Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  tablesFilter: ['guide_*'],
} satisfies Config;
