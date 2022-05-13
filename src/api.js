const { readFile } = require("fs").promises;

const fetchTherapistById = (id) => {
  return readFile("./data/counsellor-mock.json").then((data) => {
    const parsedData = JSON.parse(data);
    const filteredData = parsedData.filter(
      (counsellor) => counsellor.id === id
    );
    return filteredData;
  });
};
