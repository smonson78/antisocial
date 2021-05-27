import { css } from '@emotion/core';

export const content = css`
  padding: 30px 0;
`;

export const table = css`
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

export const tableHead = css`
  th {
    border: 1px solid #ddd;
    padding: 8px;
    padding-top: 6px;
    padding-bottom: 6px;
    text-align: left;
    background-color: #f33;
    color: white;
  }
`;

export const tableData = css`
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
`;

export const imageCell = css`
  margin: 0;
  padding: 3px;
`;

export const form = css`
  margin: 40px 0;
  min-width: 600px;
  min-height: 400px;
  background-color: white;
`;

export const formTitle = css`
  text-align: center;
  padding-top: 12px;
  font-size: 20px;
`;

export const formBody = css`
  padding: 10px;
`;

export const formHeading = css`
  position: relative;
  border-bottom: 1px solid #888;
  height: 48px;
`;

export const formCloseButton = css`
  position: absolute;
  top: 8px;
  left: 8px;
  height: 32px;
  background-color: #FCC;
  outline: 0;
`;

export const formLabel = css`
  display: inline-block;
  width: 275px;
  position: relative;
`;

export const formLabelImageThumbnail = css`
  display: inline-block;
  width: 175px;
  vertical-align: top;
`;

export const formFieldContainer = css`
  margin: 6px 0;
`;

export const formInput = css`
  position: absolute;
  top: 2px;
  left: 275px;
`;

export const formFileInput = css`
`;

export const formFileClearButton = css`
  margin: 0;
`;

export const formSubmit = css`
  margin-top: 10px;
`;

export const thumbnailImage = css`
  display: block;
  width: 64px;
  height: 64px;
`;

export const thumbnailList = css`
  margin: 0;
`;

export const thumbnailListItem = css`
  display: inline-block;
  padding-left: 3px;
  vertical-align: bottom;
`;