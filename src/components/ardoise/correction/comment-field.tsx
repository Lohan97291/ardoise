import { MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/** Champ de commentaire libre, dépliable, persisté via onSave. */
export function CommentField({
  value,
  onSave,
  className,
}: {
  value: string;
  onSave: (next: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(Boolean(value));
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
    setOpen((current) => current || Boolean(value));
  }, [value]);

  if (!open) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("text-muted-foreground", className)}
        onClick={() => setOpen(true)}
      >
        <MessageSquarePlus className="mr-1.5 h-3.5 w-3.5" />
        Commentaire
      </Button>
    );
  }

  return (
    <div className={cn("space-y-1.5", className)}>
      <Textarea
        autoFocus
        value={draft}
        placeholder="Commentaire pour cet élève sur cet exercice…"
        className="min-h-16 text-sm"
        onChange={(event) => setDraft(event.target.value)}
        onBlur={() => onSave(draft)}
      />
    </div>
  );
}
