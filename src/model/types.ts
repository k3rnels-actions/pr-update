import * as github from '@actions/github'
import {components as OctoOpenApiTypes} from '@octokit/openapi-types'

export type Octokit = ReturnType<typeof github.getOctokit>

export type Repo = OctoOpenApiTypes['schemas']['repository']
export type Branch = OctoOpenApiTypes['schemas']['branch-short']
export type PullRequest = OctoOpenApiTypes['schemas']['pull-request']
