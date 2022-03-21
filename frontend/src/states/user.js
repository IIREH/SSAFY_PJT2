import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: { name: 'kim', id: '234' }, // default value (aka initial value)
});

// export const userStateSelector = selector({
//   key: 'userStateSelector',
//   get: ({ get }) => {
//     const user = get(userState);
//     return user.name;
//   },
// });
