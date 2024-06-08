# Introduction to Contributing
*Contributions are always welcome, no matter how large or small!*

**To make changes to the project code, follow these steps:**

1. [Self-assign an issue](#self-assign-an-issue)
2. [Create a new branch](#create-a-new-branch)
3. Make and [commit](#commits) changes to the project code
4. [Rebase against `develop` branch](#rebase)
5. Open a [Pull Request](#pull-requests) to the `develop` branch
6. Wait for [code review](#code-review), make changes if needed, perform a rebase, and push changes to the GitHub

## Self-Assign an Issue

- If you wish to work on an open issue, please comment on the issue with `.take`, and it will be assigned to you.
> **INFO:** If an issue is not assigned, it is assumed to be available for anyone to work on. Please assign yourself to an issue before working on it to avoid conflicts.
- Issues with the `👀 needs triage` label are unavailable to `.take` until they are triaged and the label is removed. Feel free to check on the issue regularly if you want to work on it.
- If you contribute to the project for the first time, you can search for issues with `⚡ good first issue` in the repository.
> **NOTE:** Please only self-assign a good first issue one time. Maintainers may remove you from the assignees and not accept your pull request if you choose to proceed.

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

## Pull Requests

We actively welcome your pull requests. However, you must ensure that you are assigned to an existing issue before working on changes, and you need to link your work to the issue in your PR form.

* Please complete the PR form. Make sure to fill in the PR title, description, link to an issue, and all the necessary areas.
* Start PR title with `FEAT:`, `BUGFIX:`, or anything related to your changes.

> **WARNING:** PRs will be marked as invalid and may be closed if:
> - the issue is not assigned to the contributor who opened the PR
> - no issue is linked to the PR
> - PR form is incomplete
> - changes are made directly on the `main` branch

## Code Review

During code review, project participants leave questions or remarks that need to be addressed in the thread and make code changes if necessary. Only the author of the thread has the right to close it. A Pull Request can only be merged if all discussions within it are closed.

If changes are requested during the code review, the reviewer marks the Pull Request as a [Draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests), indicating that it is not ready for merging. After making the required changes, the task executor removes the draft status, indicating that the PR is ready for another round of review.

The merging of a Pull Request into the `develop` branch is carried out by the assigned lead of the team.