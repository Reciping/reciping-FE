import { commentApiClient } from '../api/commentApiClient';
import { CommentItem, CommentPage } from '../types/recipe'; // Import CommentItem and CommentPage types

interface CreateCommentPayload {
  recipeId: number;
  userId: number; // TODO: Replace with actual logged-in user ID
  content: string;
}

export const createComment = async (payload: CreateCommentPayload): Promise<boolean> => {
  try {
    const response = await commentApiClient.post('/api/v1/comments', payload);
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error('Error creating comment:', error);
    return false;
  }
};

// Function to fetch comments by recipe ID
export const getCommentsByRecipeId = async (
  recipeId: number,
  page: number = 0, // Default to 0-based page
  size: number = 100 // Default size
): Promise<CommentItem[]> => {
  try {
    const response = await commentApiClient.get<CommentPage>(
      `/api/v1/comments/recipe/${recipeId}`,
      {
        params: { page, size },
        // Add headers like X-USER-ID if required for fetching comments
        headers: {
          'X-USER-ID' : '1123' // TODO: Replace with actual logged-in user ID
        }
      }
    );
    return response.data.content; // Return the array of comments
  } catch (error) {
    console.error('Error fetching comments:', error);
    return []; // Return empty array on error
  }
}; 