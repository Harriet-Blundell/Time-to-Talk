const { readFile } = require("fs").promises;
const moment = require("moment");

const fetchAllTherapists = (pageNumber) => {
  return readFile("./data/counsellor-mock.json").then((therapistData) => {
    const therapistObject = JSON.parse(therapistData);
    return therapistObject.slice((pageNumber - 1) * 10, pageNumber * 10);
  });
};

const fetchNextAvailableAppointmentsByDate = () => {
  return readFile("./data/availability-mock.json").then((availabilityData) => {
    let earliestDate = 0;
    const nextAvailableDate = [];
    const appointmentsObject = JSON.parse(availabilityData);
    for (const therapist in appointmentsObject) {
      earliestDate = moment(appointmentsObject[therapist][0].datetime).unix();
      for (let i = 0; i < appointmentsObject[therapist].length; i++) {
        const dateTime = moment(
          appointmentsObject[therapist][i].datetime
        ).unix();
        if (dateTime < earliestDate) {
          earliestDate = dateTime;
        }
      }
      nextAvailableDate.push({
        therapist,
        nextAvailableTime: moment.unix(earliestDate).toDate(),
      });
    }
    return nextAvailableDate;
  });
};

const fetchTherapistByAppointmentType = (
  firstAppointmentType,
  secondAppointmentType
) => {
  return readFile("./data/counsellor-mock.json").then((counsellorData) => {
    const parsedCounsellorData = JSON.parse(counsellorData);
    const therapistsByAppointmentTypes = parsedCounsellorData.filter(
      (therapist) => {
        if (
          therapist.appointment_types.length === 1 &&
          (therapist.appointment_types.includes(firstAppointmentType) ||
            therapist.appointment_types.includes(secondAppointmentType))
        ) {
          return therapist;
        } else if (
          therapist.appointment_types.length === 2 &&
          therapist.appointment_types.includes(
            firstAppointmentType && secondAppointmentType
          )
        ) {
          return therapist;
        } else {
          return "";
        }
      }
    );
    return therapistsByAppointmentTypes;
  });
};

const fetchTherapistById = (id) => {
  return readFile("./data/counsellor-mock.json").then((counsellorData) => {
    const parsedCounsellorData = JSON.parse(counsellorData);
    const filteredData = parsedCounsellorData.filter(
      (counsellor) => counsellor.id === id
    );
    return filteredData;
  });
};

const fetchAvailableAppointmentsByDate = (
  earliestDateInput,
  latestDateInput
) => {
  const earliestDate = moment(earliestDateInput).unix();
  const latestDate = moment(latestDateInput).unix();

  return readFile("./data/availability-mock.json").then(
    (appointmentAvailabilityData) => {
      const appointmentsObject = JSON.parse(appointmentAvailabilityData);
      for (const therapist in appointmentsObject) {
        for (let i = 0; i < appointmentsObject[therapist].length; i++) {
          const availableAppointment = moment(
            appointmentsObject[therapist][i].datetime
          ).unix();
          if (
            availableAppointment > earliestDate &&
            availableAppointment < latestDate
          ) {
            // TODO
          }
        }
      }
    }
  );
};

// fetch therapists by specialisation.

/*
- use a for-in loop to access the key of each therapist in the object
- use a for loop to iterate through the key values of each individual therapist by using bracket notation
- use dot notation to access the datetime key value in the object
- turn the datetime into unix time
- sessions start at 6am until 9pm

- if I choose 09:00 between 26th and 28th May

- In front end, take calendar input from user and convert to unix time to be used by fetch function comparison.
*/
