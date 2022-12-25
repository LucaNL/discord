const { MessageEmbed, WebhookClient } = require('discord.js')
const MAX_MESSAGE_LENGTH = 40

module.exports.send = (id, token, repo, branch, url, commits, size, threadId) =>
  new Promise((resolve, reject) => {
    let client
    console.log('Webhook voorbereiden...')
    try {
      client = new WebhookClient({
        id: id,
        token: token,
      })

      client
        .send({
          embeds: [createEmbed(repo, branch, url, commits, size)],
        })
        .then(() => {
          console.log('Het bericht is succesvol verzonden!')
          resolve()
        }, reject)
    } catch (error) {
      console.log('Error creating Webhook')
      reject(error.message)
      return
    }
  })

function createEmbed(repo, branch, url, commits, size) {
  console.log('Embed bouwen...')
  console.log('Commits :')
  console.log(commits)
  if (!commits) {
    console.log('No commits, skipping...')
    return
  }
  const latest = commits[0]
  return new MessageEmbed()
    .setColor(0xffff53d4)
    .setAuthor({
      name: `${latest.author.username}`,
      iconURL: `https://github.com/${latest.author.username}.png?size=32`,
    })
    .setTitle(
      `${size} ${size === 1 ? 'update is' : 'updates zijn'} toegevoegd!`
    )
    .setDescription(`${getChangeLog(commits, size)}`)
    .setTimestamp(Date.parse(latest.timestamp))
    .setThumbnail(
      'https://cdn.discordapp.com/attachments/818091538289524776/848275693744816158/Maarsseveenlogo.png'
    )
    .setFooter({
      text: `Maarsseveen - Development`,
      iconURL:
        'https://cdn.discordapp.com/attachments/818091538289524776/848275693744816158/Maarsseveenlogo.png',
    }).set
}

function getChangeLog(commits, size) {
  let changelog = ''
  for (const i in commits) {
    if (i > 7) {
      changelog += `+ ${size - i} meer...\n`
      break
    }

    const commit = commits[i]
    const message =
      commit.message.length > MAX_MESSAGE_LENGTH
        ? commit.message.substring(0, MAX_MESSAGE_LENGTH) + '...'
        : commit.message
    changelog += `${message}\n`
  }

  return changelog
}
