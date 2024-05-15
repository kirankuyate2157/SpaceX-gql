function extractVideoId(url) {
    // Match the video ID from the YouTube URL
    const match = url?.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
    );
    return match ? match[1] : null;
  }
  function YouTubeVideo({ videoId }) {
    const embedUrl = `https://www.youtube.com/embed/${extractVideoId(videoId)}`;
  
    return (
      <div>
        <iframe
          className=' w-full'
          // width="150"
          maxWidth='180'
          height='110'
          src={embedUrl}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe>
      </div>
    );
  }

  export default YouTubeVideo;