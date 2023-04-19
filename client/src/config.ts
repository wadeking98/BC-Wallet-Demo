export const revocationDescription: {
  [key: string]: { title: string; description: string; credentialName: string; credentialIcon: string } | undefined
} = {
  'Member Card': {
    credentialName: 'Member Card',
    credentialIcon: '/public/lawyer2/icon-lawyer2.svg',
    title: 'Revoke your LSBC Member Card',
    description:
      'The Law Society of BC allows you to revoke your own Member Card if:\n• there is a problem with your credential.\n• your device was lost or stolen and you want to secure your personal information.',
  },
  Person: {
    credentialName: 'Person',
    credentialIcon: '/public/lawyer2/icon-lawyer2.svg',
    title: 'Revoke your Person Credential',
    description:
      'Revoking your credentials does not mean that is it unusable. Services may accept revoked credentials especially for information that is unchanging, such as your birthday.',
  },
  student_card: {
    credentialName: 'Student Card',
    credentialIcon: '/public/student/icon-student.svg',
    title: 'Revoke your Student Card',
    description:
      'Best BC College allows you to revoke your Student Card if:\n• there is a problem with your credential.\n• your device was lost or stolen and you want to secure your personal information.',
  },
}
