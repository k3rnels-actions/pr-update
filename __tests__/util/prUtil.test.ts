import * as github from '@actions/github'
import * as process from 'process'
import {PrUtils} from '../../src/util/prUtils'
import {getToken} from '../helpers/token'

const octokit = github.getOctokit(getToken())
const pr = new PrUtils(octokit)

describe('pr-update/prUtil', () => {
  it('test branchExists missing', async () => {
    const prNr = await pr.getPrNumber('main', 'test/missing')
    expect(prNr).toBeUndefined()
  })

  it('test branchExists present', async () => {
    const prNr = await pr.getPrNumber('main', 'test/pr')
    const expectedPrNr = parseInt(process.env['TEST_PR_UTIL_EXPECTED_PR_NUMBER'] || '-1')
    expect(prNr).toBe(expectedPrNr)
  })
})
