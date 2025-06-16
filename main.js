    const typeSelect = document.getElementById('type');
    const baseKeyInput = document.getElementById('base-key');
    const baseKeyList = document.getElementById('base-key-list');
    const existingKeySelect = document.getElementById('existing-key');
    const keySection = document.getElementById('key-select-section');
    const editSection = document.getElementById('edit-section');
    const formSection = document.getElementById('form-section');
    const addNewBtn = document.getElementById('add-new');
    const editExistingBtn = document.getElementById('edit-existing');
    const urlInput = document.getElementById('url');
    const volumeInput = document.getElementById('volume');
    const volumeSection = document.getElementById('volume-section');
    const applyBtn = document.getElementById('apply');
    const output = document.getElementById('json-output');

    let currentType = '';
    let jsonData = {};
    let currentEditKey = '';
    let allKeysByBase = {};

    typeSelect.addEventListener('change', async () => {
      currentType = typeSelect.value;
      if (!currentType) return;

      volumeSection.style.display = currentType === 'videos' ? 'block' : 'none';
      keySection.style.display = 'none';
      editSection.style.display = 'none';
      formSection.style.display = 'none';
      output.value = '';

      try {
        const res = await fetch(`${currentType}.json`);
        jsonData = await res.json();

        // Group keys by base
        allKeysByBase = {};
        Object.keys(jsonData).forEach(k => {
          const base = k.split('-')[0];
          if (!allKeysByBase[base]) allKeysByBase[base] = [];
          allKeysByBase[base].push(k);
        });

        // Populate base key datalist
        baseKeyList.innerHTML = '';
        Object.keys(allKeysByBase).forEach(base => {
          const opt = document.createElement('option');
          opt.value = base;
          baseKeyList.appendChild(opt);
        });

        keySection.style.display = 'block';
      } catch (err) {
        alert('Failed to load JSON.');
        console.error(err);
      }
    });

    addNewBtn.addEventListener('click', () => {
      const base = baseKeyInput.value.trim();
      if (!base) return;

      const keys = allKeysByBase[base] || [];
      const nextIndex = keys.reduce((max, key) => {
        const num = parseInt(key.split('-')[1]) || 0;
        return Math.max(max, num);
      }, 0) + 1;

      currentEditKey = `${base}-${String(nextIndex).padStart(2, '0')}`;
      urlInput.value = '';
      volumeInput.value = '';
      formSection.style.display = 'block';
      editSection.style.display = 'none';
    });

    editExistingBtn.addEventListener('click', () => {
      const base = baseKeyInput.value.trim();
      if (!base || !allKeysByBase[base]) {
        alert('Base key does not exist.');
        return;
      }

      existingKeySelect.innerHTML = '';
      allKeysByBase[base].forEach(k => {
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = k;
        existingKeySelect.appendChild(opt);
      });

      editSection.style.display = 'block';
      formSection.style.display = 'none';
    });

    existingKeySelect.addEventListener('change', () => {
      const selected = existingKeySelect.value;
      if (!selected) return;

      currentEditKey = selected;
      const entry = jsonData[selected];

      if (currentType === 'pictures') {
        urlInput.value = entry;
      } else if (currentType === 'videos') {
        urlInput.value = entry.url;
        volumeInput.value = entry.volume || '';
      }

      formSection.style.display = 'block';
    });

    applyBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      const volume = parseFloat(volumeInput.value.trim());

      if (!currentEditKey || !url) {
        alert('Missing key or URL.');
        return;
      }

      if (currentType === 'pictures') {
        jsonData[currentEditKey] = url;
      } else {
        jsonData[currentEditKey] = { url };
        if (!isNaN(volume)) {
          jsonData[currentEditKey].volume = volume;
        }
      }

      output.value = JSON.stringify(jsonData, null, 2);
      alert(`✅ ${currentEditKey} updated. Copy the result manually.`);
    });