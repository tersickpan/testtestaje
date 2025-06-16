import { currentType, jsonData } from './state.js';
import { fetchJSON } from './fetcher.js';
import { addOrUpdateEntry } from './updater.js';
import { uploadJSON } from './uploader.js';
import { renderJSON } from './ui-common.js';

window.addEventListener('DOMContentLoaded', async () => {
  await fetchJSON(currentType);
  setupForm();
});

function setupForm() {
  document.getElementById('apply-btn').onclick = () => {
    const base = document.getElementById('base-key').value.trim();
    const url = document.getElementById('url').value.trim();
    const vol = document.getElementById('volume').value.trim();
    const suffix = Object.keys(jsonData[currentType])
      .filter(k => k.startsWith(base))
      .length + 1;
    const key = `${base}-${String(suffix).padStart(2, '0')}`;
    addOrUpdateEntry(key, url, vol ? parseFloat(vol) : null);
    renderJSON(jsonData[currentType]);
  };
  document.getElementById('upload-btn').onclick = () => uploadJSON(currentType);
}