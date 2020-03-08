import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'react-cards',
      storage,
      whitelist: ['user', 'person'],
    },
    reducers
  );

  return persistedReducer;
};
