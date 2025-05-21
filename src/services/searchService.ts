import { recipeApiClient } from '../api/recipeApiClient';
import { NaturalSearchRequest, MenuSearchRequest, IngredientsSearchRequest, SearchResponse } from '../types/searchTypes';
import { Recipe } from '../types/recipe';
import qs from 'qs'; // npm install qs 필요


export async function searchNaturalService(params: NaturalSearchRequest): Promise<SearchResponse | null> {
  try {
    const response = await recipeApiClient.get<SearchResponse>('/api/v1/search/natural', {
      params: params
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Natural search failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error during natural search:', error);
    return null;
  }
}

export async function searchMenuService(params: MenuSearchRequest): Promise<SearchResponse | null> {
    console.log("searchMenu....")
    console.log("params: ", params)
  try {
    const response = await recipeApiClient.get<SearchResponse>('/api/v1/search/menu', {
      params: params
    });
    console.log("data: ", response.data)
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Menu search failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error during menu search:', error);
    return null;
  }
}


export async function searchIngredientsService(
  params: IngredientsSearchRequest
): Promise<SearchResponse | null> {
  console.log("searchIngredients....")
  console.log("params: ", params)

  try {
    const response = await recipeApiClient.get<SearchResponse>(
      '/api/v1/search/ingredients',
      {
        params,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
        // => ingredients=value1&ingredients=value2&size=20
      }
    );

    console.log("data: ", response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Ingredients search failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error during ingredients search:', error);
    return null;
  }
}