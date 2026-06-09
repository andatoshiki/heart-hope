import { useRef, useState } from "react";
import "../../styles/islands.css";

type SubmissionMode = "PHOTO" | "TEXT" | "SOUND";

const modes: SubmissionMode[] = ["PHOTO", "TEXT", "SOUND"];

export default function CorridorSubmissionDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<SubmissionMode>("PHOTO");
  const [status, setStatus] = useState("");

  const openDialog = () => {
    setStatus("");
    dialogRef.current?.showModal();
  };

  const closeDialog = () => dialogRef.current?.close();

  const submit = () => {
    setStatus(`Your ${mode.toLowerCase()} glimpse is ready for this showcase.`);
  };

  return (
    <>
      <button className="dialog-trigger" type="button" onClick={openDialog}>
        Share Your Glimpse
      </button>
      <dialog
        className="corridor-dialog"
        ref={dialogRef}
        aria-labelledby="corridor-dialog-title"
        onClose={() => setStatus("")}
      >
        <h2 id="corridor-dialog-title">Contribute to the Corridor</h2>
        <div className="corridor-dialog__modes">
          {modes.map((item) => (
            <button
              className="corridor-dialog__mode"
              key={item}
              type="button"
              aria-pressed={mode === item}
              onClick={() => setMode(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <textarea
          aria-label={`Share a ${mode.toLowerCase()} contribution`}
          placeholder="Share a small piece of your world…"
        />
        <p className="island-status" aria-live="polite">
          {status}
        </p>
        <div className="corridor-dialog__actions">
          <button
            className="corridor-dialog__cancel"
            type="button"
            onClick={closeDialog}
          >
            CANCEL
          </button>
          <button
            className="corridor-dialog__submit"
            type="button"
            onClick={submit}
          >
            SUBMIT
          </button>
        </div>
      </dialog>
    </>
  );
}
