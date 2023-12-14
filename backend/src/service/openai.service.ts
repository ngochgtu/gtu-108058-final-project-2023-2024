import {Injectable} from '@nestjs/common';
import axios from 'axios';
import * as process from "process";

@Injectable()
export class OpenaiService {
    private readonly OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
    private readonly API_KEY = process.env.OPENAI_API_KEY || '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'

    async getCompletion(prompt: string): Promise<string> {
        const headers = {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
        };

        const body = {
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": prompt
                },
            ]
        };

        try {
            const response = await axios.post(this.OPENAI_URL, body, {headers: headers});
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw new Error('Failed to get completion from OpenAI');
        }
    }

    async getGPT3_5Completion(prompt: string): Promise<string> {
        const headers = {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
        };

        const body = {
            model: "gpt-3.5-turbo-1106",
            messages: [
                {
                    "role": "system",
                    "content": 'you generate quizes for skill verification',
                },
                {
                    "role": "system",
                    "content": prompt + "Don't add any comments. remove last value from options array and return", 
                },
            ]
        };

        try {
            const response = await axios.post(this.OPENAI_URL, body, {headers: headers});
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw new Error('Failed to get completion from OpenAI');
        }
    }
}
