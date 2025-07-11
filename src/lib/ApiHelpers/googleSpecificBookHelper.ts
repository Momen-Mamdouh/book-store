
import booksApiClient from '@/lib/ApiClients/googleBooksAPIClient';
import { AxiosError } from 'axios'

const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function getGoogleSpecificBookVolume(url:string) {
  try {
    const response = await booksApiClient.get(url,{
      params: {
        key: API_KEY, 
      },
    })
    return { data: response.data , error: null, success:true }
  } catch (error: unknown) {
     if (error instanceof AxiosError) {
        const message = error.response?.data?.error?.message 
                    || error.message 
                    || 'Failed to get book data from Google Books';
        return { data: null, error: message };
      }
      const message = error instanceof Error 
                    ? error.message 
                    : 'Unknown error occurred';
      return { data: null, error: message };
    }

}

