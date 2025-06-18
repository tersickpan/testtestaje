const typeSelect = document.getElementById('type');
const newDataForm = document.getElementById('new-data-form');
const dataForm = document.getElementById('data-form');
const baseSelect = document.getElementById('base-key');
const volumeSection = document.getElementById('volumeSection');
const newBaseKey = document.getElementById('new-base-key');
const entrySelect = document.getElementById('entry-key');

let allKeysByBase = {};

typeSelect.addEventListener('change', () => {
    currentType = typeSelect.value;
    if(!currentType) {
        allKeysByBase = {};
        //ensure hilangkan form bawah
        newDataForm.style.display = 'none';
        dataForm.style.display = 'none';
        return;
    }

    newDataForm.style.display = 'block';
    dataForm.style.display = 'block';
    volumeSection.style.display = currentType === 'videos' ? 'block' : 'none';

    populateBaseKey();
})

newBaseKey.addEventListener('change', () => {
    baseSelect.innerHTML = '';
    entrySelect.innerHTML = '';
    document.getElementById('url').value = '';
    document.getElementById('volume').value = '';

    populateBaseKey();
})

// Group keys by base
function populateBaseKey() {
    if(newBaseKey.value) return;
    
    const keys = Object.keys(jsonData[currentType]);
    const allKeysByBase = [...new Set(keys.map(k => k.split('-')[0]))];

    baseSelect.innerHTML = allKeysByBase.map(k => `<option value="${k}">${k}</option>`).join('');

    const updateEntryList = () => {
        if(currentPage === 'add') {
            entrySelect.innerHTML = '';
            entrySelect.disabled = true;
        } else if(currentPage === 'edit') {
            entrySelect.disabled = false;
        }

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
}