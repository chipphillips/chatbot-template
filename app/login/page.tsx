"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [accessKey, setAccessKey] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError("")

    const response = await fetch("/api/private-session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ accessKey }),
    })

    setBusy(false)
    if (!response.ok) {
      setError("Access key was not accepted.")
      return
    }

    router.replace("/")
    router.refresh()
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
      <form className="w-full space-y-4 rounded-2xl border p-6" onSubmit={submit}>
        <div>
          <h1 className="text-xl font-semibold">Founder Console</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter the private deployment access key. It is stored only in an HttpOnly session cookie.
          </p>
        </div>
        <input
          aria-label="Private access key"
          autoComplete="current-password"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          onChange={(event) => setAccessKey(event.target.value)}
          type="password"
          value={accessKey}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button className="w-full" disabled={busy || accessKey.length === 0} type="submit">
          {busy ? "Checking…" : "Open console"}
        </Button>
      </form>
    </main>
  )
}
