<script lang="ts">
  import { removeTask, refreshCompletedCount } from '@/store.svelte';
  import { Task } from '@/models/tasks';

  interface Props {
    task: Task;
    editMode: boolean;
  }

  let { task, editMode }: Props = $props();
  let checked = $state(task.done);
  let editedDescription = $state(task.description);
  let isEditing = $state(editMode);

  const saveAndExitEditMode = () => {
    isEditing = false;
    task.description = editedDescription;
  };

  const onDoneChange = () => {
    task.toggleDone();
    refreshCompletedCount();
  };

  const onEdit = () => {
    isEditing = true;
  };

  const onSave = () => {
    saveAndExitEditMode();
  };

  const onInputKeyUp = (evt: KeyboardEvent) => {
    if (evt.key === 'Enter') {
      saveAndExitEditMode();
    }
  };

  const onRemove = () => {
    removeTask(task.id);
  };
</script>

<div class="task-list-item">
  {#if !isEditing}
    <div>
      <label class="checkbox">
        <input type="checkbox" onchange={onDoneChange} bind:checked />
        {#if checked}
          <s>{task.description}</s>
        {:else}
          <span>{task.description}</span>
        {/if}
      </label>
      <!--
      <button onclick={onEdit} aria-label="Edit">
        <i class="bx bx-edit-alt"></i>
      </button>
      -->
    </div>
  {:else}
    <div class="field has-addons">
      <p class="control is-flex-grow-1">
        <input
          class="input"
          type="text"
          placeholder="Task description here"
          onkeyup={onInputKeyUp}
          bind:value={editedDescription}
        />
      </p>
      <p class="control">
        <button class="button" onclick={onSave} aria-label="Save">
          <i class="bx bx-save"></i>
          <span class="ml-1 icon-text">
            <span>Save</span>
          </span>
        </button>
      </p>
    </div>
  {/if}
  <!--
  <button onclick={onRemove} aria-label="Remove">
    <i class="bx bx-trash"></i>
  </button>
  -->
</div>

<style>
  .task-list-item:not(:first-child) {
    margin-top: 0.5em;
  }

  label.checkbox > s,
  span {
    padding-left: 0.5em;
  }
</style>
