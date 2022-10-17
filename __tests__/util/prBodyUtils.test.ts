import * as github from '@actions/github'
import * as core from '@actions/core'
import * as process from 'process'
import { prBodyUtils } from '../../src/util/prBodyUtils'
import { getToken } from '../helpers/token'

const octokit = github.getOctokit(getToken())
const prBody = new prBodyUtils(octokit)

describe('pr-update/prBodyUtils', () => {
  beforeAll(async () => {
    process.env['GITHUB_REPOSITORY'] = 'k3rnels-actions/pr-update'
  })

  it ('returns body containing title and link', async () => {
    const pullNr = 6
    const body = await prBody.withLinks(pullNr)
    const expectedBody = '\n\r- [Test PR]' +
      `(${github.context.serverUrl}/${process.env['GITHUB_REPOSITORY']}/pull/${pullNr})`
    expect(body).toBe(expectedBody)
  })

  describe('with explict body parameter', () => {
    it ('returns body with appended title and link', async () => {
      const pullNr = 6
      const bodyHeader = 'Staging to main\r\n'
      const body = await prBody.withLinks(pullNr, bodyHeader)
      const expectedBody = `${bodyHeader}` +
        `\n\r- [Test PR](${github.context.serverUrl}/${process.env['GITHUB_REPOSITORY']}/pull/${pullNr})`
      expect(body).toBe(expectedBody)
    })
  })
})
