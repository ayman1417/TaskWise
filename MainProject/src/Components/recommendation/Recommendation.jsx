import PropTypes from 'prop-types';

export default function Recommendation(props) {
  return (
    <div>
      <h1>{props.header}:</h1>
      <div className='grid grid-cols-9'>
        <div className='col-span-8'>
          raed
        </div>
        <div className='col-span-1'>
          <button >Add</button>
        </div>
      </div>
    </div>
  )
}
Recommendation.propTypes = {
  header: PropTypes.string.isRequired,
  members: PropTypes.string.isRequired,
};