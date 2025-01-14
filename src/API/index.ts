import  React, {SetStateAction, Dispatch} from "react"
import {v4} from 'uuid'
import {logger} from '../components/App/logger'
import Async from 'async'
import web3 from 'web3'
import store from '../store/store'
import { setIslivenessRunning } from '../store/appState/appStateActions'
import {getWorkerService} from '../services/workerService/workerService'

type WorkerCommandErrorType = 'NOT_READY'|'INVALID_DATA'|
'NO_UUID'|'INVALID_COMMAND'|'OPENPGP_RUNNING_ERROR'|
'PouchDB_ERROR'|'GENERATE_PASSCODE_ERROR'|'FAILURE'|'COUNTDOWN'

type WorkerCommandType = 'READY'|'testPasscode'|'getCONETBalance'|'getRegiestNodes'|
'encrypt_createPasscode'|'encrypt_lock'|'encrypt_deletePasscode'|'storePreferences'|
'newProfile'|'invitation'|'WORKER_MESSAGE'|'startProxy'|'createAccount'|
'isAddress'|'getFaucet'|'syncAsset'|'sendAsset'|'getUSDCPrice'|'registerReferrer'|'showSRP'|'getAllProfiles'|
'buyUSDC'|'mintCoNETCash'|'getSINodes'|'getRecipientCoNETCashAddress'|'setRegion'|'ipaddress'|'startLiveness'|'stopLiveness'|
'isLivenessRunning'|'referrerList'|'getAllNodes'|'getContainer'

export type WorkerCallStatus = 'SUCCESS' | 'NOT_READY' | 'UNKNOWN_COMMAND' |
'TIME_OUT' | 'SYSTEM_ERROR'
export type PasscodeStatus = 'LOCKED' | 'UNLOCKED' | 'NOT_SET'
export type ColorTheme = 'LIGHT' | 'DARK'
export type Language = 'en-CA' | 'fr-CA' | 'ja-JP' | 'zh-CN' | 'zh-TW'
export type secondVerificationValume = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'
export type SeguroNetworkStatus = WorkerCallStatus | 
'TIMEOUT_EMAIL_SERVER' | 'TIMEOUT_SEGURO_NETWORK' |
'NO_INTERNET' | 'CONNECTING_ACCESS_POINT' |
'CONNECTING_SEGURO_NETWORK'|'INIT'|'NOT_STRIPE'|
'LOCAL_SERVER_ERROR'|'INVITATION_CODE_ERROR'|
'SEGURO_ERROR'|'UNKNOW_ERROR'|'SEGURO_DATA_FORMAT_ERROR'

const ver = '0.0.13'
export const cntp_address = '0x0f43685B2cB08b9FB8Ca1D981fF078C22Fec84c5'

/*eslint-disable */
export interface profile {
    bio: string
    nickname: string
    keyID?: string
    tags: string[]
    alias: string
    isPrimary: boolean
    profileImg: string
}

export type passcodeUnlockStatus = 
    [status: 'FAILURE' | 'COUNTDOWN' | WorkerCallStatus, payload?: ContainerData]

export type SINodesSortby = 'CUSTOMER_REVIEW'|'TOTAL_ONLINE_TIME'|
	'STORAGE_PRICE_LOW'|'STORAGE_PRICE_HIGH'|'OUTBOUND_PRICE_HIGH'|'OUTBOUND_PRICE_LOW'
	
export type SINodesRegion = 'USA'|'UK'|'ES'|'DE'

export interface ContainerData {
    method?: {
        testPasscode?: (
            passcode: string,
            progressCallback: ( progressInteger: string, progressFractional: string ) => void
        ) => Promise <passcodeUnlockStatus>
        createPasscode?: (
            passcode: string,
            progressCallback: ( progressInteger: string, progressFractional: string ) => void
        ) => Promise <[WorkerCallStatus, ContainerData?]>
        deletePasscode?: () => Promise <[WorkerCallStatus, ContainerData?]>
        lock?: () => Promise <[WorkerCallStatus, ContainerData?]>
        storePreferences?: () => Promise <[WorkerCallStatus, ContainerData?]>
        newProfile?: (profile: profile) => Promise<StartWorkerResolve>
		isAddress?: (address: string) => Promise <StartWorkerResolve>
		getFaucet?: (address: string) => Promise <StartWorkerResolve>
		syncAsset?: () => Promise<StartWorkerResolve>
		sendAsset?: (sendAddr: string, total: number, toAddr: string, asset: string ) => Promise<StartWorkerResolve>
		getUSDCPrice?: () => Promise<StartWorkerResolve>
		buyUSDC?: (conetVal: number, keyID: string) => Promise<StartWorkerResolve>
		mintCoNETCash?: (usdcVal: number, keyID: string ) => Promise<StartWorkerResolve>
		getSINodes?: (sortby: SINodesSortby, region: SINodesRegion) => Promise < StartWorkerResolve >
		getRecipientCoNETCashAddress?: (amount: number, callback: any) => Promise<StartWorkerResolve>
		getUserProfile?: (keyID: string) => Promise<StartWorkerResolve>
		sendMessage?: (keyAddress: string, message: string ) => Promise<StartWorkerResolve>
		listening?: (data: any) => void
    }
    status: PasscodeStatus
    data: any
    preferences: any
}

export interface WorkerCommand {
    cmd: WorkerCommandType
    data?: any
    uuid: string
    err?: WorkerCommandErrorType
}

export type regionType = {
    us: boolean,
    uk: boolean,
    ge: boolean,
    sp: boolean,
    fr: boolean
}

export type CreatePasscodeResolve = 
    [status: WorkerCallStatus, updateProgress?: ( percentage: number ) => void ]

export type StartWorkerResolve = [WorkerCallStatus, ContainerData?]
type StartWorkerResolveForAPI = [WorkerCallStatus, any []]

const channelWrokerListenName = 'toMainWroker'
let workerService: ContainerData

export const postUrl: (url: string, data: string, post?: boolean) => Promise<any> = (url, data, post = true) => {
    return new Promise( async (resolve, reject )=> {
        const timeout = 1000
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)
        let status:null|boolean  = null

        const opt: RequestInit = {
            method: post ? "POST" : 'GET',
            headers: {
                Accept: "text/event-stream",
                "Content-Type": 'application/json;charset=UTF-8'
            },
            cache: 'no-store',
            referrerPolicy: 'no-referrer',
            signal: controller.signal
        }
        if (post) {
            opt.body = data
        }
        await fetch (url, opt)
        .then ( async res => {
            
            if (!res.ok) {
                console.log (`postUrl return resolve (false) res.status = [${res.status}]`)
                return res.status
            }
            
            status = true
            let returnData = res.text.length ? await res.text(): ''
            if (res.headers.get('content-type')?.includes('application/json')) {
                returnData = await res.json()
            
                if (!returnData) {
                    return true
                }
            }
            
            console.log (`postUrl status = [${res.status}] returnData = `, returnData)
            console.log (`postUrl return JSON data`, returnData)
            return returnData
            
        })
        .then(_data => {
            return resolve (_data)
        })
        .catch ((ex) => {
            return resolve (status)
        })

        clearTimeout(id)
    })
}

export const testLocalServer = async () => {
    const result = await postUrl(`http://localhost:3001/ver`, '', false)
    if (result) {
        if (result.ver === ver) {
            return true
        }
        return false
    }
    console.log (`[${!result}]`)
    console.log (result? 'result true ': 'result false')
    return null
}

export const postMessage = (cmd: WorkerCommand, close: boolean,  resolve: any, Callback?:(err: string, data: any[]) => void) => {
    
    const channel = new BroadcastChannel(channelWrokerListenName)
    

    const kk = (e: any) => {
        listeningChannel(e.data, cmd.uuid)
    }

	const listenChannel = cmd.uuid ? new BroadcastChannel(cmd.uuid): null

    const listeningChannel = (data: any, uuid: string) => {
        let cmd: WorkerCommand
        
        try{
            cmd = JSON.parse(data)
        } catch (ex) {
            //  'searchPage.tsx', 'checkLinkedUrl ifram is NULL' 
            return logger ('class CONET_Platfrom_API', `listeningChannel JSON.parse(data) Error`)
        }

		if (close && listenChannel) {
			listenChannel.close()
		}
        

        if (cmd.err) {
			if (resolve) {
				return resolve([cmd.err, cmd.data])
			}
			if (Callback) {
				return Callback(cmd.err, [cmd.data])
			}
            return console.log (`postMessage Callback && resolve all null`, cmd.err)
        }
        if ( resolve ) {
			return resolve(['SUCCESS', cmd.data])
		}
		if (Callback) {
			if (!cmd.data.length) {
				if (listenChannel) {
					listenChannel.close()
				}
				
				return Callback('',[])
			}
			return Callback('', cmd.data)
		}
		return console.log (`postMessage Callback && resolve all null`, cmd.data)
    }

	if (listenChannel){
		
    	listenChannel.addEventListener('message', kk)
	}
    channel.postMessage(JSON.stringify(cmd))
    channel.close()
}

export const faucet: () => Promise < StartWorkerResolveForAPI > = () => {
    return new Promise( resolve => {
        const cmd: WorkerCommand = {
            cmd: 'getFaucet',
            data: [],
            uuid: v4()
        }
        return postMessage (cmd, true, resolve)
    })
}

export const getNodesInfo: () => Promise < StartWorkerResolveForAPI > = () => {
    return new Promise( resolve => {
        const cmd: WorkerCommand = {
            cmd: 'getAllNodes',
            uuid: v4()
        }
        return postMessage (cmd, true, resolve)

    })
}

// export const setRegion: (region: regionType) => Promise < StartWorkerResolveForAPI > = (region: regionType) => {
//     return new Promise( resolve => {
//         const cmd: WorkerCommand = {
//             cmd: 'setRegion',
//             uuid: v4(),
//             data: [region]
//         }
//         return postMessage (cmd, true, resolve)

//     })
// }

export const startProxy: (region?: string) => Promise < StartWorkerResolveForAPI > = (region) => {
    return new Promise( resolve => {
        const cmd: WorkerCommand = {
            cmd: 'startProxy',
            uuid: v4(),
            data: [region]
        }
        return postMessage (cmd, true, resolve)
    })
}

export const getRegiestNodes : () => Promise < StartWorkerResolveForAPI > = () => {
    return new Promise( resolve => {
        const cmd: WorkerCommand = {
            cmd: 'getRegiestNodes',
            uuid: v4(),
            data: []
        }

        return postMessage (cmd, true, resolve)
    })
}

export const createPasscode : (passcord: string, local: string) => Promise < StartWorkerResolveForAPI > = (passcord: string, local: string) => {
    return new Promise( resolve => {
		const search = window.location.search
		const referrals = search ? search.split('=')[1]: ''
        const cmd: WorkerCommand = {
            cmd: 'encrypt_createPasscode',
            uuid: v4(),
            data: [passcord, local, referrals]
        }
        return postMessage (cmd, true, resolve)
    })
}

export const getIPaddress: () => Promise < StartWorkerResolveForAPI > = () => {
	return new Promise(resolve => {
		const cmd: WorkerCommand = {
            cmd: 'ipaddress',
            uuid: v4(),
            data: []
        }

        return postMessage (cmd, true, resolve)

	})
}

export const encrypt_deletePasscode : () => Promise < StartWorkerResolveForAPI > = () => {
    return new Promise( resolve => {
        
        const cmd: WorkerCommand = {
            cmd: 'encrypt_deletePasscode',
            uuid: v4(),
            data: []
        }
        return postMessage (cmd, true, resolve)
    })
}

export const startLiveness: (callback: (err: string, data: string[]) => void) => void = (callback) => {
		const cmd: WorkerCommand = {
            cmd: 'startLiveness',
            uuid: v4(),
            data: []
        }
        return postMessage (cmd, false, null, (err, data) => {
			if (err) {
				return callback (err, [err])
			}
		
			return callback ('', data)
		})
}

export const stopLiveness: () => Promise < StartWorkerResolveForAPI > = () => {

	return new Promise(resolve => {
		const cmd: WorkerCommand = {
            cmd: 'stopLiveness',
            uuid: v4(),
            data: []
        }
        return postMessage (cmd, true, resolve)
	})
}


export const isLivenessRunning: (callback: (err: string, data: string[]) => void) => Promise < StartWorkerResolveForAPI > = (callback) => {
	
	return new Promise(resolve => {
		const cmd: WorkerCommand = {
            cmd: 'isLivenessRunning',
            uuid: v4(),
            data: []
        }
        return postMessage (cmd, false, null,(err, data) => {
			if (err) {
				return callback (err, [])
			}
		
			return callback ('', data)
		})
	})
}

type listenState = 'referrer'|'system'|'conet'|'cntp'|'cntp-balance'|'nodes'|'beforeunload'

export const initOneTimeListenState = (listenState: listenState, dispatch: Dispatch<SetStateAction<any>>) => {
	const channel = new BroadcastChannel(listenState)
	channel.addEventListener('message', (e: any) => {
		dispatch(JSON.parse(e.data))
	})
}

const workerList: any[] = []

export const initListenState = (listenState: listenState, dispatch: Dispatch<SetStateAction<any>>) => {
    // 判断当前是否有监听，如果已经有监听,则关闭之前的监听，重新初始化
    if (workerList.some(item => item.key === listenState)) { 
        const oldWorker = workerList.find(item => item.key === listenState)
        oldWorker.channel.removeEventListener('message', oldWorker.listen) // 移除监听触发的事件
        oldWorker.channel.close() // 关闭channel
        workerList.splice(workerList.findIndex(item => item.key === listenState), 1)
    }
	const channel = new BroadcastChannel(listenState)
	logger(`initListenState on ${listenState} `)
	const listen = (e: MessageEvent<any>) => {
		const data = JSON.parse(e.data)
		// @ts-ignore
		logger(`initListenState channel name [${e?.currentTarget?.name}] got [${data}]`)
		dispatch(data)
	}
    channel.addEventListener('message', listen)
    workerList.push({ key: listenState, channel, listen })
}

export const registerReferrer:(referrerAddr: string) => Promise < StartWorkerResolveForAPI > = (referrerAddr) => new Promise(resolve=>{
	const cmd: WorkerCommand = {
		cmd: 'registerReferrer',
		uuid: v4(),
		data: [referrerAddr]
	}
	return postMessage (cmd, true, resolve)
})

export const scanAssets = () => {
	const cmd: WorkerCommand = {
		cmd: 'syncAsset',
		uuid: '',
		data: []
	}
	return postMessage (cmd, true, null)
}

export const getContainer: () => Promise < StartWorkerResolveForAPI > = () => {
	return new Promise( resolve => {
		const cmd: WorkerCommand = {
			cmd: 'getContainer',
			uuid: v4(),
			data: []
		}
		return postMessage (cmd, true, resolve)
	})
}


export const referrerList : () => Promise < StartWorkerResolveForAPI > = () => {
    return new Promise( resolve => {
        const cmd: WorkerCommand = {
            cmd: 'referrerList',
            uuid: v4(),
            data: []
        }
        return postMessage (cmd, true, resolve)
    })
}

export interface nodeType {
	ip_addr: string
	minerAddr: string
	running: boolean
	wallet_addr: string
	balance: string
	country: string
}

export const getAllNodes:() => Promise < StartWorkerResolveForAPI > = () => new Promise(resolve => {
	const cmd: WorkerCommand = {
		cmd: 'getAllNodes',
		uuid: v4(),
		data: []
	}
	return postMessage (cmd, true, resolve)
})

export const getProfileBalance:() => Promise < StartWorkerResolveForAPI > = () => new Promise(resolve => {
	const cmd: WorkerCommand = {
		cmd: 'getCONETBalance',
		uuid: v4(),
		data: []
	}
	return postMessage (cmd, true, resolve)
})

export const createAccount : (passcord: string) => Promise < StartWorkerResolveForAPI > = (passcord) => {
    return new Promise( resolve => {
		const search = window.location.search
		const referrals = search ? search.split('=')[1]: ''
        const cmd: WorkerCommand = {
            cmd: 'encrypt_createPasscode',
            uuid: v4(),
            data: [passcord, referrals]
        }
        return postMessage (cmd, true, resolve)
    })
}
