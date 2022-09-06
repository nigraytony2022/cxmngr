<script setup>
import { ref } from 'vue'
// import { storeToRefs } from 'pinia'
// import { useProjectStore } from '../stores/project'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import Field from '@/components/Field.vue'
import Control from '@/components/Control.vue'
import Divider from '@/components/Divider.vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail } from '@mdi/js'
import mock from '@/mock.js'
import options from '@/options.js'

// const { project } = storeToRefs(useProjectStore())
// const { project } = mock.Project
const project = mock.Project
const projectTypes = options.projectTypes
const titleStack = ref(['Admin', 'Project Details'])

// const modalOneActive = ref(false)

</script>

<template>
  <title-bar :title-stack="titleStack" />
  <main-section>
    <card-component
      class="mb-6"
      :icon="mdiAccountMultiple"
      @submit.prevent="submit"
    >
      <field>
        <control
          v-model="project.title"
          :icon="mdiAccount"
          aria-placeholder="Project Title"
          placeholder="Project Title"
        />
        <control
          v-model="project.subtitle"
          type="text"
          :icon="mdiMail"
          placeholder="Subtitle"
        />
      </field>
      <field>
        <control
          v-model="project.type"
          :icon="mdiBallot"
          :options="options.projectTypes"
          placeholder="Project Type"
        />
        <control
          v-model="project.industry"
          :icon="mdiBallotOutline"
          :options="options.industries"
          placeholder="Industry"
        />
      </field>
      <divider />

      <field
        label="Notes"
        help="Your question. Max 255 characters"
      >
        <control
          v-model="project.notes"
          type="textarea"
          placeholder="Details about the project here..."
        />
      </field>
    </card-component>
    {{ projectTypes }}
  </main-section>
  <!-- <modal-box
    v-model="modalOneActive"
    title="Please confirm action"
    button-label="Confirm"
    has-cancel
  >
    <p>This is sample modal</p>
  </modal-box> -->
</template>
