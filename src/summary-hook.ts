import { useGetUsersListQuery } from "./services/api";

import { SummaryItem } from './services/types';
import { useGetUsersStatisticsQuery } from "./services/api";

export const useSummary = (): {data: SummaryItem[], isLoading: boolean} => {
    const {data: usersData, isLoading: isUsersLoading} = useGetUsersListQuery();
    const {data: statisticsData, isLoading: isTodosLoading} = useGetUsersStatisticsQuery();

    if(isUsersLoading || !usersData) {
        return {data:[], isLoading: true};
    }

    if(isUsersLoading || isTodosLoading) {
        return {data: [], isLoading: true}
    }

    if(!usersData || !statisticsData) {
        return { data: [], isLoading: false};
    }

    return {
        data: usersData.map(user => ({...user, statistics: statisticsData[user.id]})),
        isLoading: false
    };
}
