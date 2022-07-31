/**
 * 拼接资源文件夹和资源路径，返回完整的资源路径。函数会根据当前是否处于 dev 模式或 prod 模式，返回不同的路径
 * @param isDev 是否处于 dev 模式 (MODE === 'dev')
 * @param folder 资源文件夹
 * @param path 资源路径
 * @returns 资源路径
 */
export function rcPathImpl(isDev: boolean, folder: string, path: string) {
  if (isDev) {
    return `/@rc/${folder}/${path}`;
  }
  return `../resources/${folder}.asar/${path}`;
}

export type Rc = {
  folder: string;
  path: string;
};

export default function rcPath(folder: string, path: string) {
  return rcPathImpl(define.__DEV__, folder, path);
}
