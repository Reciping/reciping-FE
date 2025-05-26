import { recipeApiClient } from '../api/recipeApiClient'; // Assuming a new apiClient for chat
import { Recipe } from '../types/recipe'; // Reusing Recipe type for recommended recipes

interface ChatRecommendationsResponse {
  recommendedRecipes: Recipe[];
  // Add other chat-related response properties if any
}

export const getChatRecommendations = async (): Promise<ChatRecommendationsResponse> => {
  try {
    // Assuming the chat API returns an object with recommendedRecipeList
    const { data } = await recipeApiClient.post<{
      recommendedRecipeList?: Recipe[];
      // Add other raw chat response properties
    }>('/api/v1/chat', { /* Add body content if needed */ }); // TODO: Add actual request body if required by chat API

    return {
      recommendedRecipes: data.recommendedRecipeList ?? [],
      // Map other properties as needed
    };
  } catch (error) {
    console.error('Error fetching chat recommendations:', error);
    // Handle error appropriately, maybe return a default structure or throw
    return { recommendedRecipes: [] }; // Return empty array on error
  }
};
