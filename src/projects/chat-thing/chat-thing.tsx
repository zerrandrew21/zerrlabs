import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material'
import { colors } from '../../colors';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface ChatItemProps {
  text: string;
}

const ChatItem = (text: string, index: number) => { 
  if (index % 2 === 1) {
    return <Typography sx={{backgroundColor: '#334554'}}>{text}</Typography>
  } else {
    return <Typography>{text}</Typography>
  }
}

const createImage = async (prompt: string) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: "512x512",
  });
  return response
}

const createChat = async (prompt: string) => { 
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}],
  });
  return completion.data.choices[0].message?.content
}

export default function ChatThing() {
  const [inputText, setInputText] = useState('');
  const [chatItems, setChatItems] = useState<ChatItemProps[]>([]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputText('');
    
    const newInputItem = { text: inputText };
    setChatItems(prevChatItems => [...prevChatItems, newInputItem]);

    const chat = await createChat(inputText)
    if (chat !== undefined) {
      const newResponseItem = { text: chat };
      setChatItems(prevChatItems => [...prevChatItems, newResponseItem]);
    }

  }

  return (
      <Box sx={{width: '100%', justifyContent: 'center', display: 'flex'}}>
        <Box id="chat-container">
          {chatItems.map((item, index) => (
            ChatItem(item.text, index)
          ))}
        </Box>
        <Box sx={{position: 'absolute', bottom: '0'}}>
          <form onSubmit={handleSubmit}>
            <TextField
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              sx={{ backgroundColor: colors.white500 }}
              label="Enter some text"
            />
          </form>
        </Box>
      </Box>
  );
}
