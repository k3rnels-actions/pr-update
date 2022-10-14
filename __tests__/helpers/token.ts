import * as process from 'process'
import * as core from '@actions/core'

export function getToken(): string {
  const token = process.env['GITHUB_TOKEN'] || ''
  if (!token) {
    core.warning(
      'Skipping GitHub tests. Set $GITHUB_TOKEN to run REST client and GraphQL client tests'
    )
  }

  return token
}
