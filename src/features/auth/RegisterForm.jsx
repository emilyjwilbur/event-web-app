import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase, signInWithEmail } from '../../app/firestore/firebaseService';

export default function RegisterForm() {
    const dispatch = useDispatch();
    return (
        <ModalWrapper size='mini' header='Register to EventSpace'>
            <Formik
                initialValues={{displayName: '', email: '', password: ''}}
                validationSchema={Yup.object ({
                    displayName: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={async (values, {setSubmitting}) => {
                    try {
                        await registerInFirebase(values);
                        setSubmitting(false);
                        dispatch(closeModal());

                    } catch (error) {
                        setSubmitting(false);
                        console.log(error);
                    }
                   
                }}
            >
                    {({isSubmitting, isValid, dirty}) => (
                        <Form className='ui form'>
                            <MyTextInput name="displayName" placeholder="Display Name" />
                            <MyTextInput name="email" placeholder="Email Address" />
                            <MyTextInput name="password" placeholder="Password" type='password' />
                            <Button
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type='submit'
                                fluid
                                size='large'
                                color='teal'
                                content='Register'
                            />
                        </Form>
                    )}

            </Formik>

        </ModalWrapper>
    )
}