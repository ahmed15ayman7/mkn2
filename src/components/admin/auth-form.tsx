"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Mode = "login" | "register";

type Props = {
  mode: Mode;
};

export function AdminAuthForm({ mode }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        return;
      }
      setInfo(data.message);
      if (data.active) {
        router.push("/admin/login");
      }
    } catch {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid credentials or account not activated yet.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-primary/10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary">
          {mode === "login" ? "Admin sign in" : "Create admin account"}
        </CardTitle>
        <CardDescription>
          {mode === "login"
            ? "MKN Developments control panel"
            : "New accounts require activation unless you are the first user."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {info ? (
          <p className="rounded-md bg-accent/20 px-3 py-2 text-sm text-primary">
            {info}
          </p>
        ) : null}

        <form
          className="space-y-4"
          onSubmit={mode === "login" ? handleLogin : handleRegister}
        >
          {mode === "register" ? (
            <Field
              id="name"
              label="Full name"
              value={name}
              onChange={setName}
              type="text"
              required
            />
          ) : null}
          <Field
            id="email"
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            required
          />
          <Field
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            required
            minLength={8}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Please wait…"
              : mode === "login"
                ? "Sign in"
                : "Register"}
          </Button>
        </form>

        <div className="relative py-1">
          <OrDivider />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={loading}
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
        >
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            No account?{" "}
            <Link href="/admin/register" className="text-primary underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href="/admin/login" className="text-primary underline">
              Sign in
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type,
  required,
  minLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        autoComplete={type === "password" ? "current-password" : undefined}
      />
    </div>
  );
}

function OrDivider() {
  return (
    <>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <span className="relative mx-auto block w-fit bg-card px-2 text-xs uppercase text-muted-foreground">
        or
      </span>
    </>
  );
}
