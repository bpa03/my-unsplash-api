let common = [
  'test/app/features/**/*.feature',
  '--require-module ts-node/register', //typescript cucumber
  '--require test/app/features/step_definitions/*.steps.ts',
  '--format progress-bar',
  `--format-options '{"snippetInterface": "synchronous"}'`
].join(' ');

module.exports = {
  default: common
}