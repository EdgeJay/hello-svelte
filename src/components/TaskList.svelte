<script lang="ts">
  import { app } from '@/store.svelte';
  import { Task } from '@/models/tasks';
  import TaskListItem from '@/components/TaskListItem.svelte';

  const onAddTask = () => {
    const task = new Task('');
    app.tasks.push(task);
  };
</script>

<div class="box">
  <section class="section">
    <h5 class="subtitle is-5">
      {app.completedCount}/{app.tasks.length} tasks completed
    </h5>
    {#if app.tasks.length < 1}
      <p class="no-tasks">No tasks added yet.</p>
    {:else}
      {#each app.tasks as task (task.id)}
        <TaskListItem {task} editMode={task.description === ''} />
      {/each}
    {/if}
    <div class="mt-5">
      <button class="button is-success" onclick={onAddTask}>Add task</button>
    </div>
  </section>
</div>

<style>
  .no-tasks {
    text-align: center;
  }
</style>
