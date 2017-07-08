import React, { Component } from 'react';
import ScheduleBuilderComponent from '../../../components/systemBuilder/engines/scheduleBuilder/scheduleBuilder';
import WithData from '../../../data/WithData';

const WithSchedules = WithData.polling.WithSchedules;

class ActionsBuilder extends Component {
  state = {
    selectedIndex: 0,
    selectedName: 'other',
  };
  render() {
    return (
      <WithSchedules
        renderWhileLoading
      >
        {({ schedules, addSchedule, deleteSchedule }) => {
          return (
            <ScheduleBuilderComponent
              schedules={schedules.map(schedule => schedule.name)}
              scheduleValues={schedules.map(schedule => schedule.content)}
              selectedIndex={this.state.selectedIndex}
              onScheduleSelected={(selectedName, selectedIndex) => {
                this.setState({
                  selectedIndex,
                  selectedName,
                });
              }}
              scheduleName={schedules.length > 0 ? schedules[this.state.selectedIndex].name : 'No schedules'}
              onScheduleChange={(newSchedules, addedSchedule, deletedScheduleName) => {
                if (addedSchedule) {
                  console.log('added schedule ------ ', addedSchedule);
                  if(typeof(addedSchedule) === typeof('')){
                    addSchedule(addedSchedule);
                  }else {

                    const { name, schedule, topic, value } = addedSchedule;
                    addSchedule(name, schedule, topic, value);
                  }
                }
                if (deletedScheduleName) {
                  console.error('delete:--- ', deletedScheduleName);
                  deleteSchedule(deletedScheduleName);
                }


              }}
            />
          );
        }}
      </WithSchedules>
    );
  }
}

export default ActionsBuilder;

