<script lang="ts">
  import { Task } from '@/models/tasks';

  interface Props {
    task: Task;
  }

  let { task }: Props = $props();
</script>

<div>
  <p>{task.description}</p>
</div>
