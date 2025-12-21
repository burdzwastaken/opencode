export const Notify = async ({ project, client, $ }) => {
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);

  const notify = async (title, body, urgency = 'normal') => {
    try {
      const escapedTitle = title.replace(/"/g, '\\"');
      const escapedBody = body.replace(/"/g, '\\"');
      await execAsync(`notify-send -u ${urgency} "${escapedTitle}" "${escapedBody}"`);
    } catch (e) {
    }
  };

  const messages = [
    "yo burdz, your turn",
    "burdz... burdz... BURDZ!",
    "awaiting burdz input...",
    "burdz i'm bored",
    "task complete. burdz pls respond",
    "burdz wake up",
    "i did my part, now you do yours burdz",
    "burdz the ball is in your court",
    "*taps mic* burdz you there?",
    "finished. burdz come back"
  ];

  const permissionMessages = [
    "burdz! need your approval here",
    "permission check, burdz",
    "yo burdz, approve this or nah?",
    "burdz i need an adult",
    "awaiting burdz authorization..."
  ];

  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        await notify("metaburdz", msg);
      }
      if (event.type === "permission.updated") {
        const msg = permissionMessages[Math.floor(Math.random() * permissionMessages.length)];
        await notify("metaburdz", msg, "critical");
      }
    }
  };
};
