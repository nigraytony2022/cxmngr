<script setup>
import { computed, ref } from 'vue'
import { mdiCheckboxBlankOutline, mdiEye, mdiTrashCan, mdiPlusCircleOutline } from '@mdi/js'
import MainSection from '@/components/MainSection.vue'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import ModalBox from '@/components/ModalBox.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/task'

const { tasks } = storeToRefs(useTaskStore())
const { fetchTasks } = useTaskStore()

const newTask = ref({
  projectId: null,
  userId: null,
  wbs: null,
  name: null,
  start: null,
  finish: null,
  complete: null,
  cost: null,
  work: null,
  notes: null
})

fetchTasks()

const titleStack = ref(['Admin', 'Tasks'])

const editTaskModal = ref(false)

const createNewTask = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const tasksPaginated = computed(
  () => tasks.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(tasks.value.length / perPage.value))

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
      title="Tasks"
      :icon="mdiCheckboxBlankOutline"
      :header-icon="mdiPencilCircleOutline"
      has-table
    >
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
            v-for="(task, index) in tasksPaginated"
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
                  @click="editTaskModal = true"
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
            <jb-button
              color="success"
              class="absolute right-10"
              :icon="mdiPlusCircleOutline"
              small
              @click="createNewTask = true"
            />
          </jb-buttons>
        </level>
      </div>
    </card-component>
  </main-section>
  <modal-box
    v-model="editTaskModal"
    title="Edit Task Details"
    button-label="Confirm"
    has-cancel
  >
    <p>Edit Task Modal</p>
  </modal-box>

  <modal-box
    v-model="createNewTask"
    title="Task Details"
    button-label="Confirm"
    has-cancel
  >
    <div>
      <field
        help="Enter a WBS Code (optional) & Task Name on this line"
      >
        <control
          v-model="newTask.wbs"
          type="text"
          :icon="mdiFormatListNumbered"
          placeholder="WBS"
        />
        <control
          v-model="newTask.name"
          type="text"
          :icon="mdiNoteEditOutline"
          placeholder="Task Name"
        />
      </field>
      <field
        help="Start & Finish Dates on this line"
      >
        <control
          v-model="newTask.start"
          type="text"
          :icon="mdiCalendar"
          placeholder="Start"
        />
        <control
          v-model="newTask.finish"
          type="text"
          :icon="mdiCalendar"
          placeholder="Finish"
        />
      </field>
      <field
        help="Work & Cost info on this line"
      >
        <control
          v-model="newTask.work"
          type="number"
          :icon="mdiBookMarkerOutline"
          placeholder="Work"
        />
        <control
          v-model="newTask.cost"
          type="number"
          :icon="mdiCurrencyUsd"
          placeholder="Cost"
        />
      </field>
      <field
        help="Task description. Max 255 characters"
      >
        <control
          v-model="newTask.notes"
          type="textarea"
          placeholder="Type notes here (optional)"
        />
      </field>
    </div>
  </modal-box>
</template>
