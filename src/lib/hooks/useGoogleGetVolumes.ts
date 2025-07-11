import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/reduxStore';
import { getGoogleBooksVolumes } from '@/lib/ApiHelpers/getGoogleBooksVolumes';

export function useGoogleGetVolumes(searchTerm: string, maxResults: number = 10) {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0); 
  const [books, setBooks] = useState<any[]>([]);
   
  const {homeCurrentPagination:startIndex} = useSelector((state:RootState)=> state.bookStore);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const { data, error } = await getGoogleBooksVolumes('/volumes', searchTerm, maxResults, (startIndex-1)*maxResults);
      if (error) {
        setError(error);
      } else if (searchTerm !=='' && data) {
        setTotalItems(data?.totalItems || 0)
        setBooks(data?.items || []);
      }
      setIsLoading(false);
    };

    if (searchTerm !=='') {
      fetchBooks();
    }
  }, [searchTerm, maxResults, startIndex]);

  return { books, totalItems, isLoading, error };
}
