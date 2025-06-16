import { currentType, jsonData } from './state.js';
import { fetchJSON } from './fetcher.js';
import { addOrUpdateEntry } from './updater.js';
import { uploadJSON } from './uploader.js';
import { renderJSON } from './ui-common.js';

const typeSelect = document.getElementById('type');

// window.addEventListener('DOMContentLoaded', async () => {
//   await fetchJSON(currentType);
//   setupEditForm();
// });

typeSelect.addEventListener('change', async (data) => {
  currentType = typeSelect.value;
  if(!currentType) return;
  await fetchJSON(currentType);
  setupForm();
});

function setupEditForm() {
  const baseSelect = document.getElementById('base-key');
  const entrySelect = document.getElementById('entry-key');
  const keys = Object.keys(jsonData[currentType]);
  const baseKeys = [...new Set(keys.map(k => k.split('-')[0]))];

  baseSelect.innerHTML = baseKeys.map(k => `<option value="${k}">${k}</option>`).join('');


  const updateEntryList = () => {
    const base = baseSelect.value;
    const options = keys.filter(k => k.startsWith(base + '-'));
    entrySelect.innerHTML = options.map(k => `<option value="${k}">${k}</option>`).join('');
    populateEntryForm();
  };

  const populateEntryForm = () => {
    const key = entrySelect.value;
    const entry = jsonData[currentType][key];
    document.getElementById('url').value = currentType === 'pictures' ? entry : entry.url;
    document.getElementById('volume').value = currentType === 'videos' && entry.volume ? entry.volume : '';
  };

  baseSelect.onchange = updateEntryList;
  entrySelect.onchange = populateEntryForm;
  updateEntryList();

  document.getElementById('apply-btn').onclick = () => {
    const key = entrySelect.value;
    const url = document.getElementById('url').value.trim();
    const vol = document.getElementById('volume').value.trim();
    addOrUpdateEntry(key, url, vol ? parseFloat(vol) : null);
    renderJSON(jsonData[currentType]);
  };

  document.getElementById('upload-btn').onclick = () => uploadJSON(currentType);
}