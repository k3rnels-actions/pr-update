import * as github from '@actions/github'
// suppress eslint since its stupid and fails to lookup components that is 100% exported and can be imported here
// eslint-disable-next-line import/named
import {components as OctoOpenApiTypes} from '@octokit/openapi-types'

export type Octokit = ReturnType<typeof github.getOctokit>

export type Repo = OctoOpenApiTypes['schemas']['repository']
export type PullRequest = OctoOpenApiTypes['schemas']['pull-request']
