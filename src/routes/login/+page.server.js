import { error, redirect } from '@sveltejs/kit'

export const load = ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		redirect(303, '/account');
	}
};

export const actions = {
    register: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        formData["passwordConfirm"] = formData["password"];

        try {
            await locals.pb.collection("users").create(formData);
            await locals.pb.collection("users").authWithPassword(formData.username, formData.password);
        } catch (err) {
            console.log("Error: ", err.response);
            error(400, err.response);
        }

        redirect(303, "/");
    },

    login: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection("users").authWithPassword(formData.username, formData.password);
        } catch (err) {
            console.log("Error: ", err.response);
            error(400, err.response);
        }

        redirect(303, "/");
    },
};