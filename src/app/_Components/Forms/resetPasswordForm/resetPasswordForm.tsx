'use client'

import { useFormik } from 'formik';
import { useDialog } from '@/lib/hooks/useDialog';

import Box from '@mui/material/Box';

import { validationResetPasswordFormRules } from '@/lib/zodSchemas/validationResetPasswordFormRules';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import MainButton from "@/app/_Components/MicroComps/MainButton/MainButton";
import FormError from '@/app/_Components/Forms/FormError/FormError';

import PasswordInput from '@/app/_Components/Forms/passwordInput/PasswordInput';
import ResponseDialog from '@/app/_Components/Loaders/responseDialog/responseDialog';
import { IResetPassword } from '@/app/_Interfaces/IForms';

import { createClient } from '@/utils/supabase/client';
import { useDismissableBlur } from '@/utils/formsLogic/useDismissableBlur';
import { syncAuthUserToDb } from '@/utils/formsLogic/syncAuthUserToDb';






export default function ResetPasswordForm(){

    const supabase = createClient();
    const { dialogData, handleDialogClose, showDialog} = useDialog();
    

    const initialValues:IResetPassword = {
            password:'',
    };
    const resetPasswordFormikObj = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(validationResetPasswordFormRules),
        onSubmit: (values, formikHelpers)=>{
            handleSubmitation(values, formikHelpers.setSubmitting); 
        }
    })

    const { handleBlur, dismissedErrors, setDismissedErrors } = 
    useDismissableBlur<typeof resetPasswordFormikObj.values>(resetPasswordFormikObj.handleBlur);


    async function handleSubmitation(formValues: IResetPassword, setSubmitting: (isSubmitting: boolean)=> void) {
            const { password } = formValues;

            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    showDialog({
                        title: "'No session 🤨",
                        message: `User not authenticated via recovery link`,
                        buttonText: "Try Again",
                        route: "reset-password"
                    });
                    return;
                }

                const userId = session.user.id;
                const { error } = await supabase.auth.updateUser({
                        password,
                    });

                if (error) {
                     showDialog({
                        title: `${error.name}, Status: ${error.status}`,
                        message: `${error.message}`,
                        buttonText: "Try Again",
                        route: "reset-password"
                    });
                return;
                }

                const { success, error: errorDB } = await syncAuthUserToDb(userId, { updated_at: new Date() });
                if (!success) {
                     showDialog({
                        title: `${errorDB?.name}`,
                        message: `${errorDB?.message}`,
                        buttonText: "Try Again",
                        route: "reset-password"
                    });
                }
                showDialog({
                        title: `Password reset successfully`,
                        message: `Can login now `,
                        buttonText: "Login",
                        route: "login"
                    });
            } catch (err) {
                showDialog({
                        title: `Unexpected error 🤨`,
                        message: `${err}`,
                        buttonText: "Try again",
                        route: "reset-password"
                    });
            }
            finally {
                setSubmitting(false);  
            }
    }





    return(
        <>
            <Box  component='form' onSubmit={resetPasswordFormikObj.handleSubmit}
                sx={{   
                    borderRadius:'5px', 
                    padding:'1rem 0.2rem 0rem',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    rowGap:'1rem'
                    }}>
     

              <PasswordInput 
                                inputValue={resetPasswordFormikObj.values.password}
                                inputValueOnChange={resetPasswordFormikObj.handleChange}
                                inputTypeName={'password'}
                                inputOnBlur={handleBlur}
                                error={!!resetPasswordFormikObj.errors.password && resetPasswordFormikObj.touched.password && !dismissedErrors.password}
                                helperText={resetPasswordFormikObj.touched.password && resetPasswordFormikObj.errors.password && !dismissedErrors.password 
                                    && <FormError   errorMessage={resetPasswordFormikObj.errors.password}
                                                    onClose={() => {
                                                                            setDismissedErrors((prev) => ({
                                                                                ...prev,
                                                                                password: true
                                                                        }));
                                                                }}
                                    />}
                                 />

       
                  <MainButton btnTitle={'Set New Password'} customWidth={'35%'} isDisabled={!resetPasswordFormikObj.isValid || !resetPasswordFormikObj.dirty 
                                            || resetPasswordFormikObj.isSubmitting} />



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
