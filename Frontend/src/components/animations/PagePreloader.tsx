/**
 * PagePreloader — thin wrapper that delegates to the new EntranceLoader.
 *
 * The implementation lives in `src/components/entrance/EntranceLoader.tsx`.
 * This file is kept so that existing imports (`@/components/animations/PagePreloader`)
 * continue to resolve without changes across the codebase.
 */
export { EntranceLoader as PagePreloader } from '@/components/entrance';
