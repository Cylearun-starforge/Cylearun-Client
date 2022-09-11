/**
 * 拼接资源文件夹和资源路径，返回完整的资源路径。函数会根据当前是否处于 dev 模式或 prod 模式，返回不同的路径
 * @param isDev 是否处于 dev 模式 (MODE === 'dev')
 * @param folder 资源文件夹
 * @param path 资源路径
 * @returns 资源路径
 */
export default function fsPath(path: string) {
  if (define.__DEV__) {
    return `http://localhost:11451/danger/${path}`;
  }
  return path;
}
