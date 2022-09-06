import { defineStore } from 'pinia'
import { useIssueStore } from './issue'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: []
  }),
  getters: {
    getIssueComments: (state) => {
      const issueStore = useIssueStore()
      return state.comments.filter((issue) => issue.issuedId === issueStore.issue.id)
    }
  },
  actions: {
    async fetchComments() {
      this.comments = await fetch('http://localhost:8090')
        .then((response) => response.json())
    }
  }
})
