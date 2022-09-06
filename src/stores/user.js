import { defineStore } from 'pinia'
import { useIssueStore } from './post'

export const useAuthorStore = defineStore({
  id: 'user',
  state: () => ({
    users: []
  }),
  getters: {
    getIssueUser: (state) => {
      const issueStore = useIssueStore()
      return state.users.find((user) => user.id === issueStore.issue.userId)
    }
  },
  actions: {
    async fetchIssues () {
      this.users = await fetch('https://localhost:8080/users')
        .then((response) => response.json())
    }
  }
})
