import { create } from 'zustand'
import { ArticleType } from '../components/types/articleType'
type FavStoreState={
    favList:ArticleType[],
    addToFavList:(article:ArticleType)=>void,
}
 export const useFavStore = create <FavStoreState>((set) => ({
  favList: [],
  addToFavList: (article) => set((state) => ({ favList:[...state.favList,article] })),
}))