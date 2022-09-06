<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { useTaskStore } from '@/stores/task'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import ModalBox from '@/components/ModalBox.vue'
// import CheckboxCell from '@/components/CheckboxCell.vue'
import Level from '@/components/Level.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'

// const { tasks } = storeToRefs(useTaskStore())
const { fetchTasks } = useTaskStore()

fetchTasks()

defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()

const taskStore = useTaskStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const lightBgStyle = computed(() => mainStore.lightBgStyle)

const tableTrStyle = computed(() => mainStore.tableTrStyle)

const tableTrOddStyle = computed(() => mainStore.tableTrOddStyle)

const darkMode = computed(() => mainStore.darkMode)

const items = computed(() => taskStore.tasks)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

// const remove = (arr, cb) => {
//   const newArr = []

//   arr.forEach(item => {
//     if (!cb(item)) {
//       newArr.push(item)
//     }
//   })

//   return newArr
// }

// const checked = (isChecked, task) => {
//   if (isChecked) {
//     checkedRows.value.push(task)
//   } else {
//     checkedRows.value = remove(checkedRows.value, row => row.id === task.id)
//   }
// }
</script>

<template>
  <modal-box
    v-model="isModalActive"
    title="Sample modal"
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <modal-box
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </modal-box>

  <div
    v-if="checkedRows.length"
    class="bg-opacity-50 p-3 dark:bg-gray-800"
    :class="lightBgStyle"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm dark:bg-gray-700"
      :class="lightBgStyle"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th>wbs</th>
        <th>Name</th>
        <th>Start</th>
        <th>Finish</th>
        <th>Cost</th>
        <th>Work</th>
        <th>Progress</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(task, index) in itemsPaginated"
        :key="task.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']"
      >
        <td data-label="WBS">
          {{ task.wbs }}
        </td>
        <td data-label="Name">
          {{ task.name }}
        </td>
        <td data-label="Start">
          {{ task.start }}
        </td>
        <td data-label="Finish">
          {{ task.finish }}
        </td>
        <td data-label="Cost">
          {{ task.cost }}
        </td>
        <td data-label="Work">
          {{ task.work }}
        </td>
        <td
          data-label="Progress"
          class="progress-cell"
        >
          <progress
            max="100"
            :value="task.complete"
          >
            {{ task.complete }}
          </progress>
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
              @click="isModalActive = true"
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
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>
  <div>
    {{ items }}
  </div>
</template>
