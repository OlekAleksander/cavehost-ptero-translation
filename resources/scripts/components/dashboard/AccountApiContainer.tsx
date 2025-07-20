import React, { useEffect, useState } from 'react';
import ContentBox from '@/components/elements/ContentBox';
import CreateApiKeyForm from '@/components/dashboard/forms/CreateApiKeyForm';
import getApiKeys, { ApiKey } from '@/api/account/getApiKeys';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import deleteApiKey from '@/api/account/deleteApiKey';
import FlashMessageRender from '@/components/FlashMessageRender';
import { format } from 'date-fns';
import PageContentBlock from '@/components/elements/PageContentBlock';
import tw from 'twin.macro';
import GreyRowBox from '@/components/elements/GreyRowBox';
import { Dialog } from '@/components/elements/dialog';
import { useFlashKey } from '@/plugins/useFlash';
import Code from '@/components/elements/Code';

export default () => {
    const [deleteIdentifier, setDeleteIdentifier] = useState('');
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const { clearAndAddHttpError } = useFlashKey('account');

    useEffect(() => {
        getApiKeys()
            .then((keys) => setKeys(keys))
            .then(() => setLoading(false))
            .catch((error) => clearAndAddHttpError(error));
    }, []);

    const doDeletion = (identifier: string) => {
        setLoading(true);

        clearAndAddHttpError();
        deleteApiKey(identifier)
            .then(() => setKeys((s) => [...(s || []).filter((key) => key.identifier !== identifier)]))
            .catch((error) => clearAndAddHttpError(error))
            .then(() => {
                setLoading(false);
                setDeleteIdentifier('');
            });
    };

    return (
        <PageContentBlock title={'API konta'}>
            <FlashMessageRender byKey={'account'} />
            <div className='md:flex flex-nowrap my-10'>
                <ContentBox title={'Utwórz klucz API'} className='flex-none w-full md:w-1/2'>
                    <CreateApiKeyForm onKeyCreated={(key) => setKeys((s) => [...s!, key])} />
                </ContentBox>
                <ContentBox title={'Klucze API'} className='flex-1 overflow-hidden mt-8 md:mt-0 md:ml-8'>
                    <SpinnerOverlay visible={loading} />
                    <Dialog.Confirm
                        title={'Usuń klucz API'}
                        confirm={'Usuń klucz'}
                        open={!!deleteIdentifier}
                        onClose={() => setDeleteIdentifier('')}
                        onConfirmed={() => doDeletion(deleteIdentifier)}
                    >
                        Wszystkie żądania używające klucza <Code>{deleteIdentifier}</Code> zostaną unieważnione.
                    </Dialog.Confirm>
                    {keys.length === 0 ? (
                        <p className='text-center text-sm'>
                            {loading ? 'Ładowanie...' : 'Brak kluczy API dla tego konta.'}
                        </p>
                    ) : (
                        keys.map((key, index) => (
                            <GreyRowBox
                                key={key.identifier}
                                className={`bg-neutral-600 flex items-center ${index > 0 ? 'mt-2' : ''}`}
                            >
                                <FontAwesomeIcon icon={faKey} className='text-neutral-300' />
                                <div className='ml-4 flex-1 overflow-hidden'>
                                    <p className='text-sm break-words'>{key.description}</p>
                                    <p className='text-2xs text-neutral-300 uppercase'>
                                        Ostatnie użycie:&nbsp;
                                        {key.lastUsedAt ? format(key.lastUsedAt, 'MMM do, yyyy HH:mm') : 'Nigdy'}
                                    </p>
                                </div>
                                <p className='text-sm ml-4 hidden md:block'>
                                    <code className='font-mono py-1 px-2 bg-neutral-900 rounded'>{key.identifier}</code>
                                </p>
                                <button
                                    className='ml-4 p-2 text-sm'
                                    onClick={() => setDeleteIdentifier(key.identifier)}
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className='text-neutral-400 hover:text-red-400 transition-colors duration-150'
                                    />
                                </button>
                            </GreyRowBox>
                        ))
                    )}
                </ContentBox>
            </div>
        </PageContentBlock>
    );
};
