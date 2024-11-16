import { v7 as uuidV7 } from 'uuid';

export const NO_TIME_LIMIT: number = -1;

class TaskAdditionalProperties {
  timeLimit: number;
  startTime?: Date;
  endTime?: Date;

  constructor(
    timeLimit: number = NO_TIME_LIMIT,
    startTime?: Date,
    endTime?: Date
  ) {
    this.timeLimit = timeLimit;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

class Task {
  id = uuidV7();
  description: string;
  done: boolean;
  started: boolean;
  additionalProperties: TaskAdditionalProperties;

  constructor(
    description: string,
    done: boolean = false,
    started: boolean = false,
    additionalProperties = new TaskAdditionalProperties()
  ) {
    this.description = description;
    this.done = done;
    this.started = started;
    this.additionalProperties = additionalProperties;
  }

  isDone(): boolean {
    return this.done === true;
  }

  toggleDone(): boolean {
    this.done = !this.done;
    return this.done;
  }

  markAsDone() {
    this.done = true;
  }

  hasStarted(): boolean {
    return this.started;
  }

  start() {
    this.started = true;
    this.additionalProperties.startTime = new Date();
    this.additionalProperties.endTime = undefined;
  }

  end() {
    this.started = false;
    this.additionalProperties.endTime = new Date();
  }

  duration(): number {
    if (
      !this.additionalProperties.startTime ||
      !this.additionalProperties.endTime
    ) {
      return 0;
    }

    return Math.ceil(
      this.additionalProperties.endTime!.getTime() -
        this.additionalProperties.startTime!.getTime()
    );
  }
}

export { Task, TaskAdditionalProperties };
