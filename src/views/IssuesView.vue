<script setup>
import { computed, ref } from 'vue'
import { mdiAccountMultiple, mdiEye, mdiTrashCan } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import { storeToRefs } from 'pinia'
import { useIssueStore } from '../stores/issue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import ModalBox from '@/components/ModalBox.vue'

const { issues } = storeToRefs(useIssueStore())
const { fetchIssues } = useIssueStore()

fetchIssues()

const titleStack = ref(['Admin', 'Issues'])

const modalOneActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const issuesPaginated = computed(
  () => issues.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(issues.value.length / perPage.value))

// const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})
</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <card-component
      class="mb-6"
      title="Issues"
      :icon="mdiAccountMultiple"
      has-table
    >
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(issue, index) in issuesPaginated"
            :key="issue.id"
            :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
          >
            <td data-label="Id">
              {{ issue.id }}
            </td>
            <td data-label="Title">
              {{ issue.title }}
            </td>
            <td data-label="Status">
              {{ issue.status }}
            </td>
            <td data-label="Priority">
              {{ issue.priority }}
            </td>
            <td
              data-label="Progress"
              class="progress-cell"
            >
              <progress
                max="100"
                :value="50"
              >
                50%
              </progress>
            </td>
            <!-- <td data-label="Created">
              <small
                class="text-gray-500 dark:text-gray-400"
                :title="client.created"
              >{{ client.created }}</small>
            </td> -->
            <td class="actions-cell">
              <jb-buttons
                type="justify-start lg:justify-end"
                no-wrap
              >
                <jb-button
                  color="info"
                  :icon="mdiEye"
                  small
                  @click="modalOneActive = true"
                />
                <jb-button
                  color="danger"
                  :icon="mdiTrashCan"
                  small
                  @click="isModalDangerActive = true"
                />
              </jb-buttons>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        :class="lightBorderStyle"
        class="p-3 lg:px-6 border-t dark:border-gray-800"
      >
        <level>
          <jb-buttons>
            <jb-button
              v-for="page in pagesList"
              :key="page"
              :active="page === currentPage"
              :label="page + 1"
              :outline="darkMode"
              small
              @click="currentPage = page"
            />
          </jb-buttons>
        </level>
      </div>
    </card-component>
  </main-section>
  <modal-box
    v-model="modalOneActive"
    title="Please confirm action"
    button-label="Confirm"
    has-cancel
  >
    <p>This is sample modal</p>
  </modal-box>
</template>
