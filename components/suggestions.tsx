"use client"

import { Button } from "@/components/ui/button"

const suggestions = [
  {
    label: "Wilson brief",
    prompt:
      "Create a Wilson Lumber onboarding brief as an artifact, then assign follow-up work to the Constructiv Product Agent.",
  },
  {
    label: "Claude prompt",
    prompt:
      "Turn my current goal into a Master Execution Prompt for Claude Code and save it as an artifact.",
  },
  {
    label: "Schema plan",
    prompt:
      "Help me design the safest Supabase setup for chat persistence. Ask only the questions that materially change the schema.",
  },
  {
    label: "Agent tasks",
    prompt:
      "Break my current Constructiv priorities into sub-agent tasks with acceptance criteria.",
  },
]

export function Suggestions({
  onSelect,
}: {
  onSelect: (prompt: string) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion.prompt)}
        >
          {suggestion.label}
        </Button>
      ))}
    </div>
  )
}
