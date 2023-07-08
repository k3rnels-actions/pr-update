import * as github from '@actions/github'

import { Octokit, Repo } from '../model/types'

export async function branchExists(octokit: Octokit, branchName: string): Promise<boolean> {
  try {
    const status = (await octokit.rest.git.getRef({
      ...github.context.repo,
      ref: `heads/${branchName}`
    })).status
    return status === 200
  } catch {
    return false
  }
}

export async function getTargetBranch(inputBranch: string, octokit: Octokit): Promise<string> {
  if (inputBranch) {
    return inputBranch
  } else {
    return getDefaultBranch(octokit)
  }
}

async function getDefaultBranch(octokit: Octokit): Promise<string> {
  const repo = (
    await octokit.rest.repos.get({
      ...github.context.repo
    })
  ).data as Repo

  return repo.default_branch
}
