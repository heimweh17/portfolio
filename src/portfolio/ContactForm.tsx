import { useState, type FormEvent } from "react";
import { contactEndpoint } from "../contactEndpoint";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === "sending") return;

    const fields = new FormData(form);
    const message = String(fields.get("message") ?? "").trim();
    if (!message) {
      const input = form.elements.namedItem("message") as HTMLTextAreaElement;
      input.setCustomValidity("Write a message before sending.");
      input.reportValidity();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fields.get("name") ?? "").trim(),
          email: String(fields.get("email") ?? "").trim(),
          message,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Message request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="folio-contact-form" onSubmit={sendMessage}>
      <fieldset disabled={status === "sending"}>
        <legend>Leave a message</legend>
        <div className="folio-contact-fields">
          <label>Name <span>(optional)</span><input name="name" autoComplete="name" maxLength={100} /></label>
          <label>Email <span>(for a reply)</span><input name="email" type="email" autoComplete="email" maxLength={254} /></label>
        </div>
        <label>Message<textarea name="message" rows={4} maxLength={4000} required onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
        <button className="folio-button" type="submit">{status === "sending" ? "Sending…" : "Send message"}</button>
      </fieldset>
      <p className="folio-form-status" role="status">
        {status === "sent" && "Thanks for reaching out. Your message was sent."}
        {status === "error" && "I couldn’t send your message. Try again or use the email link."}
      </p>
    </form>
  );
}
