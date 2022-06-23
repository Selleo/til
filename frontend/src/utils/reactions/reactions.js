import Like from '../../assets/icons/reactions/like.svg'
import Love from '../../assets/icons/reactions/love.svg'
import Funny from '../../assets/icons/reactions/funny.svg'
import Surprised from '../../assets/icons/reactions/surprised.svg'

export const convertReactions = reactions => {
  const reactionsType = [
    { type: 'like', Icon: Like },
    { type: 'funny', Icon: Funny },
    { type: 'love', Icon: Love },
    { type: 'surprised', Icon: Surprised },
  ]
  let filteredReactions = []

  reactionsType.forEach(reaction => {
    const result = reactions.filter(el => el.type === reaction.type)
    const reactionObj = {
      type: reaction.type,
      whoReacted: result,
      Icon: reaction.Icon,
    }

    filteredReactions.push(reactionObj)
  })

  return filteredReactions
}

export const checkHasReacted = (reaction, userId) => {
  const reactionArray = reaction.map(reaction => reaction.user_uuid)

  return reactionArray.includes(userId)
}
