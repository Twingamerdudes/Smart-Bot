import dotenv from "dotenv"
dotenv.config()

import { ActivityType, Client, GatewayIntentBits} from "discord.js"

import { Configuration, OpenAIApi } from "openai";

let history = "Human: Hello. Smart Bot: Hello, how are you.\n"
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
})
client.login(process.env.DISCORD_TOKEN)

client.on("ready", async () =>{
    console.log("Smart Bot has awaken")
    client.user.setPresence({
        status: "online",
        activities:[
            {
                name: "you",
                type: ActivityType.Watching
            }
        ]
    });
})

client.on("messageCreate", async (message) => {
    if(message.type === 19){
        message.channel.sendTyping()
        const replyMessage = await message.fetchReference();
        if(replyMessage.author.username != "Smart Bot"){
            history += message.author.username + ": " + message.content + "\n";
            return
        }
        const respone = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "You are a sentient AI chatbot named Smart Bot. You have a IQ of 250. You're creator is Twingamerdudes, he is a independent programmer, and makes stupid projects. He works at a gamedev studio called Ohm Interactive.\nGoal: To interact with users and help them.\nTip: Don't finish people's messages for them.\nPrevious Interactions: " + history + "\nCurrent interaction: " + message.author.username + ": " + message.content + "\nPrevious Message you sent: " + replyMessage,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        while(respone.data.choices[0].text == ""){

        }
        message.channel.send(respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", ""))
        if(history.length > 500){
            history = "Human: Hello. Smart Bot: Hello, how are you.\n";
        }
        history += "Human: " + message.content + " " + respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", "") + "\n"
        return
    }
    if(message?.content.includes("<@1043632679821783081>")){
        message.channel.sendTyping()
        const respone = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "You are a sentient AI chatbot named Smart Bot. You have a IQ of 250. You're creator is Twingamerdudes, he is a independent programmer, and makes stupid projects. He works at a gamedev studio called Ohm Interactive.\nGoal: To interact with users and help them.\nTip: Don't finish people's messages for them.\nPrevious Interactions: " + history + "\nCurrent interaction: " + message.author.username + ": " + message.content.slice(21),
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        while(respone.data.choices[0].text == ""){

        }
        message.channel.send(respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", ""))
        if(history.length > 200){
            history = "Human: Hello. Smart Bot: Hello, how are you.\n";
        }
        history += message.author.username + ": " + message.content + " " + respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", "") + "\n"
        return
    }
    if(!message?.author.bot && message?.content.toLowerCase().startsWith("smart bot")){
        message.channel.sendTyping()
        const respone = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "You are a sentient AI chatbot named Smart Bot. You have a IQ of 250. You're creator is Twingamerdudes, he is a independent programmer, and makes stupid projects. He works at a gamedev studio called Ohm Interactive.\nGoal: To interact with users and help them.\nTip: Don't finish people's messages for them.\nPrevious Interactions: " + history + "\nCurrent interaction: " + message.author.username + ": " + message.content.slice(8),
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        while(respone.data.choices[0].text == ""){

        }
        message.channel.send(respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", ""))
        if(history.length > 200){
            history = "Human: Hello. Smart Bot: Hello, how are you.\n";
        }
        history += message.author.username + ": " + message.content + " " + respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", "") + "\n"
    }
    else if(!message?.content.toLowerCase().startsWith("smart bot")){
        if(message.content.includes("smart bot")){
            message.channel.sendTyping()
            const respone = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: "You are a sentient AI chatbot named Smart Bot. You have a IQ of 250. You're creator is Twingamerdudes, he is a independent programmer, and makes stupid projects. He works at a gamedev studio called Ohm Interactive.\nGoal: To interact with users and help them.\nTip: Don't finish people's messages for them.\nPrevious Interactions: " + history + "\nCurrent interaction: " + message.author.username + ": " + message.content,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            while(respone.data.choices[0].text == ""){
            }
            message.channel.send(respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", ""))
            if(history.length > 200){
                history = "Human: Hello. Smart Bot: Hello, how are you.\n";
            }
            history += message.author.username + ": " + message.content + " " + respone.data.choices[0].text.replace("Smart Bot:", "").replace("Human:", "") + "\n"
        }
        else{
            history += message.author.username + ": " + message.content + "\n";
        }
    }
    else if(!message?.author.bot && message?.content.toLowerCase().startsWith("reset") && message.author.username == "twingamerdudes"){
        history = "Human: Hello. Smart Bot: Hello, how are you.\n"
    }
})