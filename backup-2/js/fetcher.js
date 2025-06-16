import { jsonData } from './state.js';

export async function fetchJSON(type) {
  // const response = await fetch(`https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/${type}.json`);
  const response = await fetch(`../../${type}.json`);
  jsonData[type] = await response.json();
}
