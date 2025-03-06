# Task-board

Welcome to Task Board Application ! This web application is designed to help project team members efficiently organize and manage their tasks.

## Description

Task board is a Kanban-style task management tool that allows project team members to add, manage, and track the progress of individual project tasks. This application provides an intuitive interface for organizing tasks into different progress states and ensures that tasks are color-coded based on their deadlines.

## User Story

- **AS A** project team member with multiple tasks to organize  
 - **I WANT** a task board  
 - **SO THAT** I can add individual project tasks, manage their state of progress and track overall project progress accordingly

## Acceptance Criteria

- **Given** a task board to manage a project
  - **When** I open the task board
  - **Then** the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
- **When** I view the task board for the project
  - **Then** each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
- **When** I click on the button to define a new task
  - **Then** I can enter the title, description and deadline date for the new task into a modal dialog
- **When** I click the save button for that task
  - **Then** the properties for that task are saved in localStorage
- **When** I drag a task to a different progress column
  - **Then** the task's progress state is updated accordingly and will stay in the new column after refreshing
- **When** I click the delete button for a task
  - **Then** the task is removed from the task board and will not be added back after refreshing
- **When** I refresh the page
  - **Then** the saved tasks persist

## Screenshots

## Application


