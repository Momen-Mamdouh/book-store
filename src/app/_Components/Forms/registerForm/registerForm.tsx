'use client'

import { useFormik } from 'formik';
import { useDialog } from '@/lib/hooks/useDialog';

import Box from '@mui/material/Box';

import { RegisterFormRules } from '@/lib/zodSchemas/validationRegisterFormRules';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { useDismissableBlur } from '@/utils/formsLogic/useDismissableBlur';
import { createClient } from '@/utils/supabase/client';
import { syncAuthUserToDb } from '@/utils/formsLogic/syncAuthUserToDb';

import FormError from '@/app/_Components/Forms/FormError/FormError';
import MainButton from "@/app/_Components/MicroComps/MainButton/MainButton";import MuiMyFormTextField from '@/app/_Components/MicroComps/MuiMyFormTextField/MuiMyFormTextField';
import PasswordInput from '@/app/_Components/Forms/passwordInput/PasswordInput';
import ResponseDialog from '@/app/_Components/Loaders/responseDialog/responseDialog';
import { IRegister } from '@/app/_Interfaces/IForms';


type MyFormValues = {
    name:string;
    email: string;
    phone:string;
    password: string;
    password_confirmation:string;
};



export default function RegisterForm(){

    const supabase = createClient();
    const { dialogData, handleDialogClose, showDialog} = useDialog();



    const initialValues:IRegister = {
            name:'',
            email:'',
            phone:'',
            password:'',
            password_confirmation:'',
    };
    const registerFormikObj = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(RegisterFormRules),
        validate: (values) => {
            const errors: Partial<IRegister> = {};
             if (values.password_confirmation == ''){
                errors.password_confirmation = "Re-Password is required & must match password in password Field";
             }

            else if (values.password !== values.password_confirmation) {
                errors.password_confirmation = "Passwords do not match";
            }

            return errors;
         },
        onSubmit: async (values, formikHelpers)=>{
            handleSubmitation(values, formikHelpers.setSubmitting);
           
        },
    })

    const { handleBlur, dismissedErrors, setDismissedErrors } = 
    useDismissableBlur<typeof registerFormikObj.values>(registerFormikObj.handleBlur);


    async function handleSubmitation(formValues: IRegister, setSubmitting: (isSubmitting: boolean)=> void) {
            const { email, password, name:username, phone } = formValues;

            try {
                 // ^^Inset data into auth.user table into supabse DB.
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options:{
                        emailRedirectTo: `${window.location.origin}/auth/confirm`,
                    data:{
                        username,
                            phone,
                    }
                    },
                });

                if (error) {
                     showDialog({
                        title: `${error.name}, Status: ${error.status}`,
                        message: error.message,
                        buttonText: "Try Again",
                        route: "register"
                    });
                }

                // ^^Inset data into public.user table into supabse DB.
                
                const userId = data.user?.id ?? '';
                if (!userId) {
                    showDialog({
                        title: `Not Vaild User ID`,
                        message: `User ID not found after signup`,
                        buttonText: "Try Again",
                        route: "register"
                    });
                };

                const { success, error: errorDB } = await syncAuthUserToDb(userId, {
                    email,
                    username,
                    phonenumber: phone,
                    created_at: new Date(),
                });

                if (!success) {
                    showDialog({
                        title: `Insert To DB Error`,
                        message: `${errorDB?.details}`,
                        buttonText: "Try Another",
                        route: "register"
                    });
                }

                 showDialog({
                    title: `Register success`,
                    message: `Check Your email to Confirm then login`,
                    buttonText: "Login",
                    route: `login`
                });
            } catch (err) {
                 showDialog({
                    title: "Unexpected error 🤨",
                    message: `${err}`,
                    buttonText: "To Register page",
                    route: "register"
                });
            }
            finally {
                setSubmitting(false);  
            }
    };

 
    return(

        <>
            <Box  component='form' 
                    onSubmit={registerFormikObj.handleSubmit
                    
                    }
                sx={{   
                    borderRadius:'5px', 
                    padding:'1rem 0.2rem 0rem',
                    overflowY:'auto',
                    display:'flex',
                    flexWrap:'wrap',
                    alignItems:'center',
                    justifyContent:'center',
                    rowGap:'1rem'
                    }}>

                <MuiMyFormTextField<MyFormValues>
                    id="name"
                    name="name"
                    label="Name"
                    formik={registerFormikObj}
                    handleBlur={handleBlur}
                    dismissedErrors={dismissedErrors as Record<keyof MyFormValues, boolean>}
                    setDismissedErrors={setDismissedErrors  as React.Dispatch<React.SetStateAction<Record<keyof MyFormValues, boolean>>>}
                />

                <MuiMyFormTextField<MyFormValues>
                    id="email"
                    name="email"
                    label="Email"
                    formik={registerFormikObj}
                    handleBlur={handleBlur}
                    dismissedErrors={dismissedErrors as Record<keyof MyFormValues, boolean>}
                    setDismissedErrors={setDismissedErrors  as React.Dispatch<React.SetStateAction<Record<keyof MyFormValues, boolean>>>}
                />

                <MuiMyFormTextField<MyFormValues>
                    id="phone"
                    name="phone"
                    label="Phone"
                    formik={registerFormikObj}
                    handleBlur={handleBlur}
                    dismissedErrors={dismissedErrors as Record<keyof MyFormValues, boolean>}
                    setDismissedErrors={setDismissedErrors  as React.Dispatch<React.SetStateAction<Record<keyof MyFormValues, boolean>>>}
                />
                        


                <PasswordInput  inputValue={registerFormikObj.values.password}
                                inputTypeName={'password'}
                                inputValueOnChange={registerFormikObj.handleChange}
                                inputOnBlur = {handleBlur}
                                error={!!registerFormikObj.errors.password && registerFormikObj.touched.password && !dismissedErrors.password}
                                helperText={registerFormikObj.touched.password && registerFormikObj.errors.password  && !dismissedErrors.password
                                && <FormError   errorMessage={registerFormikObj.errors.password} 
                                                onClose={() => {
                                                            setDismissedErrors((prev) => ({
                                                                ...prev,
                                                                password: true
                                                        }));
                                                }}

                                
                                />  }/>

                <PasswordInput  inputValue={registerFormikObj.values.password_confirmation}
                                inputTypeName={'password_confirmation'}
                                inputValueOnChange={registerFormikObj.handleChange}
                                inputOnBlur = {handleBlur}
                                error={!!registerFormikObj.errors.password_confirmation && registerFormikObj.touched.password_confirmation  && !dismissedErrors.password_confirmation}
                                helperText={registerFormikObj.touched.password_confirmation && registerFormikObj.errors.password_confirmation  && !dismissedErrors.password_confirmation
                                 && <FormError  errorMessage={registerFormikObj.errors.password_confirmation}
                                                onClose={() => {
                                                            setDismissedErrors((prev) => ({
                                                                ...prev,
                                                                password_confirmation: true
                                                        }));
                                                }}

                                 />}/>

               <MainButton btnTitle={'Sign Up'} 
                            isDisabled={!registerFormikObj.isValid || !registerFormikObj.dirty 
                                            || registerFormikObj.isSubmitting}/>

               

          
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

