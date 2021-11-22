export type Locale = (
    'en-US' |
    'zh-CN' |
    'zh-TW'
    )

export type Messages = {
    'main.greeting': string,
    'onboarding.selectLanguageTitle': string,
    'onboarding.selectLanguageSubtitle': string,
    'onboarding.setPasscodeTitle': string,
    'onboarding.setPasscodeSubtitle': string,
    'onboarding.confirmPasscodeTitle': string,

    'onboarding.verificationTitle': string,
    'onboarding.verificationInputLabel': string,
    'onboarding.verificationText': string,
    'onboarding.verification.connecting': string,
    'onboarding.verification.sending': string,
    'onboarding.verification.waiting': string,
    'onboarding.verification.finished': string,

    'onboarding.verification.error.incorrect': string,
    'onboarding.verification.error.internet': string,
    'onboarding.verification.error.stripe': string,
    'onboarding.verification.error.email': string,
    'onboarding.verification.error.localserver': string,
    'onboarding.verification.error.timeout': string,
    'onboarding.verification.error.authError': string,

    'onboarding.verification.modal.button.retry': string,
    'onboarding.verification.modal.button.update': string,
    'onboarding.verification.modal.button.newCode': string

    'onboarding.carousel.title.seguro-platform': string,
    'onboarding.carousel.title.no-ip-tracking': string,
    'onboarding.carousel.title.decentralized': string,
    'onboarding.carousel.title.anonymity': string,
    'onboarding.carousel.content.seguro-platform': string,
    'onboarding.carousel.content.no-ip-tracking': string,
    'onboarding.carousel.content.decentralized': string,
    'onboarding.carousel.content.anonymity': string,

    'passcodeInput.incorrect.error': string,
    'passcodeInput.confirm.error': string,
    'passcodeInput.invalidLength': string,

    'button.next': string,
    'button.back': string,

    'unlock.title': string,

    'keypad.cancel': string,
    'keypad.unlock': string

    'tabnavigator.tab.chats': string,
    'tabnavigator.tab.contacts': string,
    'tabnavigator.tab.settings': string,

    'drawer.settings': string,
    'drawer.updates': string,
    'drawer.support': string,

    'platform.settings.settings': string,
    'platform.settings.language': string,
    'platform.settings.theme': string,
    'platform.settings.theme.light': string,
    'platform.settings.theme.dark': string,
    'platform.settings.theme.auto': string,
    'platform.settings.passcode': string,
    'platform.settings.passcode.edit': string,

    'platform.settings.passcode.title.newPasscode': string,
    'platform.settings.passcode.title.confirmPasscode': string,
    'platform.settings.passcode.button.next': string,
    'platform.settings.passcode.button.back': string,

    'platform.settings.general': string,
    'platform.settings.myAccount': string,
    'platform.settings.profile': string

    'platform.settings.devices': string,

    'platform.settings.devices.contextMenu.edit': string,
    'platform.settings.devices.contextMenu.delete': string,

    'platform.settings.device.delete': string,
    'platform.settings.device.delete.confirmMessage': string,
    'platform.settings.device.delete.confirmSubmessage': string,
    'platform.settings.device.delete.cancelButton': string,
    'platform.settings.device.delete.confirmButton': string,

    'platform.settings.deviceCodes': string,
    'platform.settings.activeCodes': string,
    'platform.settings.subscriptionPlan': string,

    'toaster.action.copyDeviceCode': string,
    'toaster.action.passcodeChange': string,

    'platform.contextMenu.manage': string,
    'platform.contextMenu.delete': string,
    'platform.contextMenu.edit': string,

    'platform.profile.changePicture': string,

    'globalBar.profile.dropdown.manageProfiles': string,
    'globalBar.profile.dropdown.addProfile': string,

    'platform.manageProfile': string,
    'platform.manageProfile.setAsPrimary': string,
    'platform.manageProfile.saveButton': string,

    'platform.manageProfiles': string,
    'platform.manageProfiles.deleteProfile': string,
    'platform.manageProfiles.deleteProfile.confirmationTitle': string,
    'platform.manageProfiles.deleteProfile.confirmationSubtext': string,
    'platform.manageProfiles.deleteProfile.cancelButton': string,
    'platform.manageProfiles.deleteProfile.confirmButton': string,

    'platform.manageProfiles.deleteProfile.onlyProfileError': string,
    'platform.manageProfiles.deleteProfile.returnButton': string,

    'platform.addProfile.setAsPrimary': string,
    'platform.addProfile.createButton': string,
}

export type MessagesByLocale = Record<Locale, Messages>
