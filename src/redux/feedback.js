import * as ActionTypes from './ActionTypes';
import { InitialFeedback } from './forms';
// import { InitialFeedback} from './forms'

export const Feedback = (state = {
    feedback: InitialFeedback
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state, feedback: action.payload}

        default:
          return state
      }
};