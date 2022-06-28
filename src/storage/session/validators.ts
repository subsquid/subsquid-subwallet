import { UnknownVersionError } from '../../common/errors'
import { encodeId } from '../../common/tools'
import { SessionValidatorsStorage } from '../../types/generated/storage'
import { BlockContext } from '../../types/generated/support'

type StorageData = Uint8Array[]

async function getStorageData(ctx: BlockContext): Promise<StorageData | undefined> {
    const storage = new SessionValidatorsStorage(ctx)
    if (!storage.isExists) return undefined

    if (storage.isV13) {
        return await storage.getAsV13()
    } else {
        throw new UnknownVersionError(storage.constructor.name)
    }
}

const storageCache: {
    hash?: string
    value?: Validators
} = {}

type Validators = string[]

export async function getValidators(ctx: BlockContext): Promise<Validators | undefined> {
    if (storageCache.hash !== ctx.block.hash) {
        storageCache.hash = ctx.block.hash
        delete storageCache.value
    }

    if (!storageCache.value) {
        const data = await getStorageData(ctx)
        if (!data) return undefined

        storageCache.value = data.map((id) => encodeId(id))
    }

    return storageCache.value
}
