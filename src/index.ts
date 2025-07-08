import { Button, Components, DiscordHono,Embed } from 'discord-hono'

interface Bindings {
  API:Service
  APIKEY:string
}

const app = new DiscordHono<{Bindings:Bindings}>()
  .command("アップロード",async (c)=>{
    const name = crypto.randomUUID()
    if (!c.env.APIKEY) {
      throw new Error("APIKEY is undefined");
    }
    if (!name) {
      throw new Error("name is undefined");
    }
    const res = await c.env.API.fetch("https://cdn.taisan11.f5.si/api/uploadkey",{
      method: "POST",
      body: JSON.stringify({
        key: c.env.APIKEY,
        name: name,
      })
    })
    return c.flags("EPHEMERAL").res({
      content: "このリンクからアップロードしてください。\nhttps://cdn.taisan11.f5.si/upload/" + name + "\n"+await res.text(),
      components: new Components().row(
        new Button("uploaded","アップロード完了したら押してください").custom_id(name),new Button("uploaded-video","動画をアップロードしたら押してください。").custom_id(name)
      )
    })
  })
  .component("uploaded", async (c) => {
    return c.res({
      content: "アップロードが完了しました。",
      embeds: [
        new Embed()
          .title("ファイルアップロード完了")
          .description("ファイルのアップロードが完了しました。")
          .url("https://cdn.taisan11.f5.si/download/" + c.var.custom_id)
          .color(0x00ff00)
      ],
      components: []
    });
  })
  .component("uploaded-video", async (c) => {
    return c.res({
      content: "動画のアップロードが完了しました。",
      embeds: [
        new Embed()
          .title("動画アップロード完了")
          .description("動画のアップロードが完了しました。")
          .url("https://cdn.taisan11.f5.si/download/" + c.var.custom_id)
          .video({url:"https://cdn.taisan11.f5.si/download/" + c.var.custom_id})
          .color(0x00ff00)
      ],
      components: []
    });
  })

export default app