    import React, { useEffect, useState } from 'react';
    import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
    import { Buffer } from 'buffer';
    import AWS from "aws-sdk";
    const REGION = "us-west-2"; // e.g., "us-west-2"
    const ACCESS_KEY_ID = "ASIATPJQO7YDQDWQA7WM";
    const SECRET_ACCESS_KEY = "JhHBFHxYNXkSJEc2WHOzf0uhvs8ruqlQMGLCO4xC";
    const SESSION_TOKEN = "IQoJb3JpZ2luX2VjEOr//////////wEaCXVzLWVhc3QtMSJIMEYCIQDFWZsi7WzOryjGOC/QuwE96QBjJVOuYfjiBcYwhWq5UgIhAOVZ+RSgiWdVIHyfZNhOreRsIEe+4SARBTLdQthbFthkKpkCCGMQAhoMMjM5MDA5MjAxNjcxIgxHN7OAtRq+3F30WPEq9gFnn9Ha5gYCbFR7FdoEnkdQg628BSzKNjsgGwOkcriZ5M5ZHLeCL9vr14SSNhSMv/zwiebl6Sto+0TFEr+q0LYQ0dNqu6swimxOw5A4xfOfoRr+nAAPWsdwL5o6lh5x0xwbGXYkAH5V3cem6VqS2yusFA7K51ethBCwQPdQoEaa6k9gS9guytE9ZLCbpZPp4Pg28yySMDwwT0cDyeWs/3yaseO1au/4CLqG+55Eq9Jh8d9sehzOY8//Ab3hc0mrsekX/9X7r5HRFeGRdlbj27cjBLD0vCfssUsrsxP9mluFlZFLjH/rrj2G91BtFrq4koBI2RWRVH4wsNa4sgY6nAFkcFY0HegN72eZjEpd7Ayoy1o71eyNM0QhIH1ZrsmBtqXsWZSyZIwZEgG/Z1Dfjrw7aTAoaOZInrK3JlWpoysKly3kf+lTDOJDBjKcRTsFMPfJMe9keMfocbOKN7sPQvpjUGJWO0rnu+J14afOZuhcQztrNfOahlrd44DhRsqCQkg+lYzIQObzQae+8oGDk8r09v4Jb3lzxkbVZPs=";


    function Game() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [client, setClient] = useState(null);

    useEffect(()=>{

        // AWS.config.update({
        //     accessKeyId: ACCESS_KEY_ID,
        //     secretAccessKey: SECRET_ACCESS_KEY,
        //     sessionToken: SESSION_TOKEN,
        //     region: REGION,
        //   });
          
        const bedrockClient = new BedrockRuntimeClient({
            region: REGION,
            credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
            sessionToken: SESSION_TOKEN,
            },
        });
        
        setClient(bedrockClient);
    },[])
    
    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    

    const handleGenerateClick = async () => {
        try {

        const prompt = ""
        const request = {
            "modelId": "meta.llama3-70b-instruct-v1:0",
            "contentType": "application/json",
            "accept": "application/json",
            "body": "{\"prompt\":\"w ho is the first us president\",\"max_gen_len\":512,\"temperature\":0.5,\"top_p\":0.9}"
        }


        const command = new InvokeModelCommand(request);
        const response = await client.send(command);
        const completion = JSON.parse(Buffer.from(response.body).toString('utf8'));

        console.log(completion);
        } catch (error) {
        console.error('Error generating response:', error);
        }
    };

    return (
        <div>
        <h1>Generate Text with AWS Bedrock</h1>
        <textarea
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Enter your prompt here"
        />
        <button onClick={handleGenerateClick}>Generate</button>
        <div>
            <h2>Response:</h2>
            <p>{response}</p>
        </div>
        </div>
    );
    }

    export default Game;
