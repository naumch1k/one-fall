# How to use Git for a project

To make changes to the project code, follow these steps:

1. [Create a new branch](#create-a-new-branch)
2. Make and [commit](#commits) changes to the project code
3. [Rebase against `develop` branch](#rebase)
4. Open a Pull Request to the `develop` branch
5. Wait for [code review](#code-review), make changes if needed, perform a rebase, and push changes to the GitHub

## Create a new branch

We follow a simplified branching model inspired by [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/).

Branches are named using the following notation:
```<type>-<short-description>```.

Allowed types: `feature`, `docs`, `bugfix`, or `hotfix`.

* `feature` for adding, modifying, or removing functionality
* `bugfix` for fixing a bug
* `hotfix` for urgently fixing a bug in production. Hotfix branches are merged into `main`.

Branch names should only include hyphens, lowercase letters, and numbers. For example: `feature-event-card`, `bugfix-event-date`.

## Commits

Strive to make commits detailed yet with independent value.

We use a simplified commit naming convention called [Conventional Commits](https://www.conventionalcommits.org):

```<type>: <description>```.

Allowed types: `feat`, `fix`, `refactor`, `chore`, `docs`, or `test` where:

* `feat` — new **user functionality**
* `fix` — **user-facing bug** fix
* `refactor` — code refactoring
* `docs` — documentation updates
* `chore` — routine tasks

Commit naming rules:
* the commit description should be in English,
* avoid starting the commit description with a capital letter,
* use verbs in present tense in the commit message to describe the change, rather than nouns and the past tense. Prefer "changes" over "change" or "changed",
* commit message should describe "what" happens in the commit, not "how".

Good commit message: `fix: changes header links color`

Not the best: `Added active class`

## Rebase

To keep the git history clean, it is recommended to rebase your task branch against `develop` before merging or pushing changes to the GitHub if your branch has fallen behind `develop`:

```bash
  $ git checkout develop
  $ git pull
  $ git checkout your-branch
  $ git rebase develop
```

or
```bash
  $ git pull --rebase origin develop
```

## Code Review

During code review, project participants leave questions or remarks that need to be addressed in the thread and make code changes if necessary. Only the author of the thread has the right to close it. A Pull Request can only be merged if all discussions within it are closed.

If changes are requested during the code review, the reviewer marks the Pull Request as a [Draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests), indicating that it is not ready for merging. After making the required changes, the task executor removes the draft status, indicating that the PR is ready for another round of review.

The merging of a Pull Request into the `develop` branch is carried out by the assigned lead of the team.