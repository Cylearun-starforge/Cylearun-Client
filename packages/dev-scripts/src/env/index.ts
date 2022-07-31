import { searchForWorkspaceRoot } from 'vite';

process.env.workspace = searchForWorkspaceRoot(process.cwd());

export function moveToWorkspace() {
  process.chdir(process.env.workspace);
}
