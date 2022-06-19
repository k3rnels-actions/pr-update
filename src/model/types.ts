import * as github from '@actions/github'
/* eslint-disable-next-line --
 * suppress eslint since its stupid and fails to lookup components that are 100% exported and can be imported here
 */
import {components as OctoOpenApiTypes} from '@octokit/openapi-types'

export type Octokit = ReturnType<typeof github.getOctokit>

export type Repo = OctoOpenApiTypes['schemas']['repository']
export type PullRequest = OctoOpenApiTypes['schemas']['pull-request']
