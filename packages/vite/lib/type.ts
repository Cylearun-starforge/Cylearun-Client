export const VITE_BUILD_MODES = ['dev', 'prod', 'pre'] as const;
export type ViteBuildMode = typeof VITE_BUILD_MODES[number];
