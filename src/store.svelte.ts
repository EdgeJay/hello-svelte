import { Task } from '@/models/tasks';

interface AppStore {
  tasks: Task[];
  completedCount: number;
}

export const app: AppStore = $state({
  tasks: [],
  completedCount: 0,
});

export const refreshCompletedCount = () => {
  app.completedCount = app.tasks.reduce((acc, task) => {
    if (task.done) {
      acc += 1;
    }
    return acc;
  }, 0);
};

export const removeTask = (taskId: string) => {
  app.tasks = app.tasks.reduce((acc, t) => {
    if (t.id !== taskId) {
      acc.push(t);
    }
    return acc;
  }, [] as Task[]);
};
