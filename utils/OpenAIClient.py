import openai
import requests


class OpenAIClient:
    _model_id = "gpt-4"

    def __init__(self):
        openai.organization = "org-IwKZC84HB4FE4sLGePCet08w"
        openai.api_key = "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"

    def get_skill_types(self) -> list:
        print("Getting Skill Types")
        completion = openai.ChatCompletion.create(
            model=self._model_id,
            messages=[
                {"role": "user", "content": "Any type of skills list."}
            ]
        )
        return self._process_content(completion.choices[0].message.content)

    def get_skills(self, skill_type: str) -> list:
        print(f"Getting Skills {skill_type}")
        completion = openai.ChatCompletion.create(
            model=self._model_id,
            messages=[
                {"role": "user", "content": f"{skill_type} list."}
            ]
        )
        return self._process_content(completion.choices[0].message.content)

    def _process_content(self, content: str) -> list:
        lines = content.splitlines()
        return lines


if __name__ == '__main__':

    # The API endpoint to communicate with
    url_post = "http://localhost:3001/api/skill"

    # A POST request to tthe API

    print("Starting")
    client = OpenAIClient()
    for skill_type in client.get_skill_types():
        msg = f"{skill_type} Skills"
        print(msg)
        for skill in client.get_skills(f"{skill_type}"):
            skill_name = skill
            if skill:
                skill_name = skill[3:].strip()
                new_data = {
                    "name": skill_name,
                    "type": skill_type
                }
                post_response = requests.post(url_post, json=new_data)
                post_response_json = post_response.json()
                print(post_response_json)
