const logger = (store) => (next) => (action) => {
  if (process.env.NODE_ENV !== 'development') {
    return next(action); // Skip logging in production
  }

  console.groupCollapsed(`Action: ${action.type}`);
  console.log('Previous State:', store.getState());
  console.log('Action Payload:', action.payload);

  const result = next(action);

  console.log('Next State:', store.getState());
  console.groupEnd();

  return result;
};

export default logger;
