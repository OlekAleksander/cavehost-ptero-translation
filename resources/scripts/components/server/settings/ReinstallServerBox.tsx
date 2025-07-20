import React, { useEffect, useState } from 'react';
import { ServerContext } from '@/state/server';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import reinstallServer from '@/api/server/reinstallServer';
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import { httpErrorToHuman } from '@/api/http';
import tw from 'twin.macro';
import { Button } from '@/components/elements/button/index';
import { Dialog } from '@/components/elements/dialog';

export default () => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const [modalVisible, setModalVisible] = useState(false);
    const { addFlash, clearFlashes } = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes);

    const reinstall = () => {
        clearFlashes('settings');
        reinstallServer(uuid)
            .then(() => {
                addFlash({
                    key: 'settings',
                    type: 'success',
                    message: 'Your server has begun the reinstallation process.',
                });
            })
            .catch((error) => {
                console.error(error);

                addFlash({ key: 'settings', type: 'error', message: httpErrorToHuman(error) });
            })
            .then(() => setModalVisible(false));
    };

    useEffect(() => {
        clearFlashes();
    }, []);

    return (
        <TitledGreyBox title={'Reinstaluj serwer'} css={tw`relative`}>
            <Dialog.Confirm
                open={modalVisible}
                title={'Potwierdź reinstalację serwera'}
                confirm={'Tak, reinstaluj serwer'}
                onClose={() => setModalVisible(false)}
                onConfirmed={reinstall}
            >
                Twój serwer zostanie zatrzymany, a niektóre pliki mogą zostać usunięte lub zmodyfikowane podczas tego
                procesu. Czy na pewno chcesz kontynuować?
            </Dialog.Confirm>
            <p css={tw`text-sm`}>
                Reinstalacja serwera zatrzyma go, a następnie ponownie uruchomi skrypt instalacyjny, który początkowo go
                skonfigurował.&nbsp;
                <strong css={tw`font-medium`}>
                    Niektóre pliki mogą zostać usunięte lub zmodyfikowane podczas tego procesu, wykonaj kopię zapasową
                    danych przed kontynuacją.
                </strong>
            </p>
            <div css={tw`mt-6 text-right`}>
                <Button.Danger variant={Button.Variants.Secondary} onClick={() => setModalVisible(true)}>
                    Reinstaluj serwer
                </Button.Danger>
            </div>
        </TitledGreyBox>
    );
};
