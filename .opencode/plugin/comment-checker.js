export const CommentChecker = async () => {
  const CODE_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.rs', '.java', '.cpp', '.c', '.zig', '.sh', '.bash', '.css']
  const COMMENT_THRESHOLD = 0.1
  const pendingCalls = new Map()

  const isCodeFile = (filePath) => CODE_EXTENSIONS.some(ext => filePath.endsWith(ext))

  const countCommentRatio = (content) => {
    const lines = content.split('\n')
    if (lines.length < 5) return null

    const commentLines = lines.filter(line => {
      const trimmed = line.trim()
      return trimmed.startsWith('//') ||
        trimmed.startsWith('#') ||
        trimmed.startsWith('/*') ||
        trimmed.startsWith('*/') ||
        (trimmed.startsWith('*') && !trimmed.startsWith('*/'))
    }).length

    return {
      ratio: commentLines / lines.length,
      commentLines,
      totalLines: lines.length
    }
  }

  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== 'write' && input.tool !== 'edit') return

      const args = output?.args ?? {}
      const filePath = args.filePath
      const content = args.content || args.newString

      if (!filePath || !content || !isCodeFile(filePath)) return

      pendingCalls.set(input.callID, { filePath, content })
    },

    "tool.execute.after": async (input, output) => {
      const pending = pendingCalls.get(input.callID)
      if (!pending) return

      pendingCalls.delete(input.callID)

      const { filePath, content } = pending
      const result = countCommentRatio(content)
      if (!result) return

      if (result.ratio > COMMENT_THRESHOLD) {
        const warning = `[commentcheck] ${filePath} has ${Math.round(result.ratio * 100)}% comments (${result.commentLines}/${result.totalLines}). Remove unnecessary comments before proceeding!`

        output.output += `\n\n${warning}`
      }
    }
  }
}
