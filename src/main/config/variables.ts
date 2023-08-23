export const variables = {
  apiKey: process.env.API_KEY ?? 'undefined',
  paymentProcessorApiUrl: process.env.PAYMENT_PROCESSOR_API_URL ?? 'undefined',
  paymentProcessorApiKey: process.env.PAYMENT_PROCESSOR_API_KEY ?? 'undefined',
  firebaseAdminSdk: process.env.CONFIG_FIREBASE_ADMIN_SDK ?? 'undefined',
  monthlySubscriptionId: process.env.MONTHLY_SUBSCRIPTION_ID ?? 'undefined',
  yearlySubscriptionId: process.env.YEARLY_SUBSCRIPTION_ID ?? 'undefined',
}

export const testVariables = (): boolean => {
  return Object.values(variables).every((value) => {
    return (value !== 'undefined')
  })
}
