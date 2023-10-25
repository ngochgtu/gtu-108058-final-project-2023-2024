import {Injectable} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OpenaiService {
    private readonly OPENAI_URL = 'https://api.openai.com/v1/engines/davinci/completions';
    private readonly API_KEY = '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'; // Use environment variables for production

    async getCompletion(prompt: string): Promise<string> {
        const headers = {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
        };

        const body = {
            prompt: prompt,
            max_tokens: 150,
        };

        try {
            const response = await axios.post(this.OPENAI_URL, body, {headers: headers});
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw new Error('Failed to get completion from OpenAI');
        }
    }

    async getSkills(): Promise<string> {
        const headers = {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
        };

        const body = {
            prompt: "Write List of all available type of Skill.",
            max_tokens: 150,
        };

        try {
            const response = await axios.post(this.OPENAI_URL, body, {headers: headers});
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            throw new Error('Failed to get completion from OpenAI');
        }
    }
}
