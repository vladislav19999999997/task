<template>
  <div class="b-tasks q-mr-auto">
    <div class="b-tasks-create">
      <q-input
        v-model="input"
        class="b-tasks-create__input"
        label="Введите текст"
        @keydown.enter="actionTask"
      />
      <q-btn
        no-caps
        padding="none"
        :label="textBtn === 'add' ? 'Создать задачу' : 'Сохранить'"
        @click="actionTask"
      />
    </div>

    <div
      class="b-tasks-list"
    >
      <div class="b-tasks-list__title">
        Список задач
      </div>
      <div v-if="taskList.length > 0">
        <div
          v-for="task in taskList"
          :key="task.id"
          class="b-tasks-list__item"
        >
          <div class="b-tasks-list__text">
            {{ task.text }}
          </div>
          <q-btn
            icon="edit"
            size="sm"
            padding="none"
            class="b-tasks-list__icon"
            @click="editTask(task)"
          />
          <q-btn
            icon="delete"
            size="sm"
            padding="none"
            class="b-tasks-list__icon"
            @click="tasksStore.removeTask(task.id)"
          />
        </div>
      </div>
      <div v-else>
        Пусто
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUpdate, onMounted } from 'vue'
import { useTasksStore } from 'stores/tasks-store'
import { Task, typeState } from 'components/models'

const input = ref<string>('')
const textBtn = ref('add')
const localTask = ref<Task>({} as Task)
const tasksStore = useTasksStore()

function actionTask () {
  if (input.value !== '' && +input.value !== 0) {
    if (textBtn.value === 'add') {
      tasksStore.addTasks(input.value)
      input.value = ''
    } else {
      localTask.value.text = input.value
      tasksStore.saveTask(localTask.value)
      textBtn.value = 'add'
      input.value = ''
    }
  }
}

function editTask (task:Task) {
  input.value = task.text
  localTask.value = task
  textBtn.value = 'edit'
}

const taskList = computed(() :Array<typeState> => {
  return tasksStore.getTaskList
})

onMounted(() => {
  tasksStore.downloadTaskList()
})

onBeforeUpdate(() => {
  tasksStore.saveTaskList()
})
</script>

<style scoped lang="scss">
.b-tasks-create {
  display: flex;
  margin-bottom: 20px;
  &__input {
    flex: 1 1 auto;
    padding-right: 10px;
  }
}
.b-tasks-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #c5bcbc;
  overflow: hidden;
  padding: 10px;
  &__title {
    padding-bottom: 10px;
    border-bottom: 1px solid #c5bcbc;
  }
  &__item {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 10px 0px;
    border-bottom: 1px solid #c5bcbc;
    &:last-child {
      border-bottom: none;
    }
  }
  &__text {
    flex: 1 1 auto;
  }
  &__icon {
    margin-right: 5px;
  }
}
</style>
