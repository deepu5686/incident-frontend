import { getUsers } from "../api/user.api"
import { createListKeys } from "../queryKeys/createListKeys"
import { useListQuery } from "./useListQuery"

export const useuser = () => {
    return useListQuery({
        queryKey: createListKeys('users').all,
        queryFn: getUsers

    })
}