"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  registrationFormSchema,
  interestOptions,
  type RegistrationFormValues,
} from "@/lib/forms";
import { submitToNetlify } from "@/lib/netlify-forms";

type Status = "idle" | "submitting" | "success" | "error";

export function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: "grup-dersi",
      notes: "",
      consent: undefined,
      "bot-field": "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    if (values["bot-field"]) return;

    setStatus("submitting");
    try {
      await submitToNetlify("kayit", {
        name: values.name,
        phone: values.phone,
        email: values.email,
        interest: interestOptions[values.interest],
        notes: values.notes ?? "",
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
        Kayıt talebiniz alındı! Ekibimiz en kısa sürede sizinle iletişime
        geçecektir.
      </p>
    );
  }

  return (
    <form
      name="kayit"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      <input type="hidden" name="form-name" value="kayit" />
      <p className="hidden">
        <label>
          Bu alanı boş bırakın: <input {...register("bot-field")} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-name" className="block text-sm font-medium text-brand-800">
            Ad Soyad
          </label>
          <input
            id="reg-name"
            type="text"
            autoComplete="name"
            className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-phone" className="block text-sm font-medium text-brand-800">
            Telefon
          </label>
          <input
            id="reg-phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-700">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-medium text-brand-800">
          E-posta
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="reg-interest" className="block text-sm font-medium text-brand-800">
          İlgi Alanı
        </label>
        <select
          id="reg-interest"
          className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          {...register("interest")}
        >
          {Object.entries(interestOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="reg-notes" className="block text-sm font-medium text-brand-800">
          Notunuz (opsiyonel)
        </label>
        <textarea
          id="reg-notes"
          rows={3}
          className="mt-1 block w-full rounded-md border border-brand-200 bg-cream-50 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          {...register("notes")}
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="reg-consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-brand-300"
          aria-invalid={!!errors.consent}
          {...register("consent")}
        />
        <label htmlFor="reg-consent" className="text-sm text-brand-900/80">
          <Link href="/gizlilik-politikasi" className="underline">
            KVKK aydınlatma metnini
          </Link>{" "}
          okudum, kişisel verilerimin işlenmesini onaylıyorum.
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-700">{errors.consent.message}</p>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          Kayıt talebiniz gönderilemedi. Lütfen tekrar deneyin ya da doğrudan{" "}
          <a className="underline" href="mailto:efedanszeybek@gmail.com">
            e-posta
          </a>{" "}
          gönderin.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-olive-500 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-olive-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Gönderiliyor…" : "Kayıt Talebi Gönder"}
      </button>
    </form>
  );
}
