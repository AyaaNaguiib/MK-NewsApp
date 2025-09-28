import { create } from 'zustand';
import { ArticleType } from '../components/types/articleType';
import { getUserData } from '../utils/helpers/storage';
import Toast from 'react-native-toast-message';

type FavStoreState = {
  favList: ArticleType[];
  addToFavList: (article: ArticleType) => Promise<void>;
};

export const useFavStore = create<FavStoreState>((set) => ({
  favList: [],
  addToFavList: async (article) => {
    const user = await getUserData();

    if (user?.role === 'guest') {
      Toast.show({
        type: 'info',
        text1: 'Guest Mode',
        text2: 'Please login to add to favorites',
      });
      return;
    }

    set((state) => ({
      favList: [...state.favList, article],
    }));
  },
}));
