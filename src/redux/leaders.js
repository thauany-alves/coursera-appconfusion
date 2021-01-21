import { actions } from 'react-redux-form';
import { LEADERS } from '../shared/leaders';

export const Leaders = (state = LEADERS, action) => {
    switch(actions.type){
        default:
            return state;
    }
}