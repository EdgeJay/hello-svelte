import { Task } from '@/models/tasks';

interface AppStore {
  tasks: Task[];
}

export const app: AppStore = $state({
  tasks: [],
});
