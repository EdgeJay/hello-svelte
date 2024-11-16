import { expect, describe, test } from 'vitest';
import { version as uuidVersion } from 'uuid';
import { Task, NO_TIME_LIMIT } from './tasks';

describe('Task', () => {
  test('id should be populated with UUID V7', () => {
    const task = new Task('foo');
    expect(task.id).not.toBeUndefined();
    expect(uuidVersion(task.id)).toBe(7);
  });

  test('description should be set', () => {
    const task = new Task('foo 2');
    expect(task.description).toBe('foo 2');
  });

  test('additional properties to be defined without time limit', () => {
    const task = new Task('foo 3');
    expect(task.additionalProperties.timeLimit).toBe(NO_TIME_LIMIT);
  });

  test('should allow toggling of done status', () => {
    const task = new Task('foo 4', true);
    expect(task.done).toBe(true);

    task.toggleDone();
    expect(task.done).toBe(false);
  });

  test('should allow task to be marked as done', () => {
    const task = new Task('foo 4', false);
    expect(task.done).toBe(false);

    task.markAsDone();
    expect(task.done).toBe(true);
  });

  test('should allow task to be marked as started', () => {
    const task = new Task('foo 5', false, false);
    expect(task.hasStarted()).toBe(false);

    task.started = true;
    expect(task.hasStarted()).toBe(true);

    task.started = false;
    expect(task.hasStarted()).toBe(false);
    task.start();
    expect(task.hasStarted()).toBe(true);
  });

  test('startTime should be saved when it is marked as started', () => {
    const task = new Task('foo 6', false, false);
    task.start();
    expect(task.additionalProperties.startTime).not.toBeUndefined();

    const now = new Date();
    expect(task.additionalProperties.startTime?.getTime()).toBeLessThanOrEqual(
      now.getTime()
    );
  });

  test('endTime should be undefined when it is marked as started', () => {
    let task = new Task('foo 7', false, false);
    task.start();
    expect(task.additionalProperties.endTime).toBeUndefined();

    task = new Task('foo 8', false, false);
    task.additionalProperties.endTime = new Date();
    task.start();
    expect(task.additionalProperties.endTime).toBeUndefined();
  });

  test('should not be marked as started when task has ended', async () => {
    const task = new Task('foo 8', false, false);
    task.start();

    await new Promise((resolve) => setTimeout(resolve, 500));

    task.end();
    expect(task.started).toBe(false);
    expect(task.hasStarted()).toBe(false);
  });

  test('endTime should be saved when task has ended', async () => {
    const task = new Task('foo 8', false, false);
    task.start();

    await new Promise((resolve) => setTimeout(resolve, 500));

    task.end();
    expect(task.additionalProperties.startTime).toBeDefined();
    expect(task.additionalProperties.endTime).toBeDefined();
    expect(task.additionalProperties.endTime!.getTime()).toBeGreaterThan(
      task.additionalProperties.startTime!.getTime()
    );
  });

  test('duration() method returns diff between startTime and endTime', async () => {
    const task = new Task('foo 8', false, false);
    task.start();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    task.end();
    expect(task.duration()).toBeGreaterThanOrEqual(1000);
  });
});
