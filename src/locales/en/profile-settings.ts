export const profileSettings = {
  accountManagementTab: {
    accountTypes: 'Account Types',
    autoRenewal: 'Auto renewal',
    changeSubscription: 'Change your subscription',
    currentSubscription: 'Current subscription',
    paymentType: {
      business: 'Business',
      personal: 'Personal',
    },
    subscriptionDates: {
      expireAt: 'Expires at',
      nextPayment: 'Next payment',
    },
    subscriptionDescriptions: {
      dollars_10: '$10 per 1 Day',
      dollars_50: '$50 per 7 Day',
      dollars_100: '$100 per month',
    },
    subscriptionShortDescriptions: {
      day: '1 day',
      month: '1 month',
      week: '7 days',
    },
  },

  devicesTab: {
    activeSessions: 'Active sessions',
    currentDevices: 'Current devices',
    lastVisit: 'Last visit',
    logout: 'Log out',
    noActiveSessions: 'You have not yet logged in from other devices',
    terminateAllOtherSessions: 'Terminate all other session',
  },

  paymentAlert: {
    fail: {
      accessibilityDescription: 'Payment process failed',
      accessibilityTitle: 'Payment Error',
      closeButton: 'Close',
      confirmButton: 'Close',
      visibleBody:
        'Something went wrong during the payment process. Please try again or contact support.',
      visibleTitle: 'Error',
    },
    success: {
      accessibilityDescription: 'Payment completed successfully',
      accessibilityTitle: 'Payment Success',
      closeButton: 'Close',
      confirmButton: 'Continue',
      visibleBody: 'Your payment has been processed successfully.',
      visibleTitle: 'Success',
    },
  },

  paymentsTab: {
    noPayments: 'You have not yet made any payments',
    pagination: {
      textPerPage: 'per page',
      textShow: 'Show',
    },
    paymentsTable: {
      header: {
        dateEndOfSubscription: 'Date end of subscription',
        dateOfPayment: 'Date of payment',
        paymentSystem: 'Payment type',
        price: 'Price',
        subscriptionDescription: 'Subscription type',
      },
    },
  },

  profileDataTab: {
    addProfilePhotoButton: 'Add a Profile Photo',
    deleteProfileButton: 'Delete account',
    formSubmitButton: 'Save Changes',
    labels: {
      aboutMe: 'About Me',
      city: 'Select your city',
      country: 'Select your country',
      dateOfBirth: 'Date of birth',
      firstName: 'First Name',
      lastName: 'Last Name',
      userName: 'Username',
    },
    placeholders: {
      aboutMe: 'Tell us about yourself',
      city: 'add city',
      country: 'add country',
      firstName: 'add first name',
      lastName: 'add second name',
      userName: 'add username',
    },
    successSettingsChangeMessage: 'Your settings are saved!',
  },
  tabNames: {
    accountManagement: 'Account Management',
    devices: 'Devices',
    generalInformation: 'General information',
    payments: 'My payments',
  },
}
