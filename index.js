// constants 
const app = document.getElementById('app');
const parties = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-FTB-CT-WEB-PT/events';

const pageLayout = () => {
    const title = document.createElement('h1');
    title.textContent = 'Party Planner';;
    app.append(title);

    const sectionPartyList = document.createElement('div');
    sectionPartyList.className = 'party-list';

    const sectionUpcomingParties = document.createElement('div');
    sectionUpcomingParties.className = 'upcoming-parties';
    const headerUpcomingParties = document.createElement('h2');
    headerUpcomingParties.textContent = 'Upcoming Parties';
    sectionUpcomingParties.append(headerUpcomingParties);
    sectionPartyList.append(sectionUpcomingParties);

    const sectionPartyDetails = document.createElement('div');
    sectionPartyDetails.className = 'party-details';
    const headerPartyDetails = document.createElement('h2');
    headerPartyDetails.textContent = 'Party Details';
    sectionPartyDetails.append(headerPartyDetails);
    sectionPartyList.append(sectionPartyDetails);

    app.append(sectionPartyList);
}

const getListOfParties = async () => {
    let resJson
    try {
        const response = await fetch(parties);
        resJson = await response.json();
    } catch (error) {
        console.error('Failed to fetch parties:', error);
    }
    const countParties = resJson.data.length;

    const sectionUpcomingParties = document.querySelector('.party-list div');
    const partyNames = document.createElement('div')
    partyNames.className = 'party-names';
    sectionUpcomingParties.append(partyNames);
    const partyName = document.createElement('div');
    partyName.textContent = 'Please select an event';
    const partyID = document.createElement('div');
    const partyDate = document.createElement('div');
    const partyDescription = document.createElement('div');
    const partyLocation = document.createElement('div');

    for(let i = 0; i < countParties; i++) {
        const sectionUpcomingParties = document.querySelector('.party-details');
        const partyDetails = document.createElement('div');
        partyDetails.className = 'party-info';
        sectionUpcomingParties.append(partyDetails)
        const party = resJson.data[i];
        const partyItem = document.createElement('button');
        partyItem.className = 'party-item';
        partyItem.textContent = party.name;
        partyNames.append(partyItem);
        
        partyDetails.append(partyName, partyID, partyDate, partyDescription, partyLocation);
        partyItem.addEventListener('click', () => {
            const partyDetails = document.querySelector('.party-info');
            partyDetails.innerHTML = '';
            partyName.textContent = party.name;
            partyID.textContent = party.id;
            partyDate.textContent = party.date;
            partyDescription.textContent = party.description;
            partyLocation.textContent = party.location;
            partyDetails.append(partyName, partyID, partyDate, partyDescription, partyLocation);
        });
    }
}

const start = () => {
  pageLayout();
  getListOfParties();
  getPartyDetails();
};

start();