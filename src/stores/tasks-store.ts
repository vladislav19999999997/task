import { defineStore } from 'pinia'
import { typeState, typesTask } from 'components/models'

export const useTasksStore = defineStore('tasks', {
  state: ():typeState => ({
    taskList: []
  }),
  getters: {
    getTaskList () :Array<typesTask> {
      return this.taskList
    }
  },
  actions: {
    addTasks (task: string) {
      const obj: typesTask = {
        id: Math.random(),
        text: task
      }
      this.taskList.push(obj)
    },
    removeTask (id: number) {
      const indexTask: number = this.taskList.findIndex((item :typesTask) => (item?.id === id))
      this.taskList.splice(indexTask, 1)
    },
    saveTask (newTask: typesTask) {
      this.taskList = this.taskList.map((task) => {
        if (newTask.id === task.id) {
          return newTask
        }
        return task
      })
    },
    saveTaskList () {
      localStorage.setItem('taskList', JSON.stringify(this.taskList))
    },
    downloadTaskList () {
      this.taskList = JSON.parse(localStorage.getItem('taskList')) || []
    }
  }
})
