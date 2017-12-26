import { sign } from 'jsonwebtoken';


export default {
  login: ({ username }) => new Promise((resolve) => {
    setTimeout(resolve({
      token: sign({ sub: username }, 'asjdklfj'),
    }), 3000);
  }),
};
