import * as github from '@actions/github'
import * as core from '@actions/core'
import * as process from 'process'
import { PrDiffUtils } from '../../src/util/prDiffUtils'
import { getToken } from '../helpers/token'

const octokit = github.getOctokit(getToken())
const prDiff = new PrDiffUtils(octokit)

describe('pr-update/prDiffUtils', () => {
  beforeAll(async () => {
    process.env['GITHUB_REPOSITORY'] = 'k3rnels-actions/pr-update'
  })

  it ('returns body containing title and link', async () => {
    const pullNr = 6
    const enhancedBody = await prDiff.enhancedBody(pullNr)
    const expectedBody = '\n\r- [Test PR]' +
      `(${github.context.serverUrl}/${process.env['GITHUB_REPOSITORY']}/pull/${pullNr})`
    expect(enhancedBody).toBe(expectedBody)
  })

  describe('with explict body parameter', () => {
    it ('returns body with appended title and link', async () => {
      const pullNr = 6
      const body = 'Staging to main\r\n'
      const enhancedBody = await prDiff.enhancedBody(pullNr, body)
      const expectedBody = `${body}` +
        `\n\r- [Test PR](${github.context.serverUrl}/${process.env['GITHUB_REPOSITORY']}/pull/${pullNr})`
      expect(enhancedBody).toBe(expectedBody)
    })
  })
})
