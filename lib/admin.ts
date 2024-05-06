import { auth } from "@clerk/nextjs"

const allowedIds = [
    "user_2fcHh0YKJkUVb56aSMpIMTT5kne"
]

export const getIsAdmin = async () => {
    const {userId} = await auth();

    if (!userId) {
        return false;
    }

    return allowedIds.indexOf(userId) !== -1
}