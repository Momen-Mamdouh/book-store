import { Middleware } from '@reduxjs/toolkit';
import { showLoader, hideLoader } from './LoaderSlice/loaderSlice';

const loaderMiddleware: Middleware = (store) => (next) => (action) => {
  // Assert that action has a type
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const type = (action as { type: string }).type;

    if (type.endsWith('/pending')) {
      store.dispatch(showLoader());
    }

    if (type.endsWith('/fulfilled') || type.endsWith('/rejected')) {
      store.dispatch(hideLoader());
    }
  }

  return next(action);
};

export default loaderMiddleware;
