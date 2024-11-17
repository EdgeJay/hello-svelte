<script lang="ts">
  import { app } from '@/store.svelte';
  import TaskListItem from '@/components/TaskListItem.svelte';
</script>

<section>
  {#each app.tasks as task (task.id)}
    <TaskListItem {task} />
  {/each}
</section>
