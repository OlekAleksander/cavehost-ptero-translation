import React, { useContext } from 'react';
import tw from 'twin.macro';
import Button from '@/components/elements/Button';
import asModal from '@/hoc/asModal';
import ModalContext from '@/context/ModalContext';
import CopyOnClick from '@/components/elements/CopyOnClick';

interface Props {
    apiKey: string;
}

const ApiKeyModal = ({ apiKey }: Props) => {
    const { dismiss } = useContext(ModalContext);

    return (
        <>
            <h3 className='mb-6 text-2xl'>Twój klucz API</h3>
            <p className='text-sm mb-6'>
                Klucz API, który wygenerowałeś, jest pokazany poniżej. Proszę przechowywać go w bezpiecznym miejscu -
                nie będzie on pokazany ponownie.
            </p>
            <pre className='text-sm bg-neutral-900 rounded py-2 px-4 font-mono'>
                <CopyOnClick text={apiKey}>
                    <code className='font-mono'>{apiKey}</code>
                </CopyOnClick>
            </pre>
            <div className='flex justify-end mt-6'>
                <Button type={'button'} onClick={() => dismiss()}>
                    Zamknij
                </Button>
            </div>
        </>
    );
};

ApiKeyModal.displayName = 'ApiKeyModal';

export default asModal<Props>({
    closeOnEscape: false,
    closeOnBackground: false,
})(ApiKeyModal);
