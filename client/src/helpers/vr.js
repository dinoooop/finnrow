import { bc } from "./bc";

// validator
export class vr {

	static validate(e, validateForm, formValues = null) {

		

		const { name, value, type, checked, files, options, multiple, dataset } = e.target;

		if(dataset.customField == "multi-select"){
			const {customValues, customName} = dataset;
			const customValuesArray = customValues.split(',').map(item => item)
			console.log(customValuesArray);
			
			return {
				formValues: { [customName]: customValuesArray },
				error: { [customName]: validateForm(customName, customValuesArray) }
			}
		}

		if(dataset.customField == "single-select"){
			const {customValue, customName} = dataset;
			
			return {
				formValues: { [customName]: customValue },
				error: { [customName]: validateForm(customName, customValue) }
			}
		}
		
		if (type == "select" && multiple) {
			// Handle multi-select change
			const selectedValues = [];
			for (let i = 0; i < options.length; i++) {
				if (options[i].selected) {
					selectedValues.push(options[i].value);
				}
			}

			return {
				formValues: { [name]: selectedValues },
				error: { [name]: validateForm(name, selectedValues) }
			}
		}

		if (type === 'checkbox') {

			// Special conditions by name, for single checkbox
			if (name === 'status') {
				return {
					formValues: { [name]: checked },
					error: { [name]: validateForm(name, value) }
				}
			}


			const error = validateForm(name, value)
			const newFormValues = { ...formValues }

			newFormValues[name] = bc.toggleArrayItem(newFormValues[name], value);
			return { formValues: newFormValues, error: { [name]: error } }

		} else if (type === 'file') {

			if (multiple) {
				const filesArray = Array.from(files)
				const fileUrls = []
				filesArray.map(file => {
					fileUrls.push(URL.createObjectURL(file))
				})
				return {
					formValues: { [name]: filesArray, [name + '_urls']: fileUrls },
					error: { [name]: validateForm(name, filesArray) }
				}
			}
	
			const file = files[0]
			const error = validateForm(name, file)

			if(name === 'avatar' || name === 'photo'){
				const fileUrl = URL.createObjectURL(file);

				return {
					formValues: { [name]: file, [name + '_url']: fileUrl },
					error: { [name]: error }
				}

			}
			return {
				formValues: { [name]: file },
				error: { [name]: error }
			}
		} else {
			const error = validateForm(name, value, formValues)
			return {
				formValues: { [name]: value },
				error: { [name]: error }
			}
		}
	}

	static submit(formValues, validateForm) {
		const updatedErrors = {}
		Object.entries(formValues).forEach(([key, value]) => {
			updatedErrors[key] = validateForm(key, value, formValues)
		})
		const allErrorsFalse = Object.values(updatedErrors).every(error => error === false)

		if (allErrorsFalse) {
			return formValues
		}

		return { errors: updatedErrors }
	}

	static submitFile(formValues, validateField) {

		const updatedErrors = Object.fromEntries(
			Object.entries(formValues).map(([key, value]) => [key, validateField(key, value)])
		)

		const allErrorsFalse = Object.values(updatedErrors).every((error) => error === false)

		if (allErrorsFalse) {
			const newFormData = new FormData()
			Object.entries(formValues).forEach(([key, value]) => {
				newFormData.append(key, value)
			});

			return newFormData
		}

		return { errors: updatedErrors }
	}

	

}