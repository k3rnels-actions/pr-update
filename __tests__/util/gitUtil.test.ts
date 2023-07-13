import * as github from '@actions/github'
import * as core from '@actions/core'
import * as process from 'process'
import * as git from '../../src/util/gitUtils'
import {getToken} from '../helpers/token'

const octokit = github.getOctokit(getToken())

describe('pr-update/gitUtil', () => {
  it('test branchExists missing', async () => {
    const changes = await git.branchExists(octokit, 'missing')
    expect(changes).toBeFalsy()
  })

  it('test branchExists present', async () => {
    const changes = await git.branchExists(octokit, 'main')
    expect(changes).toBeTruthy()
  })

  it('test getInputOrDefaultBranch input', async () => {
    const branchName = await git.getTargetBranch('main', octokit)
    expect(branchName).toBe('main')
  })

  it('test getInputOrDefaultBranch default', async () => {
    const branchName = await git.getTargetBranch('', octokit)
    expect(branchName).toBe('main')
  })
})
