import { useMemo, useState } from "react";
import {
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiSendPlane2Line,
  RiTerminalBoxLine,
  RiCheckLine,
  RiGithubLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";
import { personalInfo } from "@data/data";

const iconBySocialId = {
  github: <RiGithubLine className="h-5 w-5" />,
  linkedin: <RiLinkedinBoxLine className="h-5 w-5" />,
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const contactItems = useMemo(
    () => [
      {
        id: "email",
        label: "Email",
        value: personalInfo.email,
        icon: <RiMailLine className="h-5 w-5" />,
        href: `mailto:${personalInfo.email}`,
      },
      {
        id: "phone",
        label: "Phone",
        value: personalInfo.phone,
        icon: <RiPhoneLine className="h-5 w-5" />,
        href: `tel:${(personalInfo.phone || "").replace(/\D/g, "")}`,
      },
      {
        id: "location",
        label: "Location",
        value: personalInfo.location,
        icon: <RiMapPinLine className="h-5 w-5" />,
      },
    ].filter((item) => item.value),
    []
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setStatusMessage("All fields are required.");
      return;
    }

    setStatus("sending");
    setStatusMessage("");

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
      source: "portfolio-contact-form",
    };

    const apiEndpoint = import.meta.env.VITE_CONTACT_API_URL;

    try {
      if (apiEndpoint) {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Contact API failed with status ${response.status}`);
        }

        setStatus("success");
        setStatusMessage("Message sent successfully.");
        setForm({ name: "", email: "", message: "" });
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${payload.name}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

      setStatus("success");
      setStatusMessage("Your email app was opened with a pre-filled message.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setStatusMessage("Could not send the message. Please email me directly.");
      console.error("[contact] submit failed:", error);
    }
  };

  return (
    <section id="terminal" className="mx-auto w-full max-w-[1200px] scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center gap-4">
        <RiTerminalBoxLine className="h-6 w-6 text-cyan-100" />
        <h2 className="font-display text-3xl font-semibold text-[#f2f6ff]">Contact</h2>
        <div className="ml-2 h-px flex-1 bg-cyan-200/20" />
      </div>

      <div className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-5">
        <div className="glass-card rounded-xl border border-cyan-200/20 bg-white/5 p-6 lg:col-span-3">
          <p className="mb-2 font-mono text-xs tracking-[0.1em] text-cyan-100/80">LET'S BUILD SOMETHING PRACTICAL</p>
          <p className="mb-6 text-sm text-[#c4d0ec]"></p>

          {status === "success" && (
            <div className="mb-5 flex items-start gap-2 rounded-lg border border-emerald-400/40 bg-emerald-900/20 p-3 text-sm text-emerald-300">
              <RiCheckLine className="mt-0.5 h-4 w-4" />
              {statusMessage || "Message sent successfully."}
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 rounded-lg border border-red-400/40 bg-red-900/20 p-3 text-sm text-red-300">
              {statusMessage || "Could not send your message."}
            </div>
          )}

          {status === "sending" && (
            <div className="mb-5 rounded-lg border border-cyan-300/40 bg-cyan-900/20 p-3 text-sm text-cyan-200">
              Sending your message...
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="Your name"
              className="w-full rounded-lg border border-white/20 bg-[#0a1121] px-4 py-3 text-sm text-[#e5eeff] outline-none transition-colors placeholder:text-[#7f91be] focus:border-cyan-200/70"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
              className="w-full rounded-lg border border-white/20 bg-[#0a1121] px-4 py-3 text-sm text-[#e5eeff] outline-none transition-colors placeholder:text-[#7f91be] focus:border-cyan-200/70"
            />
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              placeholder="Tell me about your project or role"
              className="w-full resize-none rounded-lg border border-white/20 bg-[#0a1121] px-4 py-3 text-sm text-[#e5eeff] outline-none transition-colors placeholder:text-[#7f91be] focus:border-cyan-200/70"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-gradient-to-r from-cyan-300 to-blue-300 px-7 py-3 font-mono text-xs tracking-[0.1em] text-[#111527] transition-opacity hover:opacity-90"
            >
              <RiSendPlane2Line className="h-4 w-4" />
              {status === "sending" ? "SENDING..." : "SEND_MESSAGE"}
            </button>
          </form>
        </div>

        <div className="space-y-4 lg:col-span-2">
          {contactItems.map((item) => {
            const content = (
              <div className="glass-card flex items-start gap-3 rounded-xl border border-cyan-200/20 bg-white/5 p-4">
                <span className="mt-0.5 text-cyan-100">{item.icon}</span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#95a8d5]">{item.label}</p>
                  <p className="text-sm text-[#e8efff]">{item.value}</p>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a key={item.id} href={item.href} className="block transition-opacity hover:opacity-90">
                  {content}
                </a>
              );
            }

            return <div key={item.id}>{content}</div>;
          })}

          <div className="glass-card rounded-xl border border-violet-200/25 bg-white/5 p-4">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-violet-100/80">Profiles</p>
            <div className="space-y-2">
              {personalInfo.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-[#dce7ff] transition-colors hover:text-cyan-200"
                >
                  {iconBySocialId[social.id] || <RiMailLine className="h-5 w-5" />}
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
