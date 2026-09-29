"use server";

// Server Action: this code runs only on the server (Vercel), never in the
// visitor's browser, so the Resend API key stays secret.

import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email.").max(200),
  service: z.string().trim().max(100),
  budget: z.string().trim().max(100),
  date: z.string().trim().max(50),
  message: z.string().trim().min(10, "Tell me a little more (at least 10 characters).").max(5000),
});

type Field = keyof z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  /** Sent back on error so the form keeps what the visitor typed. */
  values?: Partial<Record<Field, string>>;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: a hidden field real people never fill. Bots do. Pretend success.
  if (formData.get("company")) return { status: "success" };

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? "").trim(),
    service: String(formData.get("service") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    date: String(formData.get("date") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const key of Object.keys(errors) as Field[]) fieldErrors[key] = errors[key]?.[0];
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local");
    return {
      status: "error",
      message: "The form isn't connected yet. Please reach me on WhatsApp or email instead.",
      values,
    };
  }

  const d = parsed.data;
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: d.email,
    subject: `New enquiry from ${d.name}${d.service ? ` (${d.service})` : ""}`,
    text: [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Service: ${d.service || "-"}`,
      `Budget: ${d.budget || "-"}`,
      `Date: ${d.date || "-"}`,
      "",
      d.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return { status: "error", message: "Something went wrong. Please try WhatsApp or email.", values };
  }
  return { status: "success" };
}
