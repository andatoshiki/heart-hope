import { useState } from "react";
import "../../styles/islands.css";

export default function ActivityActions() {
  const [liked, setLiked] = useState(false);
  const [status, setStatus] = useState("");

  const share = async () => {
    const shareData = {
      title: document.title,
      text: "Draw the Music from HeArt To Heart",
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      setStatus("Shared");
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setStatus("Link copied");
  };

  return (
    <div>
      <div className="activity-actions">
        <button type="button" onClick={() => setLiked((current) => !current)}>
          ♡ &nbsp; {liked ? "LIKED" : "LIKE"}
        </button>
        <button type="button" onClick={share}>
          ↗ &nbsp; SHARE
        </button>
      </div>
      <span className="visually-hidden" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
