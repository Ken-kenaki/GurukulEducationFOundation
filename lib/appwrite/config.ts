// lib/appwrite/config.ts
export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  apiKey: process.env.NEXT_APPWRITE_KEY!,
  buckets: {
    gallery: process.env.NEXT_PUBLIC_APPWRITE_GALLERY_BUCKET!,
    news: process.env.NEXT_PUBLIC_APPWRITE_NEWS_BUCKET!,
  },
  collections: {
    stories: 'stories',
    gallery: 'gallery',
    forms: 'forms',
    newsEvents: 'news-events',
    countries: 'countries',
    universities: 'universities',
  }
};