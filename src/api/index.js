import { decode } from 'jsonwebtoken';
import auth from './auth';


function getUserData({ token }) {
  return Promise.resolve({
    username: decode(token).sub,
  });
}

export default {
  ...auth,
  getUserData,
};
