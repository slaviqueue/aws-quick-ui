import { execSync } from 'child_process'

export function execAwsCli(cmd: string, port: number) {
  return execSync(`aws --endpoint-url=http://localhost:${port} ${cmd}`)
}
