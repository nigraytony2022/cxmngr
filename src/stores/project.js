import { defineStore } from 'pinia'

export const useProjectStore = defineStore({
  id: 'project',
  state: () => ({
    projects: [],
    project: null,
    user: {
      id: 1,
      name: 'Nigel Gray'
    },
    loading: false,
    error: null
  }),
  getters: {
    getProjectsPerUser: (state) => {
      return (user) => state.projects.filter((project) => project.userId === user.id)
    }
  },
  actions: {
    async fetchProjects () {
      this.projects = []
      this.loading = true
      try {
        this.projects = await fetch('http://localhost:8080/projects/')
          .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchProject (id) {
      this.project = null
      this.loading = true
      try {
        this.project = await fetch(`http://localhost:8080/projects/${id}`)
          .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
