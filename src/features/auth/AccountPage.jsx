import React from 'react';
import { Button, Form, Header, Label, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';


export default function AccountPage() {
    return (
        <Segment>
            <Header dividing size='large' content='Account' />
            <div>
                <Header color='teal' sub content='Change Password' />
                <p>Use this form to change your password</p>
                <Formik
                    initialValues={{newPassword1: '', newPassword2: ''}}
                    validationSchema={Yup.object({
                        newPassword1: Yup.string().required('Password is required'),
                        newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Passwords do not match')
                    })}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({errors, isSubmitting, isValid, dirty}) => (
                        <Form className='ui form' >
                        <MyTextInput name='newPassword1' type='password' placeholder='New Password'/>
                        <MyTextInput name='newPassword2' type='password' placeholder='Confirm Password'/>
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}
                        <Button type='submit'
                        disabled={!isValid || isSubmitting || !dirty }
                        size='large'
                        positive
                        content='Update Password'

                        />
                    </Form>

                    )}
                    
                </Formik>
            </div>
            <div>
                <Header color='teal' sub content='Facebook account' />
                <p>Please visit Facebook to update your account.</p>
                <Button icon='facebook' color='facebook' as={Link} to='https://facebook.com'
                content='Go to Facebook' />
            </div>
            <div>
                <Header color='teal' sub content='Google account' />
                <p>Please visit Facebook to update your account.</p>
                <Button icon='google' color='google plus' as={Link} to='https://facebook.com'
                content='Go to Google' />
            </div>
        </Segment>
    )
}