import { EventHandler, EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { BondType } from '../../../model'
import { ParachainStakingDelegationDecreasedEvent } from '../../../types/generated/events'
import { saveBondEvent } from '../utils/base'

interface EventData {
    account: Uint8Array
    amount: bigint
    candidate: Uint8Array
}

function getEventData(ctx: EventHandlerContext): EventData {
    const event = new ParachainStakingDelegationDecreasedEvent(ctx)

    if (event.isV1001) {
        const [account, candidate, amount] = event.asV1001
        return {
            account,
            amount: -amount,
            candidate,
        }
    } else if (event.isV1300) {
        const { delegator: account, amount: amount, candidate } = event.asV1300
        return {
            account,
            amount: -amount,
            candidate,
        }
    }
    throw new UnknownVersionError(event.constructor.name)
}

export const handleDelegationDecreased: EventHandler = async (ctx) => {
    const data = getEventData(ctx)

    await saveBondEvent(ctx, {
        ...data,
        type: BondType.Bond,
    })
}
