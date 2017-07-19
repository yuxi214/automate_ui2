import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { day as dayUtil } from 'cron_util';

const styles = {

  checkbox: {
    padding: 18,
    marginBottom: 8,
    border: '1px solid black',
    background: 'rgba(0,0,0,0.2)'
  },
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Daily = ({ schedule, onScheduleChange }) => (
  <div>
    {days.map((day,index) => (
      <Checkbox
        style={styles.checkbox}
        label={day}
        checked={dayUtil.isSelected(schedule, index)}
        onCheck={(_, x) => {
          if (x === true){
            const newSchedule = dayUtil.add(schedule, index);
            onScheduleChange(newSchedule);
          }else{
            const newSchedule = dayUtil.remove(schedule, index);
            onScheduleChange(newSchedule);
          }
        }}
      />))}
  </div>
);

Daily.propTypes = {
  schedule: PropTypes.string.isRequired,
  onScheduleChange: PropTypes.func.isRequired,
};


export default Daily;