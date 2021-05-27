import { css } from '@emotion/core';
import * as global from '../../globalStyles';

const flexChild = css`
  flex: 1;
`;

export const footer = css`
  clear: both;
  height: 120px;
  box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.3);
  color: black;
  margin-top: 25px;
  font-family: Angelina;
  font-size: 26px;

  position: absolute;
  bottom: 0;
  width: 100%;

  p {
    margin-top: 0;
  }
`;

export const background = css`
  width: 100%;
  height: 120px;
  position: absolute;
  display: flex;
`;

export const content = css`
  position: relative;
  padding: 10px 20px;
`;

export const text = css`
  font-size: 18px;
`;

export const left = css`
  ${flexChild}
  background-image: linear-gradient(to right, red, white);
`;

export const centre = css`
  ${flexChild}
  background-color: white;
  text-align: center;
  white-space: nowrap;
  padding: 0 30px 0;
`;

export const right = css`
  ${flexChild}
  background-image: linear-gradient(to left, red, white);
`;
