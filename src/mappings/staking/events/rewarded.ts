import { EventHandlerContext } from '@subsquid/substrate-processor'
import { UnknownVersionError } from '../../../common/errors'
import { RewardData } from '../../../types/custom/stakingData'
import { StakingRewardedEvent, StakingRewardEvent } from '../../../types/generated/events'
import { saveRewardEvent } from '../utils/savers'

function getRewardedEventData(ctx: EventHandlerContext): RewardData {
    const event = new StakingRewardedEvent(ctx)

    if (event.isV9090) {
        const [account, amount] = event.asV9090
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

function getRewardEventData(ctx: EventHandlerContext): RewardData | undefined {
    const event = new StakingRewardEvent(ctx)

    if (event.isV0) {
        const [account, amount] = event.asV0
        return {
            account,
            amount,
        }
    } else {
        throw new UnknownVersionError(event.constructor.name)
    }
}

export async function handleRewarded(ctx: EventHandlerContext, old = false) {
    const data = old ? getRewardEventData(ctx) : getRewardedEventData(ctx)
    if (!data) return

    await saveRewardEvent(ctx, data)
}

export const handleReward = (ctx: EventHandlerContext) => {
    return handleRewarded(ctx, true)
}
