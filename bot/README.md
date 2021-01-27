# discord-bot

All the heavy lifting for running the bot itself is handled by [discord-bot](https://github.com/ducktrshessami/discord-bot)

At the time of writing this README I haven't finished writing the documentation for discord-bot, but the gist of what you need to know is the `Command` class takes the following params:
- `name`: string
- `callback`: function(message, args?)
- `options`: obj?
    - `usage`: string?
    - `description`: string?
    - `subtitle`: string?
    - `hidden`: boolean?
    - `owner`: boolean?
    - `admin`: boolean?
    - `aliases`: array<string>?

`?` meaning optional

the `message` param of the callback will be a [Message object](https://discord.js.org/#/docs/main/stable/class/Message)
