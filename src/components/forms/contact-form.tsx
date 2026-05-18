"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollSection } from "@/components/motion/scroll-section";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-md border-0 bg-surface px-4 py-3.5 text-sm text-brand-navy placeholder:text-brand-navy/35 outline-none focus:ring-2 focus:ring-brand-navy/15";

const labelClass = "text-sm font-medium text-brand-navy";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agree) return;

    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      subject: String(form.get("subject") ?? "") || undefined,
      targetBudget: String(form.get("budget") ?? "") || undefined,
      message: String(form.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError(t("submitError"));
        return;
      }
      setSuccess(true);
      e.currentTarget.reset();
      setAgree(false);
    } catch {
      setError(t("submitError"));
    } finally {
      setLoading(false);
    }
  }

  function RequiredLabel({
    children,
    required,
  }: {
    children: React.ReactNode;
    required?: boolean;
  }) {
    return (
      <span className={labelClass}>
        {children}
        {required ? (
          <span className="ms-1 font-normal text-brand-navy/45">
            {t("required")}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <ScrollSection preset="contact-form" as="section" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 lg:max-w-3xl lg:px-8">
        <p className="text-sm text-brand-navy/45">{t("formLabel")}</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {t("formTitle")}
        </h2>
        <form className="mt-10 space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block space-y-2">
              <RequiredLabel required>{t("firstName")}</RequiredLabel>
              <input
                className={field}
                required
                name="firstName"
                placeholder={t("firstName")}
              />
            </label>
            <label className="block space-y-2">
              <RequiredLabel required>{t("lastName")}</RequiredLabel>
              <input
                className={field}
                required
                name="lastName"
                placeholder={t("lastName")}
              />
            </label>
          </div>
          <label className="block space-y-2">
            <RequiredLabel required>{t("email")}</RequiredLabel>
            <input
              className={field}
              required
              type="email"
              name="email"
              placeholder="mail@example.com"
            />
          </label>
          <label className="block space-y-2">
            <RequiredLabel required>{t("phone")}</RequiredLabel>
            <input
              className={field}
              required
              name="phone"
              type="tel"
              placeholder="+966…"
              dir="ltr"
            />
          </label>
          <label className="block space-y-2">
            <RequiredLabel>{t("subject")}</RequiredLabel>
            <select
              className={cn(field, "appearance-none bg-surface")}
              name="subject"
              defaultValue=""
            >
              <option value="" disabled>
                {t("chooseSubject")}
              </option>
              <option value="sales">{t("subjectSales")}</option>
              <option value="press">{t("subjectPress")}</option>
            </select>
          </label>
          <label className="block space-y-2">
            <RequiredLabel>{t("budget")}</RequiredLabel>
            <select
              className={cn(field, "appearance-none bg-surface")}
              name="budget"
              defaultValue=""
            >
              <option value="">{t("budgetPh")}</option>
              <option value="1-3">{t("budget13")}</option>
              <option value="3+">{t("budget3plus")}</option>
            </select>
          </label>
          <label className="block space-y-2">
            <RequiredLabel required>{t("message")}</RequiredLabel>
            <textarea
              className={cn(field, "min-h-[150px] resize-y")}
              required
              name="message"
            />
          </label>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-brand-navy/75">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 size-4 rounded border-brand-navy/25"
            />
            <span>{t("agree")}</span>
          </label>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700" role="status">
              {t("submitSuccess")}
            </p>
          )}
          <button
            type="submit"
            disabled={!agree || loading}
            className="inline-flex h-12 w-full items-center justify-center bg-black px-12 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-black/90 disabled:opacity-50 sm:w-auto"
          >
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </ScrollSection>
  );
}
