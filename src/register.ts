import { Command, Option, register } from 'discord-hono'

const commands = [
  new Command("アップロード","このチャンネルにアップロードする"),
  new Command("upload","Upload to this channel")
]

register(
  commands,
  Bun.env.DISCORD_APPLICATION_ID,
  Bun.env.DISCORD_TOKEN,
)