
import booksApiClient from '@/lib/ApiClients/googleBooksAPIClient';
import { AxiosError } from 'axios'

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function getGoogleBooksVolumes(url:string, query:string, 
          maxResults:number, startIndex:number = 0, orderBy:string = "newest") {
  try {
    const response = await booksApiClient.get(url,{
      params: {
        q: query,
        key: API_KEY, 
        maxResults,
        startIndex,
        orderBy,
      },
    })

    return { data: response.data , error: null, success:true }
  } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.error?.message 
                    || error.message 
                    || 'Failed to get data from Google Books';
        return { data: null, error: message };
      }
      const message = error instanceof Error 
                    ? error.message 
                    : 'Unknown error occurred';
      return { data: null, error: message };
    }
    
}

