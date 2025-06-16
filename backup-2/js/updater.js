import { jsonData, currentType } from './state.js';

export function addOrUpdateEntry(key, url, volume = null) {
  if (currentType === 'pictures') {
    jsonData.pictures[key] = url;
  } else if (currentType === 'videos') {
    jsonData.videos[key] = volume !== null ? { url, volume } : { url };
  }
}