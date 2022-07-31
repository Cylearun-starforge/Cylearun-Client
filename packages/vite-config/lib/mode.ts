export const VITE_BUILD_MODES = ['dev', 'prod', 'pre'] as const;
export type ViteBuildMode = typeof VITE_BUILD_MODES[number];

export function isProductionMode(mode: ViteBuildMode): mode is 'prod' | 'pre' {
  return mode === 'prod' || mode === 'pre';
}

export function isDevelopmentMode(mode: ViteBuildMode): mode is 'dev' {
  return mode === 'dev';
}
