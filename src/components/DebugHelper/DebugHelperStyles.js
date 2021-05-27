import { css } from '@emotion/core';
import * as global from '../../globalStyles';

export const container = (isHidden) => css`
  position: fixed;
  bottom: 0;
  background-color: #FF9;
  width: 100%;
  height: 60px;

  p, span {
    font: 14px Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 4px;
  }

  ${isHidden && css`
    height: 0;
  `}
`;

export const closeButton = (isHidden) => css`
  height: 20px;
  width: 20px;
  background-color: #FFF;
  border: 1px solid black;
  text-align: center;
  position: absolute;
  right: 5px;
  top: 5px;

  &:before {
    content: "X";
  }

  ${isHidden && css`
    bottom: 5px;
    top: auto;
    &::before {
      content: "^";
    }
`}
`;