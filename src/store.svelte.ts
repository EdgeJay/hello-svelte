import { Task } from '@/models/tasks';

interface AppStore {
  tasks: Task[];
}

export const app: AppStore = $state({
  tasks: [
    new Task('sample task 1'),
    new Task('sample task 2'),
    new Task('sample task 3'),
  ],
});
