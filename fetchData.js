window.addEventListener('DOMContentLoaded', async () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');

    if (dataFetched) return;

    try {
        const resPic = await fetch(`https://raw.githubusercontent.com/tersickpan/testtestaje/refs/heads/main/pictures.json`);
        jsonData.pictures = await resPic.json();
    
       const resVid = await fetch(`https://raw.githubusercontent.com/tersickpan/testtestaje/refs/heads/main/videos.json`);
       jsonData.videos = await resVid.json();
    
       dataFetched = true;
    
       // Hide loading, show content
       loadingScreen.style.display = 'none';
       mainContent.style.display = 'block';
     } catch (error) {
       loadingScreen.textContent = 'Failed to load data.';
       console.error('Fetch error:', error);
    }
});

