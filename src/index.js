#!/usr/bin/env node

const { spawn } = require('child_process')

/**
 * @param {*} commands - list of commands to execute
 * @param {*} onComplete - called when all commands exited by themselves
 * @returns a function that kills all running processes regardless of their state
 */
function executeCommands(commands, onComplete) {
  let nRunning = commands.length

  const processes = commands.map((command) => {
    const [ executable, ...options ] = command.split(' ').map(c => c.trim())
    const cmd = spawn(executable, options, { shell: true, stdio: 'inherit' })
    cmd.on('close', () => (--nRunning < 1) && onComplete())
    return cmd
  })

  return (signal) => processes.forEach((p) => p.kill(signal))
}

module.exports = executeCommands


/* Command line execution code */
const TOOL_NAME = '7ohm';
const HELP_TEXT = `Usage: ${TOOL_NAME} "command1" "command2" ...`
const HELP_TRIGGERS = ['-h', '--help']
const TERMINATE_SIGNALS = ['SIGINT', 'SIGTERM', 'SIGHUP']

function main() {
  const commands = process.argv.slice(2);

  if (commands.length === 0 || commands.some((cmd) => HELP_TRIGGERS.includes(cmd))) {
    console.log(HELP_TEXT)
    process.exit()
  }

  const cmdText = commands.map((cmd) => `\`${cmd}'`).join(', ')

  console.log(`\n[${TOOL_NAME}: executing listed commands]:`, cmdText, '\n')

  const terminate = executeCommands(commands, () => {
    console.log(`\n[${TOOL_NAME}: all commands finished execution, exiting]`)
    process.exit()
  })

  TERMINATE_SIGNALS.forEach((signal) => {
    process.on(signal, () => {
      terminate(signal)
      process.exit()
    })
  })
}

if (require.main === module) {
  main()
}
