<script lang="ts">
  // import svelteLogo from './assets/svelte.svg'
  // import viteLogo from '/vite.svg'
  import TaskList from '@/components/TaskList.svelte';

  const onHelp = (evt: Event) => {
    evt.preventDefault();
    console.log('help');
  };
</script>

<main>
  <section class="hero">
    <div class="hero-body">
      <p class="title">⏱️ Task Management Tool</p>
      <p class="subtitle">
        Simple task management tool built in Svelte 5.
        <a href={'#'} role="button" tabindex="0" onclick={onHelp}>How to use</a>
      </p>
    </div>
  </section>
  <section class="container is-mobile">
    <TaskList />
  </section>
</main>
