<script setup>
import { computed, ref } from 'vue'
import { mdiAccountMultiple, mdiEye, mdiTrashCan } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import ModalBox from '@/components/ModalBox.vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '@/stores/project'

const { projects } = storeToRefs(useProjectStore())
const { fetchProjects } = useProjectStore()

fetchProjects()

const titleStack = ref(['Admin', 'Projects'])

const modalOneActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const projectsPaginated = computed(
  () => projects.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(projects.value.length / perPage.value))

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
      title="Projects"
      :icon="mdiAccountMultiple"
      has-table
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Industry</th>
            <th>Client</th>
            <th>Status</th>
            <th>Subscription</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(project, index) in projectsPaginated"
            :key="project.id"
            :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
          >
            <td data-label="ID">
              {{ project.id }}
            </td>
            <td data-label="Title">
              {{ project.title }}
            </td>
            <td data-label="Type">
              {{ project.type }}
            </td>
            <td data-label="Idustry">
              {{ project.industry }}
            </td>
            <td data-label="Client">
              {{ project.client }}
            </td>
            <td data-label="Status">
              {{ project.status }}
            </td>
            <td data-label="Subscription">
              {{ project.subscription }}
            </td>
            <td class="actions-cell">
              <jb-buttons
                type="justify-start lg:justify-end"
                no-wrap
              >
                <jb-button
                  color="info"
                  :icon="mdiEye"
                  small
                  href="/project/"
                />
                <jb-button
                  color="danger"
                  :icon="mdiTrashCan"
                  small
                  @click="router.push({ name: 'project', params: { id: 'project.id' } })"
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
