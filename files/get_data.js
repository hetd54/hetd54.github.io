/*
On mouseclick, get json data
and return it to the page
*/

document.getElementById("getData").addEventListener("click", e => {
    
    makeRequest("https://hetd54.github.io/files/my_college_degrees.json");
    
});

function makeRequest(url) {
        fetch(url, {
        method: 'GET', 
        headers: {
            'Accept': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);

        let degrees = JSON.stringify(data);
        console.log(degrees);
        

        // Looking at https://www.geeksforgeeks.org/how-to-convert-json-data-to-a-html-table-using-javascript-jquery/
        // I was trying to get it to work, but having a lot of trouble.
        // I tried using the replacer parameter, but I wasn't able to get to the data within degrees
        // I know this looks SO ugly, but I kept it so you could make comments
        let columns = [];
        for (let i = 0; i < degrees.length; i++){
            for (let key in degrees[i]){
                console.log(key);
                if (columns.indexOf(key) === -1) {      
                    // Push all keys to the array
                    columns.push(key);
                }
            }
        }
        console.log(columns);

        // Create a table element
        let table = document.createElement("table");
                
        // Create table row tr element of a table
        let tr = table.insertRow(-1);
        
        for (let i = 0; i < columns.length; i++) {
            
            // Create the table header th element
            let theader = document.createElement("th");
            theader.innerHTML = columns[i];
            
            // Append columnName to the table row
            tr.appendChild(theader);
        }
        
        // Adding the data to the table
        for (let i = 0; i < degrees.length; i++) {
            
            // Create a new row
            trow = table.insertRow(-1);
            for (let j = 0; j < columns.length; j++) {
                let cell = trow.insertCell(-1);            
                // Inserting the cell at particular place
                cell.innerHTML = degrees[i][columns[j]];
            }
        }

        // location where we will put the eventual table:
        const degreeList = document.getElementById("degreeList");
        
        // Add the newly created table containing json data
        degreeList.innerHTML = degrees;
        degreeList.appendChild(table);

        })
        .catch((error) => {
        console.error('Error:', error);
        document.getElementById("errorMessage").innerHTML = error;
        });
        
    }

    



