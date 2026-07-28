import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Lütfen adınızı ve soyadınızı girin."),
  contact: z
    .string()
    .trim()
    .min(5, "Lütfen bir e-posta adresi veya telefon numarası girin."),
  message: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalıdır."),
  // Honeypot field: must stay empty. Bots that auto-fill every field will
  // populate this, letting us silently reject the submission client-side.
  "bot-field": z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const registrationFormSchema = z.object({
  name: z.string().trim().min(2, "Lütfen adınızı ve soyadınızı girin."),
  phone: z.string().trim().min(7, "Lütfen geçerli bir telefon numarası girin."),
  email: z.string().trim().email("Lütfen geçerli bir e-posta adresi girin."),
  interest: z.enum(["ozel-ders", "grup-dersi", "atolye"], {
    message: "Lütfen bir ilgi alanı seçin.",
  }),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    error: "Devam etmek için KVKK aydınlatma metnini onaylamanız gerekir.",
  }),
  "bot-field": z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export const interestOptions: Record<RegistrationFormValues["interest"], string> = {
  "ozel-ders": "Özel Ders",
  "grup-dersi": "Grup Dersi",
  atolye: "Atölye Çalışması",
};
