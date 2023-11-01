/*
 * Title: task.ts
 * Author: Jennifer Hoitenga
 * Date: 11/1/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

export interface ITask {
  taskId?: number; // Task ID is optional when creating a new task
  taskDescription: string;
}
