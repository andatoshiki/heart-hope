import { useState, type SyntheticEvent } from "react";
import "../../styles/islands.css";

export default function ContactFormDemo() {
  const [status, setStatus] = useState("");

  const submit = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus(
      form.checkValidity()
        ? "Thank you. Your message is ready for this showcase."
        : "Please complete the required fields.",
    );
  };

  return (
    <form className="contact-demo" noValidate onSubmit={submit}>
      <label htmlFor="contact-name">YOUR NAME</label>
      <input id="contact-name" required placeholder="How should we call you?" />
      <label htmlFor="contact-email">EMAIL ADDRESS</label>
      <input
        id="contact-email"
        required
        type="email"
        placeholder="To contact you"
      />
      <label htmlFor="contact-subject">SUBJECT</label>
      <input id="contact-subject" required placeholder="What is it about?" />
      <label htmlFor="contact-message">MESSAGE CONTENT</label>
      <textarea
        id="contact-message"
        required
        placeholder="Please write down your thoughts…"
      />
      <button type="submit">SEND MESSAGE &nbsp; ↗</button>
      <p className="island-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
