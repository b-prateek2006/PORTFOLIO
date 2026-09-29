"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { sendMessage, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-fg placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400";

// useActionState sends the form to the server action and gives back its
// result (success, or errors per field) plus `pending` while it is sending.
export function ContactForm({ services }: { services: string[] }) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const err = state.fieldErrors ?? {};
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col justify-center rounded-xl border border-accent/50 bg-surface p-8"
      >
        <p className="font-display text-4xl uppercase">Message sent<span className="text-accent">.</span></p>
        <p className="mt-3 text-muted">Thanks! I&apos;ll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={err.name} id="name">
          <input id="name" name="name" autoComplete="name" required defaultValue={v.name} aria-invalid={!!err.name} aria-describedby={err.name ? "name-error" : undefined} className={inputClass} />
        </Field>
        <Field label="Email" error={err.email} id="email">
          <input id="email" name="email" type="email" autoComplete="email" required defaultValue={v.email} aria-invalid={!!err.email} aria-describedby={err.email ? "email-error" : undefined} className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Service" id="service">
          <select id="service" name="service" defaultValue={v.service ?? ""} className={inputClass}>
            <option value="">Choose…</option>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
            <option>Something else</option>
          </select>
        </Field>
        <Field label="Budget" id="budget" optional>
          <input id="budget" name="budget" placeholder="₹" defaultValue={v.budget} className={inputClass} />
        </Field>
        <Field label="Date" id="date" optional>
          <input id="date" name="date" type="date" defaultValue={v.date} className={inputClass} />
        </Field>
      </div>

      <Field label="Message" error={err.message} id="message">
        <textarea id="message" name="message" rows={5} required defaultValue={v.message} placeholder="What are we making?" aria-invalid={!!err.message} aria-describedby={err.message ? "message-error" : undefined} className={`${inputClass} resize-y`} />
      </Field>

      {/* Honeypot: hidden from people, bots fill it and get ignored. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-400">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-6 py-4 font-semibold text-black transition-all hover:scale-[1.02] disabled:scale-100 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  id,
  error,
  optional,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-muted">
        {label} {optional && <span className="text-muted/60">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
