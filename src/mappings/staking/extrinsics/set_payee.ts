import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor'

import { PayeeCallData, PayeeTypeRaw } from '../../../types/custom/stakingData'
import { StakingSetPayeeCall } from '../../../types/generated/calls'
import { savePayee } from '../base/savers'

function getCallData(ctx: ExtrinsicHandlerContext): PayeeCallData {
    const call = new StakingSetPayeeCall(ctx)

    if (call.isV1020) {
        const { payee } = call.asV1020
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else if (call.isV9111) {
        const { payee } = call.asV9111
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    } else {
        const { payee } = call.asLatest
        return {
            payee: payee.__kind as PayeeTypeRaw,
            account: (payee as { value: Uint8Array }).value,
        }
    }
}

export async function handleSetPayee(ctx: ExtrinsicHandlerContext) {
    const data = getCallData(ctx)

    await savePayee(ctx, data)
}