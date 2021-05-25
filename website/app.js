/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=5493278d3acd70a7f707216265367d21&units=metric';
let day = new Date();
let newDate = (day.getMonth() + 1) + '/'+ day.getDate()+'/'+ day.getFullYear();
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    let user_zip = document.getElementById("zip").value;
    getAnimalDemo(baseURL, user_zip, apiKey);


}
//fetching the api of weather
const getAnimalDemo = async (baseURL, zip, key)=> {
    // 1.
    const res = await fetch(baseURL + zip + key)
    // 2. Call Fake API
    let data;
    try {
        data = await res.json();
        //storing data then fetch it again
        postTemp('/addData', data).then(updateUI());
    } catch (error) {
        console.log("error", error);
    }

    //posting data in server
}
    const postTemp = async ( url = '', data = {})=>{
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        try {

            return await response.json();
        }catch(error) {
            console.log("error", error);
            // appropriately handle the error
        }
    }

//manipulating the data in dom

const updateUI = async()=>{
    const request = await fetch('/getData')
    try{
        const allData = await request.json();
        const feel = document.getElementById('feelings').value
        console.log(allData);
        document.getElementById('date').innerHTML ="Date:\t"+newDate;
        document.getElementById('temp').innerHTML ="current Temperature: \t"+allData.temp +"°C"
        document.getElementById('content').innerHTML =  "i feel like:\t"+feel
        document.getElementById('cityName').innerHTML =  "city:\t"+allData.name
    }catch(err){
        console.log('error',err);
    }
 }

