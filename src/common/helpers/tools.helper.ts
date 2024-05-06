import { memories } from "./memory";
import { other } from "./other-activities.helper";
import { save } from "./save";
import { scrap } from "./scraper.helper";
import { social } from "./social.helper";

export const tools: any = {
	scrap: scrap,
	social: social,
	memories: memories,
	save: save,
	other: other
};