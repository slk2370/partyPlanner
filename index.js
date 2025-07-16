// constants 
const app = document.getElementById('app');
const parties = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-FTB-CT-WEB-PT/events';
let resJson
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
    const partyDate = document.createElement('div');
    const partyDescription = document.createElement('div');
    const partyLocation = document.createElement('div');
    const btnDelete = document.createElement('button');
    
    for(let i = 0; i < countParties; i++) {
        const partyID = document.createElement('div');
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
            btnDelete.textContent = 'DELETE';
            btnDelete.id = 'delete'
            partyDetails.append(partyName, partyID, partyDate, partyDescription, partyLocation, btnDelete);
            deleteParty();
        });
    }
}

const postNewParty = async (name, date, description, location) => {
    try {
        await fetch(parties, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                date: new Date(date).toISOString(),
                description: description,
                location: location,
            }),
        });
    } catch (error) {
        console.error(error);
    }
};

const adminForm = () => {

    const $form = document.createElement('form');
    app.append($form);

    $form.innerHTML = `
        <h2>Add New Party</h2>
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div>
                <label for="date">Date</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div>
                <label for="description">Description</label>
                <textarea id="description" name="description" required></textarea>
            </div>
            <div>
                <label for="location">Location</label>
                <input type="text" id="location" name="location" required>
            </div>
        <button type="submit" id="btnSubmit">Submit</button>
    `;

    const $formElement = $form;
    $formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const inputName = document.getElementById('name');
        const valueName = inputName.value;
        const inputDate = document.getElementById('date');
        const valueDate = inputDate.value;
        const inputDescription = document.getElementById('description');
        const valueDescription = inputDescription.value;
        const inputLocation = document.getElementById('location');
        const valueLocation = inputLocation.value;
        postNewParty(valueName, valueDate, valueDescription, valueLocation);
        console.log(valueName, new Date(valueDate).toISOString(), valueDescription, valueLocation);
        setTimeout(() => {
            window.location.reload();
        }, 500);
        });

}

const deleteParty = async () => {
    const btnDelete = document.getElementById('delete');
    btnDelete.addEventListener('click', async (event) => {
        const partyID = document.querySelector('.party-info div:nth-child(2)');
        if (event.target.id === 'delete') {
            const id = partyID.textContent;
            try {
                await fetch(`${parties}/${id}`, { method: 'DELETE' });
                window.location.reload();
            } catch (error) {
                console.error('Failed to delete party:', error);
            }
        }
    });
};

const start = () => {
  pageLayout();
  getListOfParties();
  adminForm();
};

start();