export const onEnter = (callback: () => any) => (event: React.KeyboardEvent<any>) => {
  if (event.keyCode == 13) callback();
};
