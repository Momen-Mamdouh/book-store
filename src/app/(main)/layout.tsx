import Navbar from '@/app/_Components/NavBar/Navbar';
import Footer from '@/app/_Components/Footer/Footer';
import { createClient } from '@/utils/supabase/server';
import ReduxHydrator from '@/lib/redux/ReduxHydrator/ReduxHydrator';
import ErrorResponseComp from '@/app/_Components/ErrorResponseComp/ErrorResponseComp';

export default async function MainLayout({ children }: { children: React.ReactNode }) {

      const supabase = await createClient();
      const {data:userData, error} = await supabase.auth.getUser();
      const user = userData?.user ?? null;

  return (
      <>
      
        <Navbar />
          <ReduxHydrator user={user} />
            {error  && <ErrorResponseComp error={error?.message} />}
            {children}
        <Footer />
      </>
        
  
  );
}
 