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


def save_skill_types():
    url_post_type = "http://localhost:3001/api/skill_type"
    client = OpenAIClient()
    for skill_type in client.get_skill_types():
        new_data = {
            "name": skill_type,
            "status": "created"
        }
        post_response = requests.post(url_post_type, json=new_data)
        post_response_json = post_response.json()
        print(post_response_json)


def save_skills():
    client = OpenAIClient()

    response = requests.get("http://localhost:3001/api/skill_types/created")
    skill_types = response.json()
    print(skill_types)

    for skill_type in skill_types:
        print(skill_type)
        msg = f"{skill_type['name']} Skills"
        print(msg)
        for skill in client.get_skills(f'{skill_type["name"]}'):
            if skill:
                skill_name = skill[3:].strip()
                new_data = {
                    "name": skill_name,
                    "type": skill_type["name"]
                }
                post_response = requests.post("http://localhost:3001/api/skill", json=new_data)
                post_response_json = post_response.json()
                print(post_response_json)

        update_data = {
            "status": "done"
        }
        post_response = requests.put(f"http://localhost:3001/api/skill_type/{skill_type['_id']}", json=update_data)
        post_response_json = post_response.json()
        print(post_response_json)


if __name__ == '__main__':
    # save_skill_types()
    save_skills()
