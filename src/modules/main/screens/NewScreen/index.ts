import { connect } from 'react-redux';
import { Screen } from './screen';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

export const NewScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);
