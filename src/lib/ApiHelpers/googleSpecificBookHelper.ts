
import booksApiClient from '@/lib/ApiClients/googleBooksAPIClient';


const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export async function getGoogleSpecificBookVolume(url:string) {
  try {
    const response = await booksApiClient.get(url,{
      params: {
        key: API_KEY, 
      },
    })
    return { data: response.data , error: null, success:true }
  } catch (error: any) {
    const message = error.response?.data?.error?.message || error.message || 'Unknown error'
    return { data: null, error: message }
  }
}
