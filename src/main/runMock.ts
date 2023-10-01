import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import * as controllers from '@/presentation/controllers'

const event = controllers.orderNutritionalRoutineController

initializeApp()

const request: any = {
  'accessToken': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkNWM1ZTlmNTdjOWI2NDYzYzg1ODQ1YTA4OTlhOWQ0MTI5MmM4YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3RpbWEtMjczNGIiLCJhdWQiOiJzdGltYS0yNzM0YiIsImF1dGhfdGltZSI6MTY5NDI3MTQ5OSwidXNlcl9pZCI6IktVaG1MdTVUaG9oNHhFY053dGNwNHVQcEx0eTIiLCJzdWIiOiJLVWhtTHU1VGhvaDR4RWNOd3RjcDR1UHBMdHkyIiwiaWF0IjoxNjk1OTM5NzAyLCJleHAiOjE2OTU5NDMzMDIsImVtYWlsIjoiY2Fpb2JyYWdhZGFmb25zZWNhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJjYWlvYnJhZ2FkYWZvbnNlY2FAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.GWRof5g8QLpwrj4VBRo9a5BdVWBzKktBfm5ITes66J370vd4BKwUtY1xdgNoqT71aqC_6P1qTQuAd901SbUUD00gcu2eL4yUkoXdh3ZM0wNxTSB8KIDgsFp0ZzoFK9vIX60Hph3lZxzPg9bd8vTO8j1D-jIks4apGnbf_Kiy0iUXWzyxeYAAd1LgyBjQoWQLAse2tK8VgeFd1aJ9dD0BdGrqaR5Ywd93jFd-OiyPu481nCh4uFOLhEBIZWcH_wozoppBePVyi2eTwtIZXu8NtaUShfAJOE6SrteZKaDrChl36_dkoByu3A4X8GAvdpQHCubmp-FG9oFqLUBGgcCPCg',
  'customerUid': 'cus_6ONqYA9h6JH7Nq0p',
  'evaluationUid': 'd4e5cc3a93b3c13202466b33e085301e3f0362e06f9a81f5285bebfd13554751',
  'paymentMethod': 'pix',
}

event(request).then(console.log)
