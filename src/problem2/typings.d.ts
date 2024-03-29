/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'require' {
  const require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (
      paths: string[],
      callback: (require: <T>(path: string) => T) => void
    ) => void
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ) => any
  }
  export default require
}
