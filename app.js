const division = document.getElementById("division");
const district = document.getElementById("district");
const upazilla = document.getElementById("upazilla");

const displayOptions = (area, item) => {
  let option = document.createElement("option");
  option.value = item.toLowerCase();
  option.innerText = item;
  area.appendChild(option);
};

fetch("https://bdapis.herokuapp.com/api/v1.0/divisions")
  .then((res) => res.json())
  .then((res) => res.data)
  .then((res) => res.map((div) => div.division))
  .then((res) => res.map((item) => displayOptions(division, item)));

division.addEventListener("change", (e) => {
  e.preventDefault();
  district.innerHTML = `<option value='' selected>-- Select District --</option>`;
  upazilla.innerHTML = `<option value='' selected>-- Select Upazilla --</option>`;
  if (division.value != "0") {
    var fetchData = fetch(
      `https://bdapis.herokuapp.com/api/v1.0/division/${division.value}`
    )
      .then((res) => res.json())
      .then((res) => res.data);

    fetchData
      .then((res) => res.map((div) => div.district))
      .then((res) => res.map((item) => displayOptions(district, item)));
  }

  district.addEventListener("change", (e) => {
      upazilla.innerHTML = `<option value='' selected>-- Select Upazilla --</option>`;
    e.preventDefault();
    if (district.value != "0") {
      fetchData
        .then((res) => res.find((upazilla) => upazilla._id == district.value))
        .then((res) =>
          res.upazilla.map(item => displayOptions(upazilla,item))
        );
    }
  });
});

document.getElementById("adress").addEventListener("submit", (e) => {
  e.preventDefault();
  const address = `<div class="card">
                    <h2>You are from:</h2>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item text-capitalize"><strong>Division:</strong> ${division.value}</li>
                        <li class="list-group-item text-capitalize"><strong>District:</strong> ${district.value}</li>
                        <li class="list-group-item text-capitalize"><strong>Upazilla:</strong> ${upazilla.value}</li>
                    </ul>
                </div>`;

  document.getElementById("address-area").innerHTML = address;
});
