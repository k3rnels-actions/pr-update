import * as github from '@actions/github'
import * as core from '@actions/core'
import * as process from 'process'
import { BodyUtils } from '../../src/util/bodyUtils'
import { getToken } from '../helpers/token'

const octokit = github.getOctokit(getToken())
const bodyUtils = new BodyUtils(octokit)

describe('pr-update/bodyUtils', () => {
  it ('returns body containing title and link', async () => {
    const body = await bodyUtils.withLinks('test/staging', 'test/main')
    const prLink = process.env['TEST_BODY_UTILS_EXPECTED_PR_LINK']
    const expectedBody = `\n\r- ${prLink}`
    expect(body).toBe(expectedBody)
  })

  describe('with explict body parameter', () => {
    it ('returns body with appended title and link', async () => {
      const bodyHeader = 'Test staging to main\r\n'
      const body = await bodyUtils.withLinks('test/staging', 'test/main' , bodyHeader)
      const prLink = process.env['TEST_BODY_UTILS_EXPECTED_PR_LINK']
      const expectedBody = `${bodyHeader}\n\r- ${prLink}`
      expect(body).toBe(expectedBody)
    })
  })
})
