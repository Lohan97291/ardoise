import {
  CloudAlert,
  CloudDownload,
  CloudUpload,
  KeyRound,
  RefreshCcw,
  RotateCcw,
  Save,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CLOUD_SYNC_EVENT,
  getCloudSyncState,
  pullCloudStateToLocal,
  pushLocalStateToCloud,
} from "@/lib/cloud-sync";
import {
  DEFAULT_PROFILE_SETTINGS,
  readProfileSettings,
  resetProfileSettings,
  saveProfileSettings,
  type ProfileSettings,
} from "@/lib/profile-settings";
import { healthcheckSupabase } from "@/lib/supabase";

function emptyPasswordForm() {
  return {
    currentPassword: "",
    nextPassword: "",
    confirmPassword: "",
  };
}

export function ProfileSettingsPanel() {
  const [profile, setProfile] = useState<ProfileSettings>(DEFAULT_PROFILE_SETTINGS);
  const [passwordForm, setPasswordForm] = useState(emptyPasswordForm);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [syncState, setSyncState] = useState(getCloudSyncState());
  const [cloudHealth, setCloudHealth] = useState<{ ok: boolean; message: string }>({
    ok: syncState.configured,
    message: syncState.configured
      ? "Vérification de la connexion cloud…"
      : "Supabase n'est pas encore configuré dans l'application.",
  });
  const [uploadingCloud, setUploadingCloud] = useState(false);
  const [downloadingCloud, setDownloadingCloud] = useState(false);
  const [checkingCloud, setCheckingCloud] = useState(false);
  const [reloadRecommended, setReloadRecommended] = useState(false);

  useEffect(() => {
    setProfile(readProfileSettings());
    setSyncState(getCloudSyncState());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function refreshCloudStatus() {
      const nextSyncState = getCloudSyncState();
      setSyncState(nextSyncState);

      if (!nextSyncState.configured) {
        if (!cancelled) {
          setCloudHealth({
            ok: false,
            message: "Supabase n'est pas encore configuré dans l'application.",
          });
        }
        return;
      }

      setCheckingCloud(true);
      try {
        const nextHealth = await healthcheckSupabase();
        if (!cancelled) setCloudHealth(nextHealth);
      } finally {
        if (!cancelled) setCheckingCloud(false);
      }
    }

    void refreshCloudStatus();

    function handleCloudRefresh() {
      void refreshCloudStatus();
    }

    window.addEventListener(CLOUD_SYNC_EVENT, handleCloudRefresh as EventListener);
    window.addEventListener("focus", handleCloudRefresh);

    return () => {
      cancelled = true;
      window.removeEventListener(CLOUD_SYNC_EVENT, handleCloudRefresh as EventListener);
      window.removeEventListener("focus", handleCloudRefresh);
    };
  }, []);

  function updateProfile<K extends keyof ProfileSettings>(key: K, value: ProfileSettings[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  async function handleSaveProfile() {
    setSavingProfile(true);
    try {
      const next = saveProfileSettings(profile);
      setProfile(next);
      toast.success("Profil mis à jour.");
    } finally {
      setSavingProfile(false);
    }
  }

  function handleResetProfile() {
    const next = resetProfileSettings();
    setProfile(next);
    toast.success("Profil réinitialisé.");
  }

  async function handleUploadCloud() {
    setUploadingCloud(true);
    try {
      const result = await pushLocalStateToCloud();
      setSyncState(getCloudSyncState());
      setReloadRecommended(false);
      setCloudHealth(await healthcheckSupabase());
      toast.success(`${result.count} blocs de données envoyés dans le cloud.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Impossible d'envoyer la sauvegarde cloud.");
    } finally {
      setUploadingCloud(false);
    }
  }

  async function handleDownloadCloud() {
    setDownloadingCloud(true);
    try {
      const result = await pullCloudStateToLocal();
      setSyncState(getCloudSyncState());
      setCloudHealth(await healthcheckSupabase());
      setReloadRecommended(true);
      toast.success(`${result.count} blocs récupérés depuis ${result.source}.`);
      window.setTimeout(() => {
        window.location.reload();
      }, 900);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Impossible de récupérer la sauvegarde cloud.",
      );
    } finally {
      setDownloadingCloud(false);
    }
  }

  async function handleChangePassword(event: React.FormEvent) {
    event.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.nextPassword || !passwordForm.confirmPassword) {
      toast.error("Complète les trois champs pour changer le mot de passe.");
      return;
    }

    if (passwordForm.nextPassword.length < 6) {
      toast.error("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    if (passwordForm.nextPassword !== passwordForm.confirmPassword) {
      toast.error("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }

    setSavingPassword(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          nextPassword: passwordForm.nextPassword,
        }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        toast.error(payload?.error ?? "Impossible de changer le mot de passe.");
        return;
      }

      setPasswordForm(emptyPasswordForm());
      toast.success("Mot de passe changé.");
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="mt-4 space-y-4 border-t border-border pt-4">
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,249,252,0.98))] shadow-sm">
        <div className="border-b border-border/70 bg-secondary/25 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
              <UserRound className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Profil</p>
              <p className="text-xs text-muted-foreground">
                Nom, initiales et repères de classe.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-2xl border border-primary/10 bg-[linear-gradient(135deg,rgba(30,64,175,0.07),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-card">
                {profile.initials || "MB"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {profile.displayName || "M. Boulard"}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {profile.classLabel || "CE1 · 2026-2027"}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground/90">
                  {profile.schoolLabel || "11 élèves · École Romain Rolland"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="profile-display-name">Nom affiché</Label>
              <Input
                id="profile-display-name"
                value={profile.displayName}
                onChange={(event) => updateProfile("displayName", event.target.value)}
                placeholder="Ex. M. Boulard"
              />
            </div>
            <div className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="profile-initials">Initiales</Label>
                <Input
                  id="profile-initials"
                  value={profile.initials}
                  onChange={(event) => updateProfile("initials", event.target.value.toUpperCase())}
                  maxLength={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="profile-class">Classe</Label>
                <Input
                  id="profile-class"
                  value={profile.classLabel}
                  onChange={(event) => updateProfile("classLabel", event.target.value)}
                  placeholder="Ex. CE1 · 2026-2027"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-school">Ligne d’école</Label>
              <Input
                id="profile-school"
                value={profile.schoolLabel}
                onChange={(event) => updateProfile("schoolLabel", event.target.value)}
                placeholder="Ex. 11 élèves · École Romain Rolland"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => void handleSaveProfile()}
              disabled={savingProfile}
            >
              <Save className="mr-1.5 h-4 w-4" />
              {savingProfile ? "Enregistrement…" : "Enregistrer"}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleResetProfile}>
              <RotateCcw className="mr-1.5 h-4 w-4" />
              Réinitialiser
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="border-b border-border/70 bg-secondary/25 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
              <CloudUpload className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Sauvegarde cloud</p>
              <p className="text-xs text-muted-foreground">
                Pour retrouver Ardoise sur un autre ordi ou sur le téléphone.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-2xl border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] px-3 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={
                  cloudHealth.ok
                    ? "rounded-full border border-sage/30 bg-sage/15 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-foreground"
                    : "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-amber-950"
                }
              >
                {cloudHealth.ok ? "Cloud prêt" : "Cloud à vérifier"}
              </span>
              {checkingCloud ? (
                <span className="text-[0.68rem] font-medium text-muted-foreground">
                  Vérification…
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              {cloudHealth.message}
            </p>
            {syncState.lastUploadedAt ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Dernier envoi : {new Date(syncState.lastUploadedAt).toLocaleString("fr-FR")}
              </p>
            ) : null}
            {syncState.lastDownloadedAt ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Dernière récupération : {new Date(syncState.lastDownloadedAt).toLocaleString("fr-FR")}
              </p>
            ) : null}
            {reloadRecommended ? (
              <div className="mt-3 rounded-2xl border border-primary/10 bg-primary/5 px-3 py-2.5">
                <p className="text-xs font-medium text-foreground">
                  Les données viennent d’être récupérées. Ardoise se recharge pour tout remettre en place.
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => void handleUploadCloud()}
              disabled={!syncState.configured || uploadingCloud}
            >
              <CloudUpload className="mr-1.5 h-4 w-4" />
              {uploadingCloud ? "Envoi…" : "Envoyer mes données"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void handleDownloadCloud()}
              disabled={!syncState.configured || downloadingCloud}
            >
              <CloudDownload className="mr-1.5 h-4 w-4" />
              {downloadingCloud ? "Récupération…" : "Récupérer mes données"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              disabled={!reloadRecommended}
            >
              <RefreshCcw className="mr-1.5 h-4 w-4" />
              Recharger Ardoise
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={async () => {
                setCheckingCloud(true);
                try {
                  setSyncState(getCloudSyncState());
                  setCloudHealth(await healthcheckSupabase());
                  toast.success("Connexion cloud vérifiée.");
                } finally {
                  setCheckingCloud(false);
                }
              }}
            >
              <CloudAlert className="mr-1.5 h-4 w-4" />
              Tester la connexion
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="border-b border-border/70 bg-secondary/25 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
              <KeyRound className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Sécurité</p>
              <p className="text-xs text-muted-foreground">
                Changer le mot de passe d’accès.
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-4 p-4" onSubmit={handleChangePassword}>
          <div className="rounded-2xl border border-amber-200/70 bg-amber-50/70 px-3 py-2.5">
            <p className="text-xs font-medium text-amber-950">
              Garde un mot de passe simple à retenir pour toi, mais suffisamment différent de tes autres accès.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <Input
              id="current-password"
              type="password"
              autoComplete="current-password"
              value={passwordForm.currentPassword}
              onChange={(event) =>
                setPasswordForm((current) => ({
                  ...current,
                  currentPassword: event.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="next-password">Nouveau mot de passe</Label>
            <Input
              id="next-password"
              type="password"
              autoComplete="new-password"
              value={passwordForm.nextPassword}
              onChange={(event) =>
                setPasswordForm((current) => ({
                  ...current,
                  nextPassword: event.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirmer le nouveau mot de passe</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={passwordForm.confirmPassword}
              onChange={(event) =>
                setPasswordForm((current) => ({
                  ...current,
                  confirmPassword: event.target.value,
                }))
              }
            />
          </div>

          <Button type="submit" size="sm" disabled={savingPassword}>
            <KeyRound className="mr-1.5 h-4 w-4" />
            {savingPassword ? "Changement…" : "Changer le mot de passe"}
          </Button>
        </form>
      </section>
    </div>
  );
}
