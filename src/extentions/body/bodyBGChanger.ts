let i: number = 0;

const bodyBGChangerFoo = (): void => {
  i = i < 360 ? i : 0;
  document.body.style.backgroundColor = `hsl(${i}deg, 100%, 91%)`;
  i++;
};

export const bodyBGChanger = (): void => {
  setInterval(bodyBGChangerFoo, 48);
};
