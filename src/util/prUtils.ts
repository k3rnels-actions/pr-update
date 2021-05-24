import * as core from '@actions/core'
import * as github from '@actions/github'

import {Octokit, PullRequest} from '../model/types'

export class PrUtils {
  private octokit: Octokit

  constructor(octokit: Octokit) {
    this.octokit = octokit
  }

  async getPrNumber(tgtBranch: string, srcBranch: string): Promise<number | undefined> {
    core.debug(`Searching PR with src: "${srcBranch}" and tgt: "${tgtBranch}"`)
    const prs = (
      await this.octokit.rest.pulls.list({
        ...github.context.repo,
        state: 'open',
        base: tgtBranch,
        head: `${github.context.repo.owner}:${srcBranch}`
      })
    ).data as PullRequest[]

    core.debug(`Found ${prs.length} matches`)
    return prs.pop()?.number
  }

  async createPr(
    tgtBranch: string,
    srcBranch: string,
    title: string,
    body?: string,
    labels?: string[],
    assignees?: string[]
  ): Promise<PullRequest> {
    core.debug(`Creating PR "${title}"`)
    const pr = (
      await this.octokit.rest.pulls.create({
        ...github.context.repo,
        title,
        head: srcBranch,
        base: tgtBranch,
        body
      })
    ).data

    if (labels && labels.length > 0) {
      await this.addPrLabels(pr.number, labels)
    }

    if (assignees && assignees.length > 0) {
      await this.addPrAssignees(pr.number, assignees)
    }

    return pr
  }

  async updatePr(
    prNumber: number,
    title: string,
    body?: string,
    labels?: string[],
    assignees?: string[]
  ): Promise<PullRequest> {
    core.debug(`Updating PR "${title}"`)
    const pr = (
      await this.octokit.rest.pulls.update({
        ...github.context.repo,
        pull_number: prNumber,
        title,
        body
      })
    ).data

    if (labels && labels.length > 0) {
      await this.addPrLabels(pr.number, labels)
    }

    if (assignees && assignees.length > 0) {
      await this.addPrAssignees(pr.number, assignees)
    }

    return pr
  }

  private async addPrLabels(prNumber: number, labels: string[]): Promise<void> {
    core.debug(`Adding ${labels.length} Labels to PR: ${labels.toString()}`)
    await this.octokit.rest.issues.addLabels({
      ...github.context.repo,
      issue_number: prNumber,
      labels
    })
  }

  private async addPrAssignees(prNumber: number, assignees: string[]): Promise<void> {
    core.debug(`Adding ${assignees.length} Assignees to PR: ${assignees.toString()}`)
    await this.octokit.rest.issues.addAssignees({
      ...github.context.repo,
      issue_number: prNumber,
      assignees
    })
  }
}
