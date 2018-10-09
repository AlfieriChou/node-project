let grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)
 
const REMOTE_SERVER = "0.0.0.0:5001"
let username

let client = new proto.example.Chat(
  REMOTE_SERVER,
  grpc.credentials.createInsecure()
)

function startChat() {
  let channel = client.join({ user: username })
  channel.on("data", onData)
  rl.on("line", function(text) {
    client.send({ user: username, text: text }, res => {})
  })
}

function onData(message) {
  if (message.user === username) {
    return
  }
  console.log(`${message.user}: ${message.text}`)
}

rl.question("What's ur name? ", answer => {
  username = answer
  startChat()
})