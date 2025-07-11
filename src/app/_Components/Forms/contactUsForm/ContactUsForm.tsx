'use client'

import { useFormik } from 'formik';
import { useState } from 'react';

import Box from '@mui/material/Box';

import { ContactUsRules } from '@/lib/zodSchemas/validationContactUsFormRules';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { createClient } from '@/utils/supabase/client';
import { useDismissableBlur } from '@/utils/formsLogic/useDismissableBlur';

import ResponseDialog from '@/app/_Components/Loaders/responseDialog/responseDialog';
import MainButton from "@/app/_Components/MicroComps/MainButton/MainButton";

import { IContactUs, IDialog } from '@/app/_Interfaces/IForms';
import MuiMyFormTextField from '@/app/_Components/MicroComps/MuiMyFormTextField/MuiMyFormTextField';
import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import BooksResponseLoader from '@/app/_Components/Loaders/BooksResponseLoader/BooksResponseLoader';


const MapComp = dynamic(() => import('@/app/_Components/MapComp/MapComp'), {
  ssr: false,
  loading: () => <BooksResponseLoader />,
});



export default function ContactUsForm(){

    const supabase = createClient();
    const [dialogData, setDialogData] = useState< IDialog | null>(null);

    const handleDialogClose = () => {
        contactUsFormikObj.resetForm();
        setDialogData(null);
    };

    const initialValues:IContactUs = {
           full_name: '',
            subject: '',
            message: '',
    };
    const contactUsFormikObj = useFormik({
        initialValues,
        validationSchema: toFormikValidationSchema(ContactUsRules),
        onSubmit: (values, formikHelpers)=>{
            handleSubmitation(values, formikHelpers.setSubmitting); 
        }
    })
    const { handleBlur, dismissedErrors, setDismissedErrors } = 
    useDismissableBlur<typeof contactUsFormikObj.values>(contactUsFormikObj.handleBlur);

    async function handleSubmitation(formValues: IContactUs, setSubmitting: (isSubmitting: boolean)=> void) {
            const { full_name, subject, message } = formValues;

            try {

                const { data: { user },  error: userError } = await supabase.auth.getUser();

                const userEmail = user?.email;
                 const { error: insertError } = await supabase
                    .from('contact_us') 
                    .insert([
                        {
                            user_id: user?.id,
                            full_name,
                            email: userEmail,
                            subject,
                            message, 
                        }
                    ]);

                if (insertError) {
                    setDialogData({
                        title: `Insert To DB Error`,
                        message: `${insertError.message}`,
                        buttonText: "Try Another",
                        route: "register"
                    });
                    return;
                }

                if (userError) {
                 setDialogData({
                        title: `${userError.name}, Status: ${userError.status}`,
                        message: userError.message,
                        buttonText: "Try Again",
                        route: ""
                    });
                    return;  
                }

                setDialogData({
                    title: `We'll contact with you soon via email: ${userEmail} 😁`,
                    message: "We catched your message successfully 👌",
                    buttonText: "Close",
                    route: ""
                });
            } catch (err) {
                setDialogData({
                    title: "Unexpected error 🤨",
                    message: `${err}`,
                    buttonText: "Try Again",
                    route: "Close"
                });
            }
             finally {
                setSubmitting(false);  
            }
    }

    return(
        <div className='contactSection ' >
            <Stack direction={'row'} sx={{display:'flex', flexDirection:{
                xs:'column',
                sm:'column',
                md:'column',
                lg:'row',
            } ,alignItems:'center', justifyContent:'space-around'}} >

                <Box  component='form' onSubmit={contactUsFormikObj.handleSubmit}
                    sx={{   
                        borderRadius:'5px', 
                        padding:'1rem 0.2rem 0rem',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        rowGap:'1rem',
                        fontSize: 20,
                        width:{
                            xs:'100%',
                            sm:'100%',
                            md:'75%',
                
                        }
                        }}>
        

                <MuiMyFormTextField
                        id="full_name"
                        name="full_name"
                        label="Full Name"
                        formik={contactUsFormikObj}
                        handleBlur={handleBlur}
                        dismissedErrors={dismissedErrors}
                        setDismissedErrors={setDismissedErrors}
                    />

                    <MuiMyFormTextField
                        id="subject"
                        name="subject"
                        label="Subject"
                        formik={contactUsFormikObj}
                        handleBlur={handleBlur}
                        dismissedErrors={dismissedErrors}
                        setDismissedErrors={setDismissedErrors}
                        
                    />

                    <MuiMyFormTextField
                        id="message"
                        name="message"
                        label="Message"
                        formik={contactUsFormikObj}
                        handleBlur={handleBlur}
                        dismissedErrors={dismissedErrors}
                        setDismissedErrors={setDismissedErrors}
                    />

        
                    <MainButton btnTitle={'Send Message'} isDisabled={!contactUsFormikObj.isValid || !contactUsFormikObj.dirty 
                                                || contactUsFormikObj.isSubmitting} />


                </Box>
          
                <MapComp />
            </Stack>
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
        
        </div>
    )
}
