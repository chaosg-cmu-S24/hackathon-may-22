    import React, { useEffect, useState } from 'react';
    import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
    import { Buffer } from 'buffer';
    import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';

    import AWS from "aws-sdk";
    

    function App() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [client, setClient] = useState(null);
    // const { firstTry } = useFlags();

    useEffect(()=>{
        // console.log("firstTry", firstTry);
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

    export default withLDProvider({
        clientSideID: '664e4326c06507107c5f123a',
        key: 'christmas????',
        options: {
          bootstrap: 'localStorage'
        },
      })(App);