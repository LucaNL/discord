const core = require('@actions/core')
const github = require('@actions/github')

async function run() {
  const payload = github.context.payload
  const repository = payload.repository.full_name
  const commits = payload.commits
  const size = commits.length
  const branch = payload.ref.split('/')[payload.ref.split('/').length - 1]

  console.log(`Received payload.`)

  console.log(`Received ${commits.length}/${size} commits...`)

  if (commits.length === 0) {
    console.log(`No commits, skipping...`)
    return
  }
}

try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
