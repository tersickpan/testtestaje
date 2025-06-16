import { currentType, jsonData } from './state.js';
import { fetchJSON } from './fetcher.js';
import { addOrUpdateEntry } from './updater.js';
import { uploadJSON } from './uploader.js';
import { renderJSON } from './ui-common.js';

window.addEventListener('DOMContentLoaded', async () => {
  await fetchJSON(currentType);
  renderEditForm();
});

function renderEditForm() {
  const container = document.getElementById('edit-form');
  const keys = Object.keys(jsonData[currentType]);
  const baseKeys = [...new Set(keys.map(k => k.split('-')[0]))];

  container.innerHTML = \`
    <label>Base Key:
      <select id="base-key">
        \${baseKeys.map(k => \`<option value="\${k}">\${k}</option>\`).join('')}
      </select>
    </label><br>
    <label>Entry:
      <select id="entry-key"></select>
    </label><br>
    <label>URL: <input type="text" id="url"></label><br>
    <label>Volume (optional): <input type="number" step="0.01" id="volume"></label><br>
    <button id="apply-btn">Apply</button>
  \`;

  const baseSelect = document.getElementById('base-key');
  const entrySelect = document.getElementById('entry-key');
  const updateEntryList = () => {
    const base = baseSelect.value;
    const options = keys.filter(k => k.startsWith(base + '-'));
    entrySelect.innerHTML = options.map(k => \`<option value="\${k}">\${k}</option>\`).join('');
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