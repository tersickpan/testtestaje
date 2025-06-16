import { jsonData } from './state.js';

export async function fetchJSON(type) {
  const response = await fetch(`https://raw.githubusercontent.com/tersickpan/testtestaje/refs/heads/main/${type}.json`);
  jsonData[type] = await response.json();
}
