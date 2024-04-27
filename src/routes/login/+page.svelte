<script>
    import { enhance } from "$app/forms";
    import { toast } from 'svelte-sonner';

    let loading = false;
    let showPassword = false;
    $: type = showPassword ? "text" : "password";

    const formSubmit = ({action}) => {
        loading = true;

        return async ({ result, update }) => {
            if (result.type === "error") {
                let errorMessage = "";
                if (action.search === "?/login") {
                    errorMessage = "Invalid username or password.";
                } else {
                    if (result.error.data.username) {
                        errorMessage += "Username has already been taken. ";
                    }

                    if (result.error.data.password) {
                        errorMessage += "Invalid password, must be at least 8 characters.";
                    }
                }
                toast.error(errorMessage);
            } else {
                if (action.search === "?/login") {
                    toast.success("Logged in.");
                } else {
                    toast.success("Account has been created.");
                }
                await update();
            }
            loading = false;
        }
    }
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
    <h1 class="h-16 w-[32rem] flex justify-center items-center font-bold text-xl bg-slate-900 border-2 border-slate-400 rounded-t-md">Log in or Sign up</h1>
    <form use:enhance={formSubmit} class="h-96 w-[32rem] flex flex-col justify-center items-center bg-slate-900 border-b-2 border-x-2 border-slate-400 rounded-b-md" method="POST" action="?/login">
        
        <div class="w-[80%] mb-8">
            <label class="w-full pl-3 flex text-gray-700 items-center bg-slate-200 rounded-t-md transition-colors duration-300" for="username_input">Username<span class="pl-1 text-red-600">*</span></label>
            <input class="w-full pb-2 pl-2 text-black bg-slate-200 rounded-b-md focus:outline-none focus:bg-slate-300 transition-colors duration-300" type="text" name="username" required id="username_input" />
        </div>

        <div class="w-[80%]">
            <label class="w-full pl-3 flex text-gray-700 items-center bg-slate-200 rounded-t-md transition-colors duration-300" for="password_input">Password<span class="pl-1 text-red-600">*</span></label>
            <input class="w-full pb-2 pl-2 text-black bg-slate-200 rounded-b-md focus:outline-none focus:bg-slate-300 transition-colors duration-300" type={type} name="password" required id="password_input" />
        </div>
        <div class="w-[80%] mb-8 text-end">
            <button class="w-fit text-gray-200 hover:text-gray-400 transition-colors duration-300" type="button" tabindex="-1" disabled={loading} on:click={() => showPassword = !showPassword}>{showPassword ? "Hide Password" : "Show Password"}</button>
        </div>

        <div class="w-[80%] flex flex-col text-black">
            <button class="h-12 mb-4 p-1 bg-green-400 rounded-md hover:bg-green-600 transition-colors duration-300" type="submit" formaction="?/login" disabled={loading}>Login</button>
            <button class="h-12 mb-4 p-1 bg-blue-400 rounded-md hover:bg-blue-600 transition-colors duration-300" type="submit" formaction="?/register" disabled={loading}>Register</button>
        </div>

        <div class="hidden w-[80%]">
            <button class="text-sm italic text-gray-400 hover:text-gray-500 transition-colors duration-300" type="button" tabindex="-1" disabled={loading}>Forgotten Password?</button>
        </div>

    </form>
</div>

<style lang="postcss">
    div:focus-within > label {
        @apply bg-slate-300
    }
</style>