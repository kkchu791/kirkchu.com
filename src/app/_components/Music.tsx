export default function Music() {
  const tracks = [
    { title: "S Tape #1", url: "https://soundcloud.com/killakp/apple-loops-song-1" },
    { title: "S Tape #2", url: "https://soundcloud.com/killakp/s-tapes-2" },
    { title: "Malibu Intro", url: "https://soundcloud.com/killakp/malibu-intro-1" },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        My Music
      </h2>
      {tracks.map((track, index) => (
        <div key={index} style={{ marginBottom: "1.5rem" }}>
          <p style={{ marginBottom: "0.5rem" }}>{track.title}</p>
          <iframe
            width="100%"
            height="166"
            allow="autoplay"
            title={track.title}
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff5500&auto_play=false&show_comments=false&show_user=true&show_reposts=false`}
          >

          </iframe>
        </div>
      ))}
    </div>
  );
}