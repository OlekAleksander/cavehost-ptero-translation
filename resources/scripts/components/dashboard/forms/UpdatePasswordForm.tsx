import React from 'react';
import { Actions, State, useStoreActions, useStoreState } from 'easy-peasy';
import { Form, Formik, FormikHelpers } from 'formik';
import Field from '@/components/elements/Field';
import * as Yup from 'yup';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import updateAccountPassword from '@/api/account/updateAccountPassword';
import { httpErrorToHuman } from '@/api/http';
import { ApplicationStore } from '@/state';
import tw from 'twin.macro';
import { Button } from '@/components/elements/button/index';

interface Values {
    current: string;
    password: string;
    confirmPassword: string;
}

const schema = Yup.object().shape({
    current: Yup.string().min(1).required('Musisz podać swoje obecne hasło.'),
    password: Yup.string().min(8).required(),
    confirmPassword: Yup.string().test(
        'password',
        'Potwierdzenie hasła nie pasuje do wprowadzonego hasła.',
        function (value) {
            return value === this.parent.password;
        }
    ),
});

export default () => {
    const user = useStoreState((state: State<ApplicationStore>) => state.user.data);
    const { clearFlashes, addFlash } = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes);

    if (!user) {
        return null;
    }

    const submit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        clearFlashes('account:password');
        updateAccountPassword({ ...values })
            .then(() => {
                // @ts-expect-error this is valid
                window.location = '/auth/login';
            })
            .catch((error) =>
                addFlash({
                    key: 'account:password',
                    type: 'error',
                    title: 'Błąd',
                    message: httpErrorToHuman(error),
                })
            )
            .then(() => setSubmitting(false));
    };

    return (
        <React.Fragment>
            <Formik
                onSubmit={submit}
                validationSchema={schema}
                initialValues={{ current: '', password: '', confirmPassword: '' }}
            >
                {({ isSubmitting, isValid }) => (
                    <React.Fragment>
                        <SpinnerOverlay size={'large'} visible={isSubmitting} />
                        <Form css={tw`m-0`}>
                            <Field id={'current_password'} type={'password'} name={'current'} label={'Obecne hasło'} />
                            <div css={tw`mt-6`}>
                                <Field
                                    id={'new_password'}
                                    type={'password'}
                                    name={'password'}
                                    label={'Nowe hasło'}
                                    description={
                                        'Twoje nowe hasło powinno mieć co najmniej 8 znaków i być unikalne dla tej strony.'
                                    }
                                />
                            </div>
                            <div css={tw`mt-6`}>
                                <Field
                                    id={'confirm_new_password'}
                                    type={'password'}
                                    name={'confirmPassword'}
                                    label={'Potwierdź nowe hasło'}
                                />
                            </div>
                            <div css={tw`mt-6`}>
                                <Button disabled={isSubmitting || !isValid}>Zaktualizuj hasło</Button>
                            </div>
                        </Form>
                    </React.Fragment>
                )}
            </Formik>
        </React.Fragment>
    );
};
