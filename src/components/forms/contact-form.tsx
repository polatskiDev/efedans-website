"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/forms";
import { submitToNetlify } from "@/lib/netlify-forms";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", contact: "", message: "", "bot-field": "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    // Silently drop bot submissions instead of surfacing an error.
    if (values["bot-field"]) return;

    setStatus("submitting");
    try {
      await submitToNetlify("iletisim", {
        name: values.name,
        contact: values.contact,
        message: values.message,
      });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-md bg-olive-100 p-4 text-sm text-olive-800"
      >
        Mesajınız için teşekkür ederiz! En kısa sürede size dönüş yapacağız.
      </p>
    );
  }

  return (
    <form
      name="iletisim"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      {/* Netlify build-time form detection requires these hidden fields. */}
      <input type="hidden" name="form-name" value="iletisim" />
      <p className="hidden">
        <label>
          Bu alanı boş bırakın: <input {...register("bot-field")} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-brand-800">
          Ad Soyad
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-sm text-red-700">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-contact" className="block text-sm font-medium text-brand-800">
          E-posta veya Telefon
        </label>
        <input
          id="contact-contact"
          type="text"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "contact-contact-error" : undefined}
          {...register("contact")}
        />
        {errors.contact && (
          <p id="contact-contact-error" className="mt-1 text-sm text-red-700">
            {errors.contact.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-brand-800">
          Mesajınız
        </label>
        <textarea
          id="contact-message"
          rows={4}
          className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-sm text-red-700">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Mesajınız gönderilemedi. Lütfen tekrar deneyin ya da doğrudan{" "}
          <a className="underline" href="mailto:efedanszeybek@gmail.com">
            e-posta
          </a>{" "}
          gönderin.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
