import { danger, fail, GitCommit, warn } from 'danger';
import { readdir } from 'fs/promises';
import { includes } from 'lodash';

const getDirectories = async (source: string) => {
  return (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

(async () => {
  const scope = await getDirectories('src');
  const completeScope = [
    ...scope,
    ...(
      await Promise.all(
        scope.map(async (dir) =>
          (await getDirectories(`src/${dir}`)).map((sub) => `${dir}/${sub}`),
        ),
      )
    ).flat(),
  ]
    .concat([
      'core',
      'docs',
      'config',
      'build',
      'ci',
      'tests',
      'scripts',
      'styles',
      'deps',
      'misc',
      'chore',
    ])
    .sort();

  const gitmojiTitleRegex = /^.+: [A-Z].+/;

  const scopeRegex = completeScope.join('|');
  const gitmojiCommitRegex = new RegExp(`^.+ \\((${scopeRegex})\\): [a-z ]+`);
  const gitmojiCommitWithoutScopeRegex = new RegExp(`^.+: [a-z ]+`);

  /**
   * Errors
   */

  if (!gitmojiTitleRegex.test(danger.github.pr.title)) {
    fail(
      'Pull request title must follow the format: `:gitmoji: Title`\n- uppercase first letter',
    );
    console.log('Pull request title:');
    console.log(danger.github.pr.title);
  }

  const commitsInError: GitCommit[] = [];
  for (const { commit } of danger.github.commits) {
    if (
      !gitmojiCommitRegex.test(commit.message) ||
      !gitmojiCommitWithoutScopeRegex.test(commit.message)
    ) {
      commitsInError.push(commit);
      console.log('Commit message:');
      console.log(commit);
    }
  }

  if (commitsInError.length) {
    const commitList = commitsInError.map(
      (commit) => `\n- ${commit.url.split('/').at(-1)}: ${commit.message}`,
    );
    fail(
      `Commits must follow the format: \`:gitmoji: (scope): message\`\n- lowercase letters\n- scope is optionnal but must be one of: ${completeScope
        .map((scope) => `\`${scope}\``)
        .join(', ')}\n\nCommit in error: ${commitList}`,
    );

    console.log('available scopes:');
    console.log(completeScope);
  }

  const hasPackageChanges = includes(danger.git.modified_files, 'package.json');
  const hasLockfileChanges = includes(danger.git.modified_files, 'yarn.lock');
  if (hasPackageChanges && !hasLockfileChanges) {
    fail(
      'There are package.json changes with no corresponding lockfile changes',
    );
  }

  /**
   * Warnings
   */

  const packageDiff = await danger.git.JSONDiffForFile('package.json');
  const dependenciesAdded: string[] = [
    ...(packageDiff.dependencies?.added ?? []),
    ...(packageDiff.devDependencies?.added ?? []),
  ];

  if (dependenciesAdded.length) {
    const list = dependenciesAdded.map((dep) => `\n- \`${dep}\``);
    console.log(list);
    warn(`\n\nNew dependencies:${list}`);
  }

  const dependenciesRemoved: string[] = [
    ...(packageDiff.dependencies?.removed ?? []),
    ...(packageDiff.devDependencies?.removed ?? []),
  ];

  if (dependenciesRemoved.length) {
    const list = dependenciesRemoved.map((dep) => `\n- ${dep}`);
    warn(`\n\nRemoved dependencies:${list}`);
  }
})();
