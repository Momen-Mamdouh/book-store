
import booksApiClient from '@/lib/ApiClients/googleBooksAPIClient';


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
  } catch (error: any) {
    const message = error.response?.data?.error?.message || error.message || 'Failed to get data from Google Books'
    return { data: null, error: message }
  }
}
