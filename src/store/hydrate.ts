import store from './store';

export const hydrateStore = (initialState: any) => {
  store.hydrate(initialState);
};
