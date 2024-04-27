<script>
    import "../app.css";
    import { Toaster } from 'svelte-sonner';

    export let data;
</script>

<Toaster position="top-center" duration={5000} richColors closeButton />

<nav class="h-16 w-screen mt-4 top-0 left-0">
    {#if data.user}
        <a class="nav-item text-blue-500" href="/account">Hello, {data.user.username}</a>
    {:else}
        <a class="nav-item p-2 rounded-xl border-2 border-red" href="/login">Log in</a>
    {/if}
</nav>

<slot />

<style lang="postcss">
    :global(body) {
        @apply bg-slate-800 text-white
    }
</style>