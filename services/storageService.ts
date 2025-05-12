import { storage } from '@/config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const storageService = {
  /**
   * Upload an image to Firebase Storage
   * @param file The image file to upload
   * @param path The path where the image should be stored (e.g., 'hotels/hotel1.jpg')
   * @returns The download URL of the uploaded image
   */
  async uploadImage(file: File | Blob, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  },

  /**
   * Delete an image from Firebase Storage
   * @param path The path of the image to delete
   */
  async deleteImage(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
    }
  },

  /**
   * Generate a unique path for an image
   * @param type The type of listing (hotel, restaurant, etc.)
   * @param id The ID of the listing
   * @param fileName The original file name
   * @returns A unique path for the image
   */
  generateImagePath(type: string, id: string, fileName: string): string {
    const timestamp = Date.now();
    const extension = fileName.split('.').pop();
    return `${type}/${id}/${timestamp}.${extension}`;
  }
}; 