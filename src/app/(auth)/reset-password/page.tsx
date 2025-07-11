
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ResetPasswordForm from '@/app/_Components/Forms/resetPasswordForm/resetPasswordForm';
import Image from 'next/image';

export default async function resetPassword() {


    return (
      <>
            <div className="grid grid-cols-12 h-screen md:overflow-hidden ">

                    <div className="col-span-12 md:col-span-7 main-secondary-color p-8 md:p-16">
                        <Typography
                            component={"h1"} 
                            variant='h4'
                        
                            >Welcome to Book Store
                        </Typography>
                        <Stack sx={{
                            mt:'1rem',
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap',
                            justifyContent:'center',
                        }}>
                            <Link  href={'/login'}>Login Page
                            </Link>

                        </Stack>
                      

                        <ResetPasswordForm />

                    </div>

                    <div className="col-span-12 md:col-span-5 ">
                        <div className="col-span-12 md:col-span-5 relative w-full h-screen md:h-full">
                                    <Image
                                        src="/images/forgetPassword.jpg"
                                        alt="Black Man with suit reading book in hall"
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                            </div>
                        {/* <img className='w-full h-full object-cover' src="/images/forgetPassword.jpg" alt="Black Man with suit reading book in hall" /> */}
                    </div>

            </div>
     </>
    );
  }
  