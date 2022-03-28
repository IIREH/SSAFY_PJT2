import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: { id: null, name: null }, // default value (aka initial value)
});

// export const userStateSelector = selector({
//   key: 'userStateSelector',
//   get: ({ get }) => {
//     const user = get(userState);
//     return user.name;
//   },
// });

export const contractPageState = atom({
  key: 'contractPageState',
  default: 0,
});
