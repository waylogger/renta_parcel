import { binding } from "./bind";
import { calInject } from "./calinject";
import { clearForm } from "./clearForm";
import { whenDataLoad } from "./loadData";
import { dataFromServer } from "./state/dataFromServer";


whenDataLoad().then(
	async () => {
		await clearForm();
		await binding();
		await calInject();
	}
)