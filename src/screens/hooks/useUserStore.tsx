import {create} from 'zustand'
import { User } from '../global-types'

interface UserState{
    user: User | null
    setUser: (user: User) => void
}
const useUserStore = create<UserState>()((set) => (
    {
        user: null,
        setUser(user) {
            set(()=>({user: user}))
        },
    }
) )

export default useUserStore