const { readFile } = require("fs").promises;
const moment = require("moment");

const fetchAllTherapists = (pageNumber) => {
  return readFile("./data/counsellor-mock.json").then((therapistData) => {
    const therapistObject = JSON.parse(therapistData);
    return therapistObject.slice((pageNumber - 1) * 10, pageNumber * 10);
  });
};

/*
fetchAllTherapists() takes a page number as an argument and returns the first 10 therapists on the home page
when the user increments the page number, the function will collect the next 10 objects (therapists) in the array.
*/

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

/*
fetchNextAvailableAppointmentsByDate() uses a for-in loop to iterate over the key in the object
the for-loop iterates over the key's values which is an array
moment.js is being used to convert 'datetime' to unix time
an if statement is being used to check if 'datetime' is less than the variable 'earliestDate',
if it is then earliestDate is reassigned a new value
the data is then pushed into an array along with the therapist and their next available date converted back to 'DD/MM/YYYY'
*/

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
          return [];
        }
      }
    );
    return therapistsByAppointmentTypes;
  });
};

/*
fetchTherapistByAppointmentType() takes two string arguments that the user will select between ('one_off' or 'consultation' or both)
filter() is being used to return the therapists who match the conditions of the if statement
the if statement checks 'appointment_types' length for 1 value and if the value is 'one_off' or 'consultation'
the if statement also checks if 'appointment_types' length is 2 and if both of the selected values are in 'appointment_types'
if a therapist has no 'one_off' or 'consultation' appointment_types then an empty array is returned
*/

const fetchTherapistBySpecialism = (selectedSpecialisms) => {
  return readFile("./data/counsellor-mock.json").then((counsellorData) => {
    const parsedCounsellorData = JSON.parse(counsellorData);

    const therapists = [];

    if (selectedSpecialisms.length >= 2) {
      for (let i = 0; i < parsedCounsellorData.length; i++) {
        if (
          selectedSpecialisms.every((specialism) =>
            parsedCounsellorData[i].specialisms.includes(specialism)
          )
        ) {
          therapists.push(parsedCounsellorData[i]);
        }
      }
    }

    return therapists;
  });
};

/*
fetchTherapistBySpecialism() takes an array of strings as an argument
the argument is checked in an if statement to see if its length is greater than or equal to 2
if it passes the condition then a for-loop is used to iterate over the array objects
.every() is used to check if the 'specialisms' array includes the individual specialism the user has selected
if the conditions are met, the correct therapists are returned else an empty array is given back
*/

const fetchTherapistById = (id) => {
  return readFile("./data/counsellor-mock.json").then((counsellorData) => {
    const parsedCounsellorData = JSON.parse(counsellorData);
    const filteredData = parsedCounsellorData.filter(
      (counsellor) => counsellor.id === id
    );
    return filteredData;
  });
};

/*
fetchTherapistById() takes a string an argument and compares it to the id in counsellor-mock data
if the ids match then the individual therapist is selected
*/

const fetchAvailableAppointmentsByDate = (
  earliestDateInput,
  latestDateInput
) => {
  const earliestDate = moment(earliestDateInput).unix();
  const latestDate = moment(latestDateInput).unix();
  const appointmentsObj = {};

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
            appointmentsObj[therapist] = [
              {
                id: appointmentsObject[therapist][i].id,
                availableTime: moment
                  .unix(availableAppointment)
                  .format("DD/MM/YYYY"),
              },
            ];
          }
        }
      }
      return appointmentsObj;
    }
  );
};

/*
fetchAvailableAppointmentsByDate() takes a user's earliest time and latest time input and finds a therapist
who is available between the selected dates
*/
