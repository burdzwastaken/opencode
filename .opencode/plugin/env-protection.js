export const EnvProtection = async ({ project, client, $ }) => {
  const sensitivePatterns = [
    '.env',
    '.env.local',
    '.env.production',
    '.env.development',
    'credentials',
    'secrets',
    '.npmrc',
    '.pypirc',
    '.bash_history'
  ]

  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args?.filePath) {
        const filePath = output.args.filePath.toLowerCase()
        
        for (const pattern of sensitivePatterns) {
          if (filePath.includes(pattern)) {
            throw new Error(`[EnvProtection] Blocked read of sensitive file: ${output.args.filePath}. Use environment variables instead.`)
          }
        }
      }
    }
  }
}
