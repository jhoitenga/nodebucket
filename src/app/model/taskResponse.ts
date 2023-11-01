/*
 * Title: taskResponse.ts
 * Author: Jennifer Hoitenga
 * Date: 11/1/2023
 * Sources:
 * Nodebucket Starter Project: https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
 * Previous repositories from my personal GitHub: https://github.com/jhoitenga?tab=repositories
 * Bootstrap: https://getbootstrap.com/docs/5.3/getting-started/introduction/
 */

// Import the custom model interface 'ITask'.
import { ITask } from './../model/task';

export interface TaskResponse {
  message: string;
  task: ITask;
}
