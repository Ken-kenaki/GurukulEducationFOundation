// src/app/admin/gallery/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSessionClient } from "@/lib/server/appwrite";
import { Plus, Edit, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { ID, Models } from "appwrite";

interface GalleryItem extends Models.Document {
  title: string;
  imageId: string;
  description?: string;
  category: string;
  tags: string[];
  userId: string;
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    title: "",
    description: "",
    category: "",
    tags: [],
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function initialize() {
      try {
        await fetchGalleryItems();
      } catch (err) {
        setError("Failed to load gallery items");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    initialize();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      console.log("Starting gallery items fetch...");
      const response = await fetch("/api/gallery");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received gallery items:", data);
      setGalleryItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Full fetch error:", err);
      setError(
        "Failed to fetch gallery items. Please check console for details."
      );
      setGalleryItems([]);
    }
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return null;

    try {
      const { storage } = await createSessionClient();
      const fileId = ID.unique();

      const uploadedFile = await storage.createFile(
        "gallery-media",
        fileId,
        fileToUpload
      );

      return uploadedFile.$id;
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
      return null;
    }
  };

  const handleCreateItem = async () => {
    if (!newItem.title || !fileToUpload) return;

    try {
      setIsSubmitting(true);
      const imageId = await handleFileUpload();
      if (!imageId) return;

      const { databases } = await createSessionClient();

      const createdItem = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "gallery",
        ID.unique(),
        {
          ...newItem,
          imageId,
        }
      );

      setGalleryItems([...galleryItems, createdItem as GalleryItem]);
      resetModal();
      await fetchGalleryItems(); // Refresh the list
    } catch (err) {
      setError("Failed to create gallery item");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateItem = async () => {
    if (!editingId || !newItem.title) return;

    try {
      setIsSubmitting(true);
      const { databases, storage } = await createSessionClient();
      let imageId = galleryItems.find(
        (item) => item.$id === editingId
      )?.imageId;

      if (fileToUpload) {
        if (imageId) {
          await storage.deleteFile("gallery-media", imageId);
        }
        imageId = await handleFileUpload();
        if (!imageId) return;
      }

      const updatedItem = await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "gallery",
        editingId,
        {
          ...newItem,
          imageId: imageId || undefined,
        }
      );

      setGalleryItems(
        galleryItems.map((item) =>
          item.$id === editingId ? (updatedItem as GalleryItem) : item
        )
      );
      resetModal();
      await fetchGalleryItems(); // Refresh the list
    } catch (err) {
      setError("Failed to update gallery item");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id: string, imageId: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { databases, storage } = await createSessionClient();

      await storage.deleteFile("gallery-media", imageId);

      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        "gallery",
        id
      );

      setGalleryItems(galleryItems.filter((item) => item.$id !== id));
    } catch (err) {
      setError("Failed to delete gallery item");
      console.error(err);
    }
  };

  const startEditing = (item: GalleryItem) => {
    setEditingId(item.$id);
    setNewItem({
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags || [],
    });
    setIsModalOpen(true);
  };

  const addTag = () => {
    if (newTag && !newItem.tags?.includes(newTag)) {
      setNewItem({
        ...newItem,
        tags: [...(newItem.tags || []), newTag],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewItem({
      ...newItem,
      tags: newItem.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewItem({ title: "", description: "", category: "", tags: [] });
    setFileToUpload(null);
  };

  const getImageUrl = (imageId: string) => {
    if (!imageId) return "/placeholder-image.jpg";
    return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/gallery-media/files/${imageId}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&width=500&height=300`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setNewItem({
              title: "",
              description: "",
              category: "",
              tags: [],
            });
            setFileToUpload(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Upload size={18} />
          Upload Images
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {galleryItems.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No gallery items
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by uploading a new image.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.$id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <img
                  src={getImageUrl(item.imageId)}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(item)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.$id, item.imageId)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Gallery Item" : "Upload New Image"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newItem.title || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newItem.description || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={newItem.category || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setFileToUpload(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                  required={!editingId}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <div className="flex mt-1">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="block w-full rounded-l-md border-gray-300 shadow-sm"
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newItem.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={resetModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={editingId ? handleUpdateItem : handleCreateItem}
                disabled={
                  isSubmitting ||
                  !newItem.title ||
                  !newItem.category ||
                  (!fileToUpload && !editingId)
                }
                className={`px-4 py-2 rounded-md text-white ${
                  isSubmitting ||
                  !newItem.title ||
                  !newItem.category ||
                  (!fileToUpload && !editingId)
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {editingId ? "Updating..." : "Uploading..."}
                  </span>
                ) : editingId ? (
                  "Update"
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
