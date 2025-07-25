module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-min-length': [2, 'always', 10],
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New features
        'fix',      // Bug fixes
        'docs',     // Documentation changes
        'style',    // Code style changes
        'refactor', // Code refactoring
        'test',     // Adding or updating tests
        'chore',    // Maintenance tasks
        'perf',     // Performance improvements
        'ci',       // CI/CD changes
        'build',    // Build system changes
        'revert'    // Revert previous commits
      ]
    ]
  },
}; 