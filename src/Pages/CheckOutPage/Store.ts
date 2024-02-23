import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

interface CheckOutPageStoreInterface {
    bears: number
    increase: (by: number) => void
}

export const useCheckOutStore = create<CheckOutPageStoreInterface>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increase: (by) => set((state) => ({ bears: state.bears + by })),
            }),
            { name: 'CheckOutStore' }
        )
    )
)
