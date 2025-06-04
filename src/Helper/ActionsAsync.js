import { loginSuccess, setUserProfile } from './Actions';

// Example async login thunk
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      // Simulate an API call, replace with real fetch/axios
      const response = await fakeApiLogin(credentials);

      dispatch(loginSuccess());
      dispatch(setUserProfile(response.user));
    } catch (error) {
      console.error('Login failed:', error);
      // You can dispatch an error action here if you want
    }
  };
};

// Fake API call simulation
const fakeApiLogin = (credentials) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'admin' && credentials.LPass === '1234') {
        resolve({ user: { name: 'Admin User', email: 'admin@example.com' } });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
