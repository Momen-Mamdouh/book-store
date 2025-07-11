'use client'

import { useFormik } from 'formik';
import { useDialog } from '@/lib/hooks/useDialog';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';

import { LoginFormRules } from '@/lib/zodSchemas/validationLoginFormRules';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { createClient } from '@/utils/supabase/client';
import { useDismissableBlur } from '@/utils/formsLogic/useDismissableBlur';

import PasswordInput from '@/app/_Components/Forms/passwordInput/PasswordInput';
import ProviderBtn from '@/app/_Components/Forms/providerButton/providerBtn';
import MainButton from "@/app/_Components/MicroComps/MainButton/MainButton";
import FormError from '@/app/_Components/Forms/FormError/FormError';
import MuiMyFormTextField from '@/app/_Components/MicroComps/MuiMyFormTextField/MuiMyFormTextField';
import ResponseDialog from '@/app/_Components/Loaders/responseDialog/responseDialog';
import {  ILogin } from '@/app/_Interfaces/IForms';
import Image from 'next/image';


type MyFormValues = {
    email: string;
    password: string;
};




export default function LoginForm(){

    const supabase = createClient();

    const { dialogData, handleDialogClose, showDialog} = useDialog();


    const initialValues:ILogin = {
            email:'',
            password:'',
    };
    const loginFormikObj = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(LoginFormRules),
        onSubmit: (values, formikHelpers)=>{
            handleSubmitation(values, formikHelpers.setSubmitting); 
        }
    })

    const { handleBlur, dismissedErrors, setDismissedErrors } = 
    useDismissableBlur<typeof loginFormikObj.values>(loginFormikObj.handleBlur);

    async function handleSubmitation(formValues: ILogin, setSubmitting: (isSubmitting: boolean)=> void) {
            const { email, password } = formValues;

            try {
                const { error:signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) {
                    showDialog({
                        title: `${signInError.name}, Status: ${signInError.status}`,
                        message: signInError.message,
                        buttonText: "Try Again",
                        route: "login"
                    });
                    return;    
                }

                const { data: { user }, error: userError } = await supabase.auth.getUser();
                if (!user || userError) {
                    showDialog({
                        title: "User Fetch Failed",
                        message: userError?.message ?? "No user found",
                        buttonText: "Retry",
                        route: "login"
                    });
                    return;
                }

         


              if (user) {
                    const { data: existingUser, error: fetchError } = await supabase
                        .from('users')
                        .select('id')
                        .eq('email', email)
                        .maybeSingle();
 
                    if (!existingUser && !fetchError) {
                        await supabase.from('users').insert({
                        id: user.id,
                        user_id: user.id,
                        username: user.user_metadata?.full_name || user.email,
                        email: user.email,
                        avatar_url: user.user_metadata?.avatar_url,
                        created_at: new Date().toISOString(),
                        });
                    }
                    else{
                         await supabase.from('users')
                            .update( {
                                user_id:user.id,
                            })
                            .eq('email', email);
                          
                    }

                showDialog({
                    title: "Welcome to Book Store 😁",
                    message: "Login success",
                    buttonText: "Go to your Profile",
                    route: "profile"
                });
        }


               
               
            } catch (err) {
                showDialog({
                    title: "Unexpected error 🤨",
                    message: `${err}`,
                    buttonText: "Go to Login page",
                    route: "login"
                });
            }
             finally {
                setSubmitting(false);  
            }

    };

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo:`${window.location.origin}/auth/callback`,
                queryParams: {
                access_type: 'offline',
                prompt: 'consent',
                },
            },
        });

        if (error){
             showDialog({
                        title: `${error.name}, Status: ${error.status}`,
                        message: error.message,
                        buttonText: "Try Again",
                        route: "login"
                    });
                    return;   
        };

        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {

            const { data: existingUser, error: fetchError } = await supabase
                .from('users')
                .select('id')
                .eq('id', user.id)
                .maybeSingle();

            if (!existingUser && !fetchError) {
                await supabase.from('users').insert({
                id: user.id,
                user_id: user.id,
                username: user.user_metadata?.full_name || user.email,
                email: user.email,
                avatar_url: user.user_metadata?.avatar_url,
                created_at: new Date().toISOString(),
                });
            }
        }

    };


    return(
        <>
            <Box  component='form' onSubmit={loginFormikObj.handleSubmit}
                sx={{   
                    borderRadius:'5px', 
                    padding:'1rem 0.2rem 0rem',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    rowGap:'1rem'
                    }}>
                        

                <MuiMyFormTextField<MyFormValues>
                                id="email"
                                name="email"
                                label="Email"
                                formik={loginFormikObj}
                                handleBlur={handleBlur}
                                dismissedErrors={dismissedErrors as Record<keyof MyFormValues, boolean>}
                                setDismissedErrors={setDismissedErrors  as React.Dispatch<React.SetStateAction<Record<keyof MyFormValues, boolean>>>}
                            />

       

                <PasswordInput 
                                inputValue={loginFormikObj.values.password}
                                inputValueOnChange={loginFormikObj.handleChange}
                                inputTypeName={'password'}
                                inputOnBlur={handleBlur}
                                error={!!loginFormikObj.errors.password && loginFormikObj.touched.password && !dismissedErrors.password}
                                helperText={loginFormikObj.touched.password && loginFormikObj.errors.password && !dismissedErrors.password 
                                    && <FormError   errorMessage={loginFormikObj.errors.password}
                                                    onClose={() => {
                                                                            setDismissedErrors((prev) => ({
                                                                                ...prev,
                                                                                password: true
                                                                        }));
                                                                }}
                                    />}
                                 />

                  <MainButton btnTitle={'Log In'} isDisabled={!loginFormikObj.isValid || !loginFormikObj.dirty 
                                            || loginFormikObj.isSubmitting} />



               <Stack  spacing={{ xs: 5, md:1 }}
                        direction="row"
                        useFlexGap
                        sx={{ flexWrap: { 
                                sm: 'nowrap', 
                                },
                                width:'75%',
                                justifyContent:'center'  
                            }}
                    >

                    <ProviderBtn    providerName={'github'} providerVaue={'Sign in with GitHub'} 
                                    providerSvg={ <GitHubIcon />}
                                    providerLogin = {()=>{handleOAuthLogin('github')}}   
                                    providerClasses={`py-2 px-4  flex justify-center items-center 
                                    bg-gray-950 hover:bg-gray-300 hover:text-black focus:ring-gray-500 
                                    focus:ring-offset-gray-200 text-white  transition ease-in  text-center 
                                    text-base font-semibold shadow-md focus:outline-none focus:ring-2 
                                    focus:ring-offset-2 rounded-lg duration-400`} />
                    
                    
                    <ProviderBtn    providerName={'google'} providerVaue={'Login with Google'}
                                    providerLogin = {()=>{handleOAuthLogin('google')}} 
                                    providerSvg={<div className="w-6 h-6 relative">
                                                    <Image
                                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                                        alt="google logo"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                    </div>
                                                } 
                                    providerClasses={`px-4 py-2 border flex gap-2 border-slate-200 
                                    dark:border-slate-700 rounded-lg  hover:border-slate-400 dark:hover:border-slate-500
                                    hover:text-slate-700 dark:hover:text-gray-100 dark:hover:bg-black 
                                    hover:shadow transition duration-400`} />

               </Stack>

            </Box> 

            {dialogData && (
                <ResponseDialog
                    open={!!dialogData}
                    title={dialogData.title}
                    message={dialogData.message}
                    buttonText={dialogData.buttonText}
                    onConfirm={() => {
                        handleDialogClose();
                    }}
                />
            )}
                        
        </>
    )
}

