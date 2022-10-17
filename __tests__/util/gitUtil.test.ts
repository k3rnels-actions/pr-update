import * as github from '@actions/github'
import * as core from '@actions/core'
import * as process from 'process'
import * as git from '../../src/util/gitUtils'
import { getToken } from '../helpers/token'

describe('pr-update/gitUtil', () => {

  beforeAll(async () => {
    process.env['GITHUB_REPOSITORY'] = 'k3rnels-actions/pr-update'
  })

  it('test branchExists missing', async () => {
    const changes = await git.branchExists('missing')
    expect(changes).toBeFalsy()
  })

  it('test branchExists present', async () => {
    const changes = await git.branchExists('main')
    expect(changes).toBeTruthy()
  })

  it('test getInputOrDefaultBranch input', async () => {
    const token = getToken()
    if (!token) {
      return
    }

    const octokit = github.getOctokit(token)
    const branchName = await git.getTargetBranch('master', octokit)
    expect(branchName).toBe('master')
  })

  it('test getInputOrDefaultBranch default', async () => {
    const token = getToken()
    if (!token) {
      return
    }

    const octokit = github.getOctokit(token)
    const branchName = await git.getTargetBranch('', octokit)
    expect(branchName).toBe('main')
  })
})
