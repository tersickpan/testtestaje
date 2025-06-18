const applyButton = document.getElementById('apply-btn');

applyButton.addEventListener('click', () => {
    let currentBase = '';
    let key = '';

    // Tambah base key(orang) baru
    if(currentPage === 'add' && newBaseKey.value) {
        currentBase = newBaseKey.value.trim();
    } else {
        currentBase = baseSelect.value.trim();
    }

    const url = document.getElementById('url').value.trim();
    const vol = document.getElementById('volume').value.trim();
    const volume = vol ? parseFloat(vol) : null;
    const suffix = Object.keys(jsonData[currentType])
      .filter(k => k.startsWith(currentBase))
      .length + 1;
    if(currentPage === 'add') {
        key = `${currentBase}-${String(suffix).padStart(2, '0')}`;
    } else if(currentPage === 'edit') {
        key = entrySelect.value;
    }

    if (currentType === 'pictures') {
        jsonData.pictures[key] = { url };
    } else if (currentType === 'videos') {
        jsonData.videos[key] = volume !== null ? { url, volume } : { url };
    }

    const sortedJsonData = Object.fromEntries(
        Object.entries(jsonData[currentType]).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    );
    
    renderJSON(sortedJsonData);
    populateBaseKey();
})

function renderJSON(data) {
    const output = document.getElementById('json-output');
    if (output) output.textContent = JSON.stringify(data, null, 2);
}