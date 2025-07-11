'use client'

import { useFormik } from 'formik';
import { useDialog } from '@/lib/hooks/useDialog';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { validationForgetPasswordFormRules } from '@/lib/zodSchemas/validationForgetPasswordFormRules';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { createClient } from '@/utils/supabase/client';
import { useDismissableBlur } from '@/utils/formsLogic/useDismissableBlur';

import MainButton from "@/app/_Components/MicroComps/MainButton/MainButton";
import MuiMyFormTextField from '@/app/_Components/MicroComps/MuiMyFormTextField/MuiMyFormTextField';
import ResponseDialog from '@/app/_Components/Loaders/responseDialog/responseDialog';
import { IForgetPassword } from '@/app/_Interfaces/IForms';


export default function ForgetPasswordForm(){

    const supabase = createClient();
    const { dialogData, handleDialogClose, showDialog} = useDialog();


    const initialValues:IForgetPassword = {
            email:'',
    };

    const forgetPasswordFormikObj = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(validationForgetPasswordFormRules),
        onSubmit: (values, formikHelpers)=>{
            handleSubmitation(values, formikHelpers.setSubmitting); 
        }
    })

    const { handleBlur, dismissedErrors, setDismissedErrors } = 
    useDismissableBlur<typeof forgetPasswordFormikObj.values>(forgetPasswordFormikObj.handleBlur);


    async function handleSubmitation(formValues: IForgetPassword, setSubmitting: (isSubmitting: boolean)=> void) {
            const { email } = formValues;

            try {
               const {  error } = await supabase.auth.resetPasswordForEmail(email,{
                redirectTo: `${window.location.origin}/reset-password`
               })

                if (error) {
                    showDialog({
                        title: `${error.name}, Status: ${error.status}`,
                        message: error.message,
                        buttonText: "Try Again",
                        route: "forget-password"
                    });
                    return;
                }


                showDialog({
                    title: `Can Reset Password Now`,
                    message: `Check Your email to Confirm`,
                    buttonText: "Next",
                    route: `reset-password`
                });
                   
            } catch (err) {

                showDialog({
                    title: "Unexpected error 🤨",
                    message: `${err}`,
                    buttonText: "Try Again",
                    route: "forget"
                });

            }
            finally {
                setSubmitting(false);  
            }
    }





    return(
        <>
            <Box  component='form' onSubmit={forgetPasswordFormikObj.handleSubmit}
                sx={{   
                    borderRadius:'5px', 
                    padding:'1rem 0.2rem 0rem',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    rowGap:'1rem'
                    }}>
     
            <MuiMyFormTextField
                                id="email"
                                name="email"
                                label="Email"
                                formik={forgetPasswordFormikObj}
                                handleBlur={handleBlur}
                                dismissedErrors={dismissedErrors}
                                setDismissedErrors={setDismissedErrors}
                            />
                    
             

       
                  <MainButton btnTitle={'Send Email To Reset'} customWidth={'50%'} isDisabled={!forgetPasswordFormikObj.isValid || !forgetPasswordFormikObj.dirty 
                                            || forgetPasswordFormikObj.isSubmitting} />



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

