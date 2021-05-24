import * as github from '@actions/github'

import {Repo, Octokit} from '../model/types'
import {execWithCode} from './execUtil'

export async function branchExists(branchName: string): Promise<boolean> {
  const retCode = await execWithCode(`git ls-remote --exit-code --heads origin "${branchName}"`)
  return 0 === retCode
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
