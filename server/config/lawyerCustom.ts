import type { CustomCharacter } from '../src/content/types'
export const lawyerCustom: CustomCharacter = {
  name: 'Joyce',
  type: 'Lawyer',
  image: '/public/lawyer2/lawyer2.svg',
  progressBar: [
    {
      name: 'person',
      onboardingStep: 'PICK_CHARACTER',
      iconLight: './icon-person-light.svg',
      iconDark: './icon-person-dark.svg',
    },
    {
      name: 'moon',
      onboardingStep: 'SETUP_START',
      iconLight: './moonLight.svg',
      iconDark: './svgmoonDark',
    },
    {
      name: 'wallet',
      onboardingStep: 'CONNECT_LSBC',
      iconLight: './walletLight.svg',
      iconDark: './walletDark.svg',
    },
    {
      name: 'notification',
      onboardingStep: 'SETUP_COMPLETED',
      iconLight: './notificationLight.svg',
      iconDark: './notificationDark.svg',
    },
    {
      name: 'balloon',
      onboardingStep: 'DEMO_END',
      iconLight: './balloonLight.svg',
      iconDark: './balloonDark.svg',
    },
  ],
  onboarding: [
    {
      screenId: 'PICK_CHARACTER',
      title: 'Meet Joyce',
      text: "Meet Joyce (that's you in this demo!). Joyce is a lawyer in good standing with The Law Society of British Columbia. We know this because she's got her physical Law Society of British Columbia Member Card. She's also a resident of British Columbia and has gone through the process to prove her identity with Service BC and has obtained a physical BC Services Card. This has allowed her to use in person services.",
    },
    {
      screenId: 'SETUP_START',
      title: "Let's get started!",
      text: 'BC Wallet is a new app for storing and using credentials on your smartphone. Credentials are things like IDs, licenses and diplomas. \nUsing your BC Wallet is fast and simple. In the future it can be used online and in person.You approve every use, and share only what is needed. \nIn this demo, you will use two credentials to prove who you are and access court materials online instead of in-person.',
      image: '/public/lawyer2/onboarding/scan.svg',
    },
    {
      screenId: 'GOING_DIGITAL',
      title: 'Going Digital',
      text: 'Over time, The Government of B.C. and the Law Society of British Columbia has been making things more convenient by offering a choice of accessing services online and in-person. Joyce has accumulated all physical credentials and has gone digital. She has been verified as a practising lawyer in B.C. and verified herself with the BC Services Card app.',
      image: '/public/lawyer2/onboarding/goingDigital.svg',
    },
    {
      screenId: 'ACCESS_COURT_MATERIALS',
      title: 'Accessing court materials',
      text: "Joyce has been going to the courthouse in person to access voice recordings and other confidential materials. Court Services Branch has let her know that she now has the choice of accessing court materials online. She just needs to prove she's a practising lawyer from B.C. and have a government issued ID with a matching name. She can get a digital lawyer member card from the Law Society of British Columbia and her Person credential from her BC Services Card app.",
      image: '/public/lawyer2/onboarding/loginLSBC.svg',
    },
    {
      screenId: 'CONNECT_LSBC',
      title: 'Get your lawyer credential',
      text: 'Joyce is now ready to be issued her Law Society of British Columbia Member Card. She has logged into her member portal and is ready to accept a digital version of that card. Open the BC Wallet app on your phone, hit the scan button and accept.',
      image: '/public/lawyer2/onboarding/lawyerCredPhone.svg',
    },
    {
      screenId: 'ACCEPT_LSBC',
      title: 'Accept your lawyer credential',
      text: 'Check your phone. You’ve received a credential offer from the Law Society of British Columbia in your BC Wallet. You can use this credential to prove you’re a lawyer online.',
      image: '/public/lawyer2/onboarding/lawyerCredPhone.svg',
      issuer_name: 'Law Society of BC (Demo)',
      credentials: [
        {
          name: 'member_card',
          version: '1.1',
          icon: '/public/lawyer2/icon-lawyer2.svg',
          attributes: [
            {
              name: 'Member Status',
              value: 'Active',
            },
            {
              name: 'Given Name',
              value: 'Joyce',
            },
            {
              name: 'PPID',
              value: 'MC12349',
            },
            {
              name: 'Member Status Code',
              value: '1',
            },
            {
              name: 'Surname',
              value: 'Lee-Martinez',
            },
          ],
        },
      ],
    },
    {
      screenId: 'CONNECT_PERSON',
      title: 'Get Person credential',
      text: 'Joyce gets her Person credential from the BC Services Card app. She starts the process within BC Wallet. For this demo you will scan this QR code to receive the credential offer.',
      image: '/public/lawyer2/onboarding/personCredPhone.svg',
      issuer_name: 'Service BC (Demo)',
    },
    {
      screenId: 'ACCEPT_PERSON',
      title: 'Accept your Person credential',
      text: 'Check your phone. You’ve received a credential offer from Service BC in your BC Wallet. You can use this credential to prove who you are online.',
      image: '/public/lawyer2/onboarding/personCredPhone.svg',
      credentials: [
        {
          name: 'Person',
          version:'1.1',
          icon: '/public/lawyer2/icon-lawyer2.svg',
          attributes: [
            {
              name: 'postal_code',
              value: 'V8N2X6',
            },
            {
              name: 'picture',
              value: '',
            },
            {
              name: 'given_names',
              value: 'Joyce',
            },
            {
              name: 'family_name',
              value: 'Lee-Martinez',
            },
            {
              name: 'locality',
              value: 'BC',
            },
            {
              name: 'region',
              value: 'Victoria',
            },
            {
              name: 'street_address',
              value: '123 Test Rd',
            },
            {
              name: 'country',
              value: 'Canada',
            },
            {
              name: 'expiry_date_dateint',
              value: '23052030',
            },
            {
              name: 'birthdate_dateint',
              value: '23051993',
            },
          ],
        },
      ],
    },
    {
      screenId: 'SETUP_COMPLETED',
      title: "You're all set!",
      text: 'Congratulations, you’ve just received your first digital credentials. They are safely stored in your wallet and ready to be used. So, what are you waiting for? Let’s go!',
      image: '/public/lawyer2/onboarding/lawyer2Success.svg',
    },
  ],
  useCases: [
    {
      id: 'courtServices',
      name: 'Court Services',
      screens: [
        {
          screenId: 'START',
          title: 'Gain access to court materials online',
          text: 'Joyce can gain entry to Access to Court Materials, a service online by Court Services Branch where lawyers can access court documents online. They require proof that you’re a practising lawyer in B.C. and a matching name to your lawyer member card.',
          image: '/public/lawyer2/useCases/courtServices/bothCreds.svg',
        },
        {
          screenId: 'CONNECTION',
          title: 'Start proving you’re a lawyer',
          text: 'As Joyce you’re now ready to prove you’re a practising lawyer in B.C. and your name to Court Services Branch and gain entry to Access to Court Materials online. Scan the QR code.',
          image: '/public/lawyer2/useCases/courtServices/courtServicesOverlay.png',
        },
        {
          screenId: 'PROOF',
          title: 'Confirm the information to send',
          text: 'BC Wallet will now ask you to confirm what to send. Notice how you’re not sharing your entire credential. Court Services Branch is requesting that you prove only what is needed.',
          requestOptions: {
            title: 'Court Services Branch (DEMO) Request',
            text: 'Court Services Branch (DEMO) would like some of your personal information.',
            requestedCredentials: [
              {
                name: 'member_card',
                properties: ['Given Name', 'Surname', 'PPID'],
              },
              {
                name: 'Person',
                properties: ['given_names', 'family_name'],
              },
            ],
          },
        },
        {
          screenId: 'STEP_END',
          title: "You're done!",
          text: 'You’ve proved to Court Services Branch that you’re a practising lawyer from B.C. and your identity using your Person credential. You can now access court materials online from the comfort of your own home. It only took a few seconds and you revealed minimal information that Court Services Branch could easily and automatically trust.',
          image: '/public/lawyer2/onboarding/lawyer2Success.svg',
        },
      ],
    },
  ],
}
