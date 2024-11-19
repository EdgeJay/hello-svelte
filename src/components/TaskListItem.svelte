<script lang="ts">
  import { app } from '@/store.svelte';
  import { Task } from '@/models/tasks';

  interface Props {
    task: Task;
    editMode: boolean;
  }

  let { task, editMode }: Props = $props();
  let checked = $state(task.done);
  let editedDescription = $state(task.description);
  let isEditing = $state(editMode);

  const onDoneChange = () => {
    task.toggleDone();
  };

  const onEdit = () => {
    isEditing = true;
  };

  const onSave = () => {
    isEditing = false;
    task.description = editedDescription;
  };

  const onRemove = () => {
    app.tasks = app.tasks.reduce((acc, t) => {
      if (t.id !== task.id) {
        acc.push(t);
      }
      return acc;
    }, [] as Task[]);
  };
</script>

<div>
  <label class="checkbox">
    <input type="checkbox" onchange={onDoneChange} bind:checked />
    {#if !isEditing}
      {#if checked}
        <s>{task.description}</s>
      {:else}
        {task.description}
      {/if}
    {:else}
      <input
        type="text"
        placeholder="Task description here"
        bind:value={editedDescription}
      />
    {/if}
  </label>
  {#if !isEditing}
    <button onclick={onEdit}>Edit</button>
  {:else}
    <button onclick={onSave}>Save</button>
  {/if}
  <button onclick={onRemove}>Remove</button>
</div>
