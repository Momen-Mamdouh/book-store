
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import RegisterForm from '@/app/_Components/Forms/registerForm/registerForm';
import Image from 'next/image';

export default async function register() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      
      {/* Left: Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 bg-[#fef7ed] flex flex-col">
        <Typography component="h1" variant="h4">
          Welcome to Book Store
        </Typography>
        <Link href="/login" className="mb-4 text-xl" sx={{ fontSize: '1.25rem', mb: 2 }}>
          Already have an account?
        </Link>

        {/* Make form grow naturally */}
        <div className="flex-grow ">
          <RegisterForm />
        </div>
      </div>

      {/* Right: Image that grows with form */}
      <div className="w-full md:w-1/2">
          <div className="col-span-12 md:col-span-5 relative w-full h-screen md:h-full">
                  <Image
                      src="/images/register.jpg"
                      alt="Vintage Library"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                  />
            </div>
        {/* <img
          className="w-full h-full object-cover object-start "
          src="/images/register.jpg"
          alt="Vintage Library"
        /> */}
      </div>
    </div>
  );
}
