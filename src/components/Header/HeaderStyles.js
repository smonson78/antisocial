import { css } from '@emotion/core';
import * as global from '../../globalStyles';

export const header = css`
  height: 100px;
  display: flex;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.3);
  z-index: 1;

  background: linear-gradient(to left, rgb(255, 0, 0), rgb(255, 200, 200));

  @media screen and (min-width: 770px) {
    height: 140px;
  }
`;

export const centre = css`
  flex: 0;
  padding: 0 30px;
`;

export const searchContainer = css`
  flex: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const logo = css``;