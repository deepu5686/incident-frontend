import { getIncidentsData } from "../api/incident.api"
import { createListKeys } from "../queryKeys/createListKeys"
import { useListQuery } from "./useListQuery"

export const useIncidents = () => {
    return useListQuery({
        queryKey: createListKeys('incidents').all,
        queryFn: getIncidentsData
    })
}