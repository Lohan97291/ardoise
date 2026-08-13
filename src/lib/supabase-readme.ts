export const SUPABASE_NEXT_STEPS = [
  "Créer les tables de base avec le fichier src/lib/supabase-schema.sql dans l'éditeur SQL de Supabase.",
  "Vérifier que les droits public/anon sur app_profiles et app_snapshots sont bien appliqués.",
  "Tester la connexion avec les variables VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.",
  "Commencer par synchroniser les blocs essentiels : profil, élèves, cahier journal, agenda, résultats.",
  "Garder le local comme secours tant que la migration complète n'est pas terminée.",
] as const;
