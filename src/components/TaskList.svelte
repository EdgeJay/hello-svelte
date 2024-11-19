<script lang="ts">
  import { app } from '@/store.svelte';
  import { Task } from '@/models/tasks';
  import TaskListItem from '@/components/TaskListItem.svelte';

  let newTaskId: string = '';

  export const addTask = () => {
    const task = new Task('');
    newTaskId = task.id;
    app.tasks.push(task);
  };
</script>

<section>
  {#each app.tasks as task (task.id)}
    <TaskListItem
      {task}
      editMode={task.id === newTaskId && task.description === ''}
    />
  {/each}
</section>
