import axios from 'axios';
const agencies = [
  [19.01875200866824, 73.34030446398447],
  [19.382051579341212, 72.8649518944549],
  [19.186110898288916, 73.56633786930132],
  [19.719493666537403, 73.42045334409084],
  [19.842313759624574, 73.24666149988111],
  [19.544991872501576, 73.62883920424919],
  [19.400690582220474, 73.5621614270033],
  [19.397226542347852, 72.95741795994377],
  [19.58766029567944, 73.11965040411279],
  [19.70044558726017, 72.99469497507643],
];
async function main() {
  try {
    const response = await axios.post(
      `https://www.mapquestapi.com/directions/v2/routematrix?key=nuGdfaEudQgh4rlkNX49JgnTKbGnBBVm`,
      {
        locations: agencies.map((agency) => `${agency[0]},${agency[1]}`),
        options: {
          manyToOne: true,
        },
      }
    );
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
}
main();