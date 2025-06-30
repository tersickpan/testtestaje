window.addEventListener("DOMContentLoaded", async () => {
  if (dataFetched) return;

  try {
    // Start loading
    startLoadSpinner();

    const resPic = await fetch(
      `https://raw.githubusercontent.com/tersickpan/testtestaje/refs/heads/main/json/pictures.json`
    );
    jsonData.pictures = await resPic.json();

    const resVid = await fetch(
      `https://raw.githubusercontent.com/tersickpan/testtestaje/refs/heads/main/json/videos.json`
    );
    jsonData.videos = await resVid.json();

    dataFetched = true;
  } catch (err) {
    console.error("GitHub Fetch Error:", err);
    alert("❌ Failed to fetch JSON from GitHub. Check console for details.");
  } finally {
    stopLoadSpinner();
  }
});
