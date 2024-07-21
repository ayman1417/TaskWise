import PropTypes from 'prop-types';

export default function SidbarLeaderMember(props) {
  return (
    <div className='bg-primary text-gray-400 p-3   rounded-lg'> 
      <h1 className='font-bold'>{`${props.titleHeader}`}:</h1>
      <div className='px-2 '>
        {
          props.members.map((item) => {
            return <p key={item.id}> <span className='text-logoColor text-xl font-bold'>&bull;</span > {item.name} </p>
          })
        }
      </div>
    </div>
  )
}

SidbarLeaderMember.propTypes = {
  titleHeader: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
};