import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
    path: string;
    // If undefined is passed this route is still rendered into the router itself
    // but no navigation link is displayed in the sub-navigation menu.
    name: string | undefined;
    component: React.ComponentType;
    icon?: string;
    exact?: boolean;
}

interface ServerRouteDefinition extends RouteDefinition {
    permission: string | string[] | null;
}

interface Routes {
    // All of the routes available under "/account"
    account: RouteDefinition[];
    // All of the routes available under "/server/:id"
    server: ServerRouteDefinition[];
}

export default {
    account: [
        {
            path: '/',
            name: 'Konto',
            component: AccountOverviewContainer,
            exact: true,
            icon: 'fa-user',
        },
        {
            path: '/api',
            name: 'Klucze API',
            component: AccountApiContainer,
            icon: 'fa-key',
        },
        {
            path: '/ssh',
            name: 'Klucze SSH',
            component: AccountSSHContainer,
            icon: 'fa-terminal',
        },
        {
            path: '/activity',
            name: 'Aktywność',
            component: ActivityLogContainer,
            icon: 'fa-list',
        },
    ],
    server: [
        {
            path: '/',
            permission: null,
            name: 'Konsola',
            component: ServerConsole,
            exact: true,
            icon: 'fa-desktop',
        },
        {
            path: '/files',
            permission: 'file.*',
            name: 'Pliki',
            component: FileManagerContainer,
            icon: 'fa-folder',
        },
        {
            path: '/files/:action(edit|new)',
            permission: 'file.*',
            name: undefined,
            component: FileEditContainer,
            icon: 'fa-edit',
        },
        {
            path: '/databases',
            permission: 'database.*',
            name: 'Baza danych',
            component: DatabasesContainer,
            icon: 'fa-database',
        },
        {
            path: '/schedules',
            permission: 'schedule.*',
            name: 'Zadania serwerowe',
            component: ScheduleContainer,
            icon: 'fa-calendar',
        },
        {
            path: '/schedules/:id',
            permission: 'schedule.*',
            name: undefined,
            component: ScheduleEditContainer,
            icon: 'fa-calendar-alt',
        },
        {
            path: '/users',
            permission: 'user.*',
            name: 'Użytkownicy',
            component: UsersContainer,
            icon: 'fa-users',
        },
        {
            path: '/backups',
            permission: 'backup.*',
            name: 'Kopie zapasowe',
            component: BackupContainer,
            icon: 'fa-cloud',
        },
        {
            path: '/network',
            permission: 'allocation.*',
            name: 'Sieć',
            component: NetworkContainer,
            icon: 'fa-network-wired',
        },
        {
            path: '/startup',
            permission: 'startup.*',
            name: 'Parametry startowe',
            component: StartupContainer,
            icon: 'fa-play',
        },
        {
            path: '/settings',
            permission: ['settings.*', 'file.sftp'],
            name: 'Ustawienia / FTP',
            component: SettingsContainer,
            icon: 'fa-cogs',
        },
        {
            path: '/activity',
            permission: 'activity.*',
            name: 'Logi',
            component: ServerActivityLogContainer,
            icon: 'fa-list-alt',
        },
    ],
} as Routes;
