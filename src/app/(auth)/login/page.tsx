
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LoginForm from '@/app/_Components/Forms/loginForm/LoginForm';
import { Stack } from '@mui/material';
import Image from 'next/image';

export default async function login() {


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
                            display:'flex',
                            flexDirection:'row',
                            flexWrap:'wrap',
                            justifyContent:'space-between',
                        }}>
                            <Link  href={'/register'}>Don&apos;t have any account?   
                                <span  className=''>Register?</span>
                            </Link>

                            <Link  href={'/forget-password'}>Forget Your Password?</Link>
                        </Stack>
                      

                        <LoginForm />

                    </div>

                    <div className="col-span-12 md:col-span-5 ">
                        <div className="col-span-12 md:col-span-5 relative w-full h-screen md:h-full">
                                          <Image
                                              src="/images/login.jpg"
                                              alt="bookshelfs with books on it" 
                                              fill
                                              className="object-cover"
                                              priority
                                              sizes="(max-width: 768px) 100vw, 40vw"
                                          />
                        </div>
                        {/* <img className='w-full h-full object-cover' src="/images/login.jpg" alt="bookshelfs with books on it" /> */}
                    </div>

            </div>
     </>
    );
  }
  