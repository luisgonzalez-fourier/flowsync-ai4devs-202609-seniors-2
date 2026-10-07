import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import type { ApiClient } from '@japa/api-client'


test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const today = '2026-10-06'

  async function tareaDe(fullName: string | null, email = 'ada@example.com') {
    const user = await User.create({ fullName, email, password: 'secreto123' })
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    return { user, task }
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const { user, task } = await tareaDe('Ada Lovelace')

    const response = await client.get(`/api/v1/tasks/${task.id}`).qs({ today }).loginAs(user)

    response.assertStatus(200)
    assert.deepEqual(response.body().data.assignee, { fullName: 'Ada Lovelace', initials: 'AL' })
  })

  test('un responsable sin nombre llega con nombre nulo y las iniciales de su email', async ({
    client,
    assert,
  }) => {
    const { user, task } = await tareaDe(null, 'ada@example.com')

    const response = await client.get(`/api/v1/tasks/${task.id}`).qs({ today }).loginAs(user)

    response.assertStatus(200)
    assert.deepEqual(response.body().data.assignee, { fullName: null, initials: 'AE' })
  })

  /**
   * Las cinco respuestas que devuelven una tarea. Basta con que una sola deje
   * salir un dato de la cuenta para que el cliente ya lo tenga, así que el
   * scenario se comprueba en todas y no solo en las consultas.
   */
  const respuestas: Array<
    [string, (client: ApiClient, user: User, task: Task) => Promise<Record<string, unknown>>]
  > = [
    [
      'la lista',
      async (client, user, task) => {
        const response = await client.get('/api/v1/tasks').loginAs(user)
        response.assertStatus(200)
        // El registro tipa `data` como tarea o lista de tareas; aquí siempre es lista.
        const tareas = response.body().data as Array<Record<string, unknown>>
        return tareas.find((t) => t.id === task.id)!
      },
    ],
    [
      'el detalle',
      async (client, user, task) => {
        const response = await client.get(`/api/v1/tasks/${task.id}`).qs({ today }).loginAs(user)
        response.assertStatus(200)
        return response.body().data
      },
    ],
    [
      'la creación',
      async (client, user) => {
        const response = await client
          .post('/api/v1/tasks')
          .json({ title: 'Otra tarea' })
          .loginAs(user)
        response.assertStatus(201)
        return response.body().data
      },
    ],
    [
      'el cambio de estado',
      async (client, user, task) => {
        const response = await client
          .patch(`/api/v1/tasks/${task.id}/status`)
          .json({ status: 'in_progress' })
          .loginAs(user)
        response.assertStatus(200)
        return response.body().data
      },
    ],
    [
      'el cambio de fecha de vencimiento',
      async (client, user, task) => {
        const response = await client
          .put(`/api/v1/tasks/${task.id}/due-date`)
          .json({ today, dueDate: '2026-10-30' })
          .loginAs(user)
        response.assertStatus(200)
        return response.body().data
      },
    ],
  ]

  for (const [donde, pedir] of respuestas) {
    test(`en ${donde}, el responsable solo trae fullName e initials`, async ({
      client,
      assert,
    }) => {
      const { user, task } = await tareaDe('Ada Lovelace')

      const tarea = await pedir(client, user, task)

      assert.exists(tarea, 'la respuesta no trae la tarea')
      assert.sameMembers(Object.keys(tarea.assignee as object), ['fullName', 'initials'])
    })
  }
})
