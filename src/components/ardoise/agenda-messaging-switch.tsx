import { Link } from "@tanstack/react-router";
import { CalendarClock, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

type SwitchTab = "agenda" | "messagerie";

export function AgendaMessagingSwitch({
  active,
  agendaCount,
  mailCount,
  className,
}: {
  active: SwitchTab;
  agendaCount?: number;
  mailCount?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-1 rounded-2xl border border-border bg-card/85 p-1 shadow-card backdrop-blur-sm",
        className,
      )}
    >
      <SwitchLink
        to="/agenda"
        active={active === "agenda"}
        icon={<CalendarClock className="h-4 w-4" />}
        label="Agenda"
        count={agendaCount}
      />
      <SwitchLink
        to="/messagerie"
        active={active === "messagerie"}
        icon={<Mail className="h-4 w-4" />}
        label="Messagerie"
        count={mailCount}
      />
    </div>
  );
}

function SwitchLink({
  to,
  active,
  icon,
  label,
  count,
}: {
  to: "/agenda" | "/messagerie";
  active: boolean;
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-card"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
      {(count ?? 0) > 0 ? (
        <span
          className={cn(
            "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.62rem] font-semibold",
            active ? "bg-white/20 text-primary-foreground" : "bg-danger-soft text-danger-strong",
          )}
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}
