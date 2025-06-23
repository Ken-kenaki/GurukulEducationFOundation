// lib/appwrite/database.ts
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "./config";
import { ID, Query } from "node-appwrite";

export interface Story {
  $id?: string;
  title: string;
  author: string;
  content: string;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsEvent {
  $id?: string;
  title: string;
  type: 'news' | 'event';
  content: string;
  date: string;
  status: 'draft' | 'published';
  imageId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormSubmission {
  $id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'responded';
  createdAt?: string;
}

export interface Country {
  $id?: string;
  name: string;
  flag: string;
  imageId?: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  createdAt?: string;
}

export interface University {
  $id?: string;
  name: string;
  country: string;
  imageId?: string;
  intake: string;
  programs: string;
  ranking: string;
  description?: string;
  createdAt?: string;
}

export class DatabaseService {
  private static async getClient() {
    return await createAdminClient();
  }

  // Stories CRUD
  static async createStory(data: Omit<Story, '$id' | 'createdAt' | 'updatedAt'>) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async getStories(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('createdAt')
      ]
    );
  }

  static async getStory(id: string) {
    const { databases } = await this.getClient();
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      id
    );
  }

  static async updateStory(id: string, data: Partial<Story>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      id,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async deleteStory(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      id
    );
  }

  // News & Events CRUD
  static async createNewsEvent(data: Omit<NewsEvent, '$id' | 'createdAt' | 'updatedAt'>) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async getNewsEvents(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('createdAt')
      ]
    );
  }

  static async updateNewsEvent(id: string, data: Partial<NewsEvent>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      id,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );
  }

  static async deleteNewsEvent(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.newsEvents,
      id
    );
  }

  // Form Submissions CRUD
  static async createFormSubmission(data: Omit<FormSubmission, '$id' | 'createdAt'>) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getFormSubmissions(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('createdAt')
      ]
    );
  }

  static async updateFormSubmission(id: string, data: Partial<FormSubmission>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      id,
      data
    );
  }

  static async deleteFormSubmission(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.forms,
      id
    );
  }

  // Countries CRUD
  static async createCountry(data: Omit<Country, '$id' | 'createdAt'>) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getCountries(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('createdAt')
      ]
    );
  }

  static async updateCountry(id: string, data: Partial<Country>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      id,
      data
    );
  }

  static async deleteCountry(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.countries,
      id
    );
  }

  // Universities CRUD
  static async createUniversity(data: Omit<University, '$id' | 'createdAt'>) {
    const { databases } = await this.getClient();
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
  }

  static async getUniversities(limit = 50, offset = 0) {
    const { databases } = await this.getClient();
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc('createdAt')
      ]
    );
  }

  static async updateUniversity(id: string, data: Partial<University>) {
    const { databases } = await this.getClient();
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      id,
      data
    );
  }

  static async deleteUniversity(id: string) {
    const { databases } = await this.getClient();
    return await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      id
    );
  }
}