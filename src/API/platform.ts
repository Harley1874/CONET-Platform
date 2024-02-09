
import {postMessage, getContainer, WorkerCommand} from './index'
import {v4} from 'uuid'
const workerReadyChannel = 'conet-platform'
const workerProcessChannel = 'workerLoader'
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

	private authorization_key = ''
	
	constructor(private setPlatformStatus: React.Dispatch<React.SetStateAction<type_platformStatus>>, setWorkerLoading: React.Dispatch<React.SetStateAction<number>>) {
		const search = window.location.search
		this.referrals = search ? search.split('=')[1]: ''
		const channelStatus = new BroadcastChannel(workerReadyChannel)
		const workerProcess = new BroadcastChannel(workerProcessChannel)
		channelStatus.addEventListener('message', (e) => {
			setPlatformStatus(e.data)
		})
		workerProcess.addEventListener('message', (e) => {
			setWorkerLoading(e.data)
			console.log(`workerProcess: [${e.data}]`)
		})
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

	public testPasscode: (passcode: string) => Promise<boolean> = (passcode) => new Promise(async resolve=> {

		const cmd: WorkerCommand = {
            cmd: 'testPasscode',
            uuid: v4(),
            data: [passcode, this.referrals]
        }
        return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return resolve (false)
			}
			this.authorization_key = data[0]
			this.setPlatformStatus('UNLOCKED')
			return resolve (true)
		})
	})

	public showSRP: () => Promise<string> = () => new Promise(async resolve=> {
		if (!this.authorization_key) {
			return resolve('')
		}
		const cmd: WorkerCommand = {
            cmd: 'showSRP',
            uuid: v4(),
            data: [this.authorization_key]
        }
		return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return resolve ('')
			}
			return resolve (data[0])
		})
	})

}