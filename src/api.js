import availabilityData from "./data/availability-mock.json";
import counsellorData from "./data/counsellor-mock.json";
const moment = require("moment");

export const fetchAllTherapists = (pageNumber) => {
  return counsellorData.slice((pageNumber - 1) * 10, pageNumber * 10);
};

/*
fetchAllTherapists() takes a page number as an argument and returns the first 10 therapists on the home page
when the user increments the page number, the function will collect the next 10 objects (therapists) in the array.
*/

export const fetchNextAvailableAppointmentsByDate = () => {
  let earliestDate = 0;
  const nextAvailableDate = [];
  for (const therapist in availabilityData) {
    earliestDate = moment(availabilityData[therapist][0].datetime).unix();
    for (let i = 0; i < availabilityData[therapist].length; i++) {
      const dateTime = moment(availabilityData[therapist][i].datetime).unix();
      if (dateTime < earliestDate) {
        earliestDate = dateTime;
      }
    }
    nextAvailableDate.push({
      id: therapist,
      nextAvailableTime: moment.unix(earliestDate).toDate(),
    });
  }
  return nextAvailableDate;
};

// /*
// fetchNextAvailableAppointmentsByDate() uses a for-in loop to iterate over the key in the object
// the for-loop iterates over the key's values which is an array
// moment.js is being used to convert 'datetime' to unix time
// an if statement is being used to check if 'datetime' is less than the variable 'earliestDate',
// if it is then earliestDate is reassigned a new value
// the data is then pushed into an array along with the therapist and their next available date converted back to 'DD/MM/YYYY'
// */

export const fetchTherapistByAppointmentType = (
  firstAppointmentType,
  secondAppointmentType
) => {
  const therapistsByAppointmentTypes = counsellorData.filter((therapist) => {
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
      return [];
    }
  });
  return therapistsByAppointmentTypes;
};

// /*
// fetchTherapistByAppointmentType() takes two string arguments that the user will select between ('one_off' or 'consultation' or both)
// filter() is being used to return the therapists who match the conditions of the if statement
// the if statement checks 'appointment_types' length for 1 value and if the value is 'one_off' or 'consultation'
// the if statement also checks if 'appointment_types' length is 2 and if both of the selected values are in 'appointment_types'
// if a therapist has no 'one_off' or 'consultation' appointment_types then an empty array is returned
// */

export const fetchTherapistBySpecialism = (selectedSpecialisms) => {
  const therapists = [];

  for (let i = 0; i < counsellorData.length; i++) {
    if (
      selectedSpecialisms.every((specialism) =>
        counsellorData[i].specialisms.includes(specialism)
      )
    ) {
      therapists.push(counsellorData[i]);
    }
  }

  return therapists;
};

// /*
// fetchTherapistBySpecialism() takes an array of strings as an argument
// the argument is checked in an if statement to see if its length is greater than or equal to 2
// if it passes the condition then a for-loop is used to iterate over the array objects
// .every() is used to check if the 'specialisms' array includes the individual specialism the user has selected
// if the conditions are met, the correct therapists are returned else an empty array is given back
// */

export const fetchTherapistById = (id) => {
  const filteredData = counsellorData.filter(
    (counsellor) => counsellor.id === id
  );
  return filteredData;
};

// /*
// fetchTherapistById() takes a string an argument and compares it to the id in counsellor-mock data
// if the ids match then the individual therapist is selected
// */

export const fetchAvailableAppointmentsByDate = (
  earliestDateInput,
  latestDateInput
) => {
  const earliestDate = moment(earliestDateInput).unix();
  const latestDate = moment(latestDateInput).unix();
  const appointmentsObj = {};

  for (const therapist in availabilityData) {
    for (let i = 0; i < availabilityData[therapist].length; i++) {
      const availableAppointment = moment(
        availabilityData[therapist][i].datetime
      ).unix();
      if (
        availableAppointment > earliestDate &&
        availableAppointment < latestDate
      ) {
        appointmentsObj[therapist] = [
          {
            id: availabilityData[therapist][i].id,
            availableTime: moment
              .unix(availableAppointment)
              .format("DD/MM/YYYY"),
          },
        ];
      }
    }
  }
  return appointmentsObj;
};

// /*
// fetchAvailableAppointmentsByDate() takes a user's earliest time and latest time input and finds a therapist
// who is available between the selected dates
// */
