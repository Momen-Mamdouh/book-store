import { useEffect, useState } from 'react';
import { getGoogleSpecificBookVolume } from '@/lib/ApiHelpers/googleSpecificBookHelper';
import { IBookDetails } from '@/app/_Interfaces/IBookDetails';




export function useGoogleSpecificBook(book_id: string) {
  const [book, setBook] = useState<IBookDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
  const fetchSpecificBook = async () => {
    setIsLoading(true);

    const { data, error } = await getGoogleSpecificBookVolume(`/volumes/${book_id}`);
    
    if (error) {
      setError(error);
    } else {
      setBook(data); 
    }

    setIsLoading(false);
  };

  if (book_id) {
    fetchSpecificBook();
  }
}, [book_id]);


  return { book, isLoading, error };
}
