import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import performPasswordReset from '@/api/auth/performPasswordReset';
import { httpErrorToHuman } from '@/api/http';
import LoginFormContainer from '@/components/auth/LoginFormContainer';
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { Formik, FormikHelpers } from 'formik';
import { object, ref, string } from 'yup';
import Field from '@/components/elements/Field';
import Input from '@/components/elements/Input';
import Button from '@/components/elements/Button';

interface Values {
    password: string;
    passwordConfirmation: string;
}

export default ({ match, location }: RouteComponentProps<{ token: string }>) => {
    const [email, setEmail] = useState('');

    const { clearFlashes, addFlash } = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes);

    const parsed = new URLSearchParams(location.search);
    if (email.length === 0 && parsed.get('email')) {
        setEmail(parsed.get('email') || '');
    }

    const submit = ({ password, passwordConfirmation }: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes();
        performPasswordReset(email, { token: match.params.token, password, passwordConfirmation })
            .then(() => {
                // @ts-expect-error this is valid
                window.location = '/';
            })
            .catch((error) => {
                console.error(error);

                setSubmitting(false);
                addFlash({ type: 'error', title: 'Error', message: httpErrorToHuman(error) });
            });
    };

    return (
        <Formik
            onSubmit={submit}
            initialValues={{
                password: '',
                passwordConfirmation: '',
            }}
            validationSchema={object().shape({
                password: string()
                    .required('Wymagane jest nowe hasło.')
                    .min(8, 'Twoje nowe hasło powinno mieć co najmniej 8 znaków.'),
                passwordConfirmation: string()
                    .required('Twoje nowe hasło nie pasuje.')
                    // @ts-expect-error this is valid
                    .oneOf([ref('password'), null], 'Twoje nowe hasło nie pasuje.'),
            })}
        >
            {({ isSubmitting }) => (
                <LoginFormContainer
                    title={'Zresetuj hasło'}
                    className='w-full flex bg-gray-800 text-white rounded-lg shadow-lg p-6'
                >
                    <div>
                        <label className='text-neutral-300'>Email</label>
                        <Input value={email} isLight disabled className='bg-gray-700 text-white' />
                    </div>
                    <div className='mt-6'>
                        <Field
                            light
                            label={'Nowe hasło'}
                            name={'password'}
                            type={'password'}
                            description={'Hasła muszą mieć co najmniej 8 znaków.'}
                            className='bg-gray-700 text-white'
                        />
                    </div>
                    <div className='mt-6'>
                        <Field
                            light
                            label={'Potwierdź nowe hasło'}
                            name={'passwordConfirmation'}
                            type={'password'}
                            className='bg-gray-700 text-white'
                        />
                    </div>
                    <div className='mt-6'>
                        <Button
                            size={'xlarge'}
                            type={'submit'}
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            className='bg-blue-600 hover:bg-blue-700 text-white'
                        >
                            Zresetuj hasło
                        </Button>
                    </div>
                    <div className='mt-6 text-center'>
                        <Link
                            to={'/auth/login'}
                            className='text-xs text-neutral-400 tracking-wide no-underline uppercase hover:text-neutral-300'
                        >
                            Powrót do logowania
                        </Link>
                    </div>
                </LoginFormContainer>
            )}
        </Formik>
    );
};
