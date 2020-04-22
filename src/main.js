import { createBoardTemplate } from "./components/board.js";
import { createFilterTemplate } from "./components/filter.js";
import { createLoadMoreButtonTemplate } from "./components/load-more-button.js";
import { createSiteMenuTemplate } from "./components/site-menu.js";
import { createTaskTemplate } from "./components/task-create.js";
import { createTaskEditTemplate } from "./components/task-edit.js";
import { generateFilters } from "./mock/filter.js";
import { generateTasks } from "./mock/tasks.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASK_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate( generateFilters(tasks) ));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount).forEach((task) => {
  render(taskListElement, createTaskTemplate(task));
});

render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount).forEach((task) => {
    render(taskListElement, createTaskTemplate(task));
  })

  if (showingTasksCount  >= tasks.length) loadMoreButton.remove();
});
