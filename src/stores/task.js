import { defineStore } from 'pinia'

export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    tasks: [],
    task: null,
    loading: false,
    error: null
  }),
  getters: {
    getTasksPerUser: (state) => {
      return (userId) => state.tasks.filter((task) => task.userId === userId)
    }
  },
  actions: {
    async fetchTasks () {
      this.tasks = []
      this.loading = true
      try {
        this.tasks = await fetch('http://localhost:8080/tasks/all/10')
          .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchTask (id) {
      this.task = null
      this.loading = true
      try {
        this.task = await fetch(`http://localhost:8080/tasks/${id}`)
          .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
