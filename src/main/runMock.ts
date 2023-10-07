import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import * as controllers from '@/presentation/controllers'

const event = controllers.orderNutritionalRoutineController

initializeApp()

const request: any = { 'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0MGEzZjVkZC02MDQ1LTQ0MjQtYjA5Yy0zNzRjMjcyZjVmY2MiLCJjcmVhdGVkQXQiOnsiX3NlY29uZHMiOjE2OTY2MDE5NTAsIl9uYW5vc2Vjb25kcyI6MzE2MDAwMDAwfSwiZW1haWwiOiJjYWlvYmZvbnNlY2FAZ21haWwuY29tIiwiY3VzdG9tZXJVaWQiOiJjdXNfYWVZWjZ6TENKQ3B3cjBiMSIsImlhdCI6MTY5NjcwNjUxNSwic3ViIjoiNDBhM2Y1ZGQtNjA0NS00NDI0LWIwOWMtMzc0YzI3MmY1ZmNjIn0.05m0QJENhqGXZf04nB6hLkSkPD1FEGdPUiKBGdn0SVo', 'customerUid': 'cus_aeYZ6zLCJCpwr0b1', 'evaluationUid': 'f28947aa16cd17f05c41af2f8926484bb1328599b7adf8050184fec59e37c82a', 'paymentMethod': 'pix' }

event(request).then(console.log)
