import * as core from '@actions/core'

function parsInputToArray(input: string, options?: core.InputOptions): string[] {
  const str = core.getInput(input, options)
  return (str || null)?.split(',') ?? []
}

export class Input {
  token: string
  prTitle: string
  prSource: string
  prTarget: string
  prBody: string
  prLabels: string[]
  prAssignees: string[]

  constructor() {
    this.token = core.getInput('token', {required: true})
    this.prTitle = core.getInput('pr_title', {required: true})
    this.prSource = core.getInput('pr_source', {required: true})
    this.prTarget = core.getInput('pr_target')
    this.prBody = core.getInput('pr_body')
    this.prLabels = parsInputToArray('pr_labels')
    this.prAssignees = parsInputToArray('pr_assignees')

    core.setSecret(this.token)
  }
}
