"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-md border border-transparent bg-surface px-4 py-3 text-sm text-primary placeholder:text-primary/40 outline-none ring-1 ring-primary/10 focus:ring-2 focus:ring-primary/30";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [agree, setAgree] = useState(false);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-xl px-4 lg:px-8">
        <p className="text-sm text-primary/45">{t("formLabel")}</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">
          {t("formTitle")}
        </h2>
        <form
          className="mt-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-primary">
                {t("firstName")} *
              </span>
              <input
                className={field}
                required
                name="firstName"
                placeholder={t("firstName")}
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-primary">
                {t("lastName")} *
              </span>
              <input
                className={field}
                required
                name="lastName"
                placeholder={t("lastName")}
              />
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-primary">
              {t("email")} *
            </span>
            <input
              className={field}
              required
              type="email"
              name="email"
              placeholder="mail@example.com"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-primary">
              {t("phone")} *
            </span>
            <input
              className={field}
              required
              name="phone"
              type="tel"
              placeholder="+966…"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-primary">
              {t("subject")}
            </span>
            <select
              className={cn(field, "appearance-none")}
              name="subject"
              defaultValue=""
            >
              <option value="" disabled>
                {t("chooseSubject")}
              </option>
              <option value="sales">Sales</option>
              <option value="press">Press</option>
            </select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-primary">
              {t("budget")}
            </span>
            <select
              className={cn(field, "appearance-none")}
              name="budget"
              defaultValue=""
            >
              <option value="">{t("budgetPh")}</option>
              <option value="1-3">1M — 3M</option>
              <option value="3+">3M+</option>
            </select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-primary">
              {t("message")} *
            </span>
            <textarea
              className={cn(field, "min-h-[140px] resize-y")}
              required
              name="message"
            />
          </label>
          <label className="flex cursor-pointer items-start gap-3 text-sm text-primary/80">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 size-4 rounded border-primary/30"
            />
            <span>{t("agree")}</span>
          </label>
          <button
            type="submit"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-md sm:w-auto sm:px-12",
            )}
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
