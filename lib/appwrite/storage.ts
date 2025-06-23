// lib/appwrite/storage.ts
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "./config";
import { ID } from "node-appwrite";

export class StorageService {
  private static async getClient() {
    return await createAdminClient();
  }

  static async uploadFile(bucketId: string, file: File) {
    const { storage } = await this.getClient();
    const fileId = ID.unique();
    
    return await storage.createFile(bucketId, fileId, file);
  }

  static async deleteFile(bucketId: string, fileId: string) {
    const { storage } = await this.getClient();
    return await storage.deleteFile(bucketId, fileId);
  }

  static getFilePreview(bucketId: string, fileId: string, width = 500, height = 300) {
    return `${appwriteConfig.endpoint}/storage/buckets/${bucketId}/files/${fileId}/preview?project=${appwriteConfig.projectId}&width=${width}&height=${height}`;
  }

  static getFileView(bucketId: string, fileId: string) {
    return `${appwriteConfig.endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${appwriteConfig.projectId}`;
  }
}