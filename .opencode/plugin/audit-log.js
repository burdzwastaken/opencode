export const AuditLog = async ({ project, client, $ }) => {
  const fs = await import('fs');
  const path = await import('path');
  
  const projectRoot = project?.root ?? process.cwd();
  const logDir = path.join(projectRoot, '.opencode', 'logs');
  const logFile = path.join(logDir, `audit-${new Date().toISOString().split('T')[0]}.jsonl`);
  
  const ensureLogDir = async () => {
    try {
      await fs.promises.mkdir(logDir, { recursive: true });
    } catch (e) {}
  };

  const log = async (entry) => {
    await ensureLogDir();
    const line = JSON.stringify({
      timestamp: new Date().toISOString(),
      ...entry
    }) + '\n';
    await fs.promises.appendFile(logFile, line);
  };

  return {
    "session.start": async () => {
      await log({
        event: "session_start",
        cwd: process.cwd()
      });
    },

    "tool.execute.before": async (input, output) => {
      const args = output?.args ?? {};
      
      if (input.tool === "bash") {
        await log({
          event: "bash",
          command: args.command,
          workdir: args.workdir
        });
      }
      
      if (input.tool === "write") {
        await log({
          event: "write",
          file: args.filePath,
          bytes: args.content?.length
        });
      }
      
      if (input.tool === "edit") {
        await log({
          event: "edit", 
          file: args.filePath,
          oldLength: args.oldString?.length,
          newLength: args.newString?.length
        });
      }
    },

    "session.end": async () => {
      await log({
        event: "session_end"
      });
    }
  };
};
