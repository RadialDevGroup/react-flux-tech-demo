import TagRepository from 'repositories/tag';
import { tagCounter } from 'reducers/shared/counters';

export default function(dispatch, getState, {text}) {
  let current_id = tagCounter();
  dispatch({text, id: current_id, type: 'ADD_TAG'});

  return TagRepository.create({text}).then(response_json => {
    dispatch({type: 'EDIT_TAG', externalId: response_json.id, id: current_id });
  }, _.bind(console.log, console, "rejected", _, 'TAGID: ' + current_id));
}