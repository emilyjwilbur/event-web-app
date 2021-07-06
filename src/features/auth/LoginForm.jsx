import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';

export default function LoginForm() {
    return (
        <ModalWrapper size='mini' header='Sign into EventSpace'>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object ({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                    {({isSubmitting, isValid, dirty}) => (
                        <Form className='ui form'>
                            <MyTextInput name="email" placeholder="Email Address" />
                            <MyTextInput name="password" placeholder="Password" type='password' />
                            <Button
                                loading={isSubmitting}
                                disabled={!isValid || !dirty || isSubmitting}
                                type='submit'
                                fluid
                                size='large'
                                color='teal'
                                content='Login'
                            />
                        </Form>
                    )}

            </Formik>

        </ModalWrapper>
    )
}