import { danger, fail } from 'danger';

const gitmojiTitleRegex = /^.+: [A-Z].*/;
const gitmojiCommitRegex = /^.+ \([a-z]+\): [a-z].*/;

if (!gitmojiTitleRegex.test(danger.github.pr.title)) {
  fail('PR title must follow the format: ":gitmoji: Title"');
}

for (const { commit } of danger.github.commits) {
  if (!gitmojiCommitRegex.test(commit.message)) {
    fail(
      'All commits must follow the format: ":gitmoji: (scope): message" with lowercase letters and scope optional',
    );

    break;
  }
}
