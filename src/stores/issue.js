import { defineStore } from 'pinia'

export const useIssueStore = defineStore({
  id: 'issue',
  state: () => ({
    issues: [],
    issue: null,
    loading: false,
    error: null
  }),
  getters: {
    getIssuesPerUser: (state) => {
      return (userId) => state.issues.filter((issue) => issue.userId === userId)
    }
  },
  actions: {
    async fetchIssues () {
      this.issues = []
      this.loading = true
      try {
        this.issues = await fetch('http://localhost:8080/issues/all/10')
          .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchIssue (id) {
      this.issue = null
      this.loading = true
      try {
        this.issue = await fetch(`http://localhost:8080/issues/${id}`)
          .then((response) => response.json())
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})
