import {Injectable} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
    private readonly OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
    private readonly API_KEY = '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'

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
}
