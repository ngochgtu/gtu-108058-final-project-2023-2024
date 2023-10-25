import {PartialType} from "@nestjs/mapped-types";
import {CreateSkillTypeDto} from "./CreateSkillType.dto";

export class UpdateSkillTypeDto extends PartialType(CreateSkillTypeDto) {
}
