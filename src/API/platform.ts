
import {postMessage, getContainer, WorkerCommand} from './index'
import {v4} from 'uuid'
const workerReadyChannel = 'conet-platform'
const workerProcessChannel = 'workerLoader'
interface tokenHistory {

}
interface pgpKey {
	privateKeyArmor: string
	publicKeyArmor: string
}

interface profileNetwork {

}

interface token {
	balance: string
	history: tokenHistory[]
}

export interface profile {
	isPrimary: boolean			//
	keyID: string 				//		Wallet Address
	pgpKey: pgpKey
	referrer: string			
	tokens: token[]
	network: profileNetwork
	data?: any					//		for UI
}

export type type_platformStatus = 'LOCKED'|'UNLOCKED'|'NONE'|''
export class platform {
	private referrals = ''

	public passcode: () => Promise<type_platformStatus> = () => new Promise(async resolve=> {
		const [success, data] = await getContainer()
		if (!success) {
			return resolve ('')
		}
		const result = data[0]
		return resolve (result.passcode)
	})

	public authorization_key = ''
	
	constructor(private setPlatformStatus: React.Dispatch<React.SetStateAction<type_platformStatus>>, setWorkerLoading: null|React.Dispatch<React.SetStateAction<number>>) {
		const search = window.location.search
		this.referrals = search ? search.split('=')[1]: ''
		const channelStatus = new BroadcastChannel(workerReadyChannel)
		const workerProcess = new BroadcastChannel(workerProcessChannel)
		
		channelStatus.addEventListener('message', (e) => {
			
			setPlatformStatus(e.data)
		})
		
		if (setWorkerLoading) {
			workerProcess.addEventListener('message', (e) => {
				setWorkerLoading(e.data)
				console.log(`workerProcess: [${e.data}]`)
			})
		}
	
	}

	public createAccount: (passcode: string) => Promise<string> = (passcode) => new Promise(async resolve=> {

		const cmd: WorkerCommand = {
            cmd: 'createAccount',
            uuid: v4(),
            data: [passcode, this.referrals]
        }
        return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return resolve ('')
			}
		
			return resolve (data[0])
		})
	})

	public testPasscode: (passcode: string) => Promise<[boolean, string]> = (passcode) => new Promise(async resolve=> {

		const cmd: WorkerCommand = {
            cmd: 'testPasscode',
            uuid: v4(),
            data: [passcode, this.referrals]
        }
        return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return resolve ([false, ''])
			}
			this.authorization_key = data[0]
			
			this.setPlatformStatus('UNLOCKED')
			
			return resolve ([true, this.authorization_key])
		})
	})

	public showSRP: (authorizationkey: string) => Promise<string> = (authorizationkey) => new Promise(async resolve=> {
		if (!authorizationkey) {
			return resolve('')
		}
		const cmd: WorkerCommand = {
            cmd: 'showSRP',
            uuid: v4(),
            data: [authorizationkey]
        }
		return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return resolve ('')
			}
			return resolve (data[0])
		})
	})

	public getAllProfiles: (authorizationkey: string) => Promise<profile[]> = (authorizationkey) => new Promise(async resolve=> {

		const cmd: WorkerCommand = {
            cmd: 'getAllProfiles',
            uuid: v4(),
            data: [authorizationkey]
        }
		return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return resolve ([])
			}
			const _data = data[0] as profile[]
			return resolve (_data)
		})
	})

}