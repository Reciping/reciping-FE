import { recipeApiClient } from '../api/recipeApiClient'; // Assuming a new apiClient for chat
import { Recipe } from '../types/recipe'; // Reusing Recipe type for recommended recipes

interface AIRecommendationsResponse {
  recommendedRecipes: Recipe[];
  // Add other chat-related response properties if any
}

export const getChatRecommendations = async (): Promise<AIRecommendationsResponse> => {
  try {
    const { data } = await recipeApiClient.get<{
      recipes: Recipe[];
      page: number;
      totalPages: number;
    }>('/api/v1/recipes/recommend', { /* Add body content if needed */ });

    console.log(data)
    return {
      recommendedRecipes: data.recipes ?? [],
    };
  } catch (error) {
    console.error('Error fetching chat recommendations:', error);
    return { recommendedRecipes: [] }; 
  }
};
