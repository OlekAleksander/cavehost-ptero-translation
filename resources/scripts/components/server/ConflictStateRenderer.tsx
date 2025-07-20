import React from 'react';
import { ServerContext } from '@/state/server';
import ScreenBlock from '@/components/elements/ScreenBlock';
import ServerInstallSvg from '@/assets/images/server_installing.svg';
import ServerErrorSvg from '@/assets/images/server_error.svg';
import ServerRestoreSvg from '@/assets/images/server_restore.svg';

export default () => {
    const status = ServerContext.useStoreState((state) => state.server.data?.status || null);
    const isTransferring = ServerContext.useStoreState((state) => state.server.data?.isTransferring || false);
    const isNodeUnderMaintenance = ServerContext.useStoreState(
        (state) => state.server.data?.isNodeUnderMaintenance || false
    );

    return status === 'installing' || status === 'install_failed' || status === 'reinstall_failed' ? (
        <ScreenBlock
            title={'Instalator w trakcie działania'}
            image={ServerInstallSvg}
            message={'Twój serwer powinien być gotowy wkrótce, spróbuj ponownie za kilka minut.'}
        />
    ) : status === 'suspended' ? (
        <ScreenBlock
            title={'Serwer zawieszony'}
            image={ServerErrorSvg}
            message={'Ten serwer jest zawieszony i nie możesz uzyskać do niego dostępu.'}
        />
    ) : isNodeUnderMaintenance ? (
        <ScreenBlock
            title={'Węzeł w trakcie konserwacji'}
            image={ServerErrorSvg}
            message={'Węzeł tego serwera jest obecnie w trakcie konserwacji.'}
        />
    ) : (
        <ScreenBlock
            title={isTransferring ? 'Transferowanie' : 'Przywracanie z kopii zapasowej'}
            image={ServerRestoreSvg}
            message={
                isTransferring
                    ? 'Twój serwer jest przenoszony na nowy węzeł, sprawdź ponownie później.'
                    : 'Twój serwer jest obecnie przywracany z kopii zapasowej, sprawdź ponownie za kilka minut.'
            }
        />
    );
};
