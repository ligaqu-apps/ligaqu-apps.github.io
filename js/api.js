const BASE_URL = "https://api.football-data.org/v2/";

const LEAGUE_ID = 2021;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const ENDPOINT_TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
const ENDPOINT_TEAM_KLUB = `${BASE_URL}teams`;
const ENDPOINT_TANDING_TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/matches?status=SCHEDULED`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '1d4651ec08c04beeb8028353dc31860e'
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};


function getInfoLigaPremierInggris(){
     if ("caches" in window) {
        caches.match(ENDPOINT_TEAM).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Data Info Liga Premier Inggris: " + data);
                    showInfoLigaPremierInggris(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_TEAM)
        .then(data => {
            showInfoLigaPremierInggris(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function getInfoLigaPremierInggrisByID(){
    return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
            caches.match(ENDPOINT_TEAM_KLUB + "/" + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("Data Info Liga Premier Inggris By ID: " + data);
                        showInfoLigaPremierInggrisByID(data);
                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    })
                }
            })
        }

        fetchAPI(ENDPOINT_TEAM_KLUB + "/" + idParam)
            .then(data => {
                showInfoLigaPremierInggrisByID(data);
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            })
            .catch(error => {
                console.log(error);
    });
  });
}


function getKlasemen() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Data Klasemen: " + data);
                    showKlasemen(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showKlasemen(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function getTanding(){
         if ("caches" in window) {
            caches.match(ENDPOINT_TANDING_TEAM).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        console.log("Data Pertandingan: " + data);
                        showTanding(data);
                    })
                }
            })
        }

        fetchAPI(ENDPOINT_TANDING_TEAM)
            .then(data => {
                showTanding(data);
            })
            .catch(error => {
                console.log(error);
            })
}





//menampilkan data 
function showInfoLigaPremierInggris(data) {
    
    let infoKlub = "";
    let infoSeason = "";
    let ligaPremierInggrisElement = document.getElementById("liga-premier-inggris");

    // console.log(data);
    //ambil data API
    infoSeason +=`
            <p>Liga Premier Inggris tahun ini dimulai pada tanggal ${data.season.startDate} dan berakhir pada ${data.season.endDate}. </p>
            `;
    let i = 1;
    data.teams.forEach(function (team) {
        infoKlub += `
            <tr>
                <td>${i++}</td>
                <td><img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${team.name}</td>
                <td><a href="./team.html?id=${team.id}">Info Selanjutnya</a></td>
            </tr>
        `;
    });

    //susun data API
     ligaPremierInggrisElement.innerHTML = `
        <div class="col s12 center">
            <h3>Liga Premier Inggris</h3>
            <p>Liga Premier Inggris merupakan liga tertinggi dalam sistem liga sepak bola di Inggris. Kompetisi ini diikuti oleh 20 klub, dan menerapkan sistem promosi dan degradasi dengan English Football League (EFL).</p>
            ${infoSeason}
        </div>
        <b><p>Klub yang terdafar pada Liga Premier Inggris Musim ini, sebagai berikut; </p></b>
        <table class="striped responsive-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th colspan="2" class="center">Klub Sepakbola</th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="klasemen">
                ${infoKlub}
            </tbody>
        </table>
    `;
}

function showInfoLigaPremierInggrisByID(data) {
    console.log(data);
    let squad = "";
    let infoElement =  document.getElementById("body-content");

    var i = 1;
    data.squad.forEach(function (pemain) {

        var tanggal = [];
        var data = pemain.dateOfBirth;
        if(pemain.dateOfBirth !== null){
            tanggal = data.split("T");
        } else {
            tanggal = ["Tidak ada"];
        };

        if(pemain.position === "Attacker"){
            pemain.position = "Penyerang";
        } else if (pemain.position === "Midfielder"){
            pemain.position = "Gelandang";
        } else if (pemain.position === "Defender"){
            pemain.position = "Pertahanan";
        } else if (pemain.position === "Goalkeeper"){
            pemain.position = "Penjaga Gawang";
        } else {
            pemain.position = "Pelatih";
        };

        if(pemain.shirtNumber == null){
            pemain.shirtNumber = "Tidak ada";
        }
        squad += `
            <tr>
                <td>${i++}</td>
                <td>${pemain.name}</td>
                <td>${pemain.position}</td>
                <td>${tanggal[0]}</td>
                <td>${pemain.shirtNumber}</td>
            </tr> 
        `;
    });

    infoElement.innerHTML = `
        <div class="card" style="padding: 18px; margin-top: 30px;">
            <div class="row">
                <div class="col s12 m3">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                    </div>
                </div>
                <div class="col s12 m9">
                    <div class="card-content">
                        <span class="card-title"><b>${data.name}</b></span>
                        <p>Alamat   : ${data.address}</p>
                        <p>No Telp  : ${data.phone}</p>
                        <p>Website  : ${data.website}</p>
                        <p>Email    : ${data.email}</p>
                        <p>Stadion  : ${data.venue}</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card" style="padding: 18px; margin-top: 30px;">
            <span class="card-title"><b>Pemain</b></span>
            <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Posisi</th>
                            <th>Tanggal Lahir</th>
                            <th>No Punggung</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${squad}
                    </tbody>
                </table>
        </div>
        `;    
}

function getSavedInfoLigaPremierInggris(){
    getAll().then(function(data) {
    // console.log(data);
    // Ambil nilai query parameter (?id=)
    let infoKlub = "";
    let savedLigaPremierInggrisElement =  document.getElementById("info-klub");

    data.forEach(function (team) {
        infoKlub += `
            <tr>
                <td width="50px">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="badge"/>
                    </div>
                </td>
                <td width="25%">${team.name}</td>
                <td class="center"><a href="./team.html?id=${team.id}&saved=true">Info Selanjutnya</a></td>
            </tr>
        `;
    });

    //susun data API
     savedLigaPremierInggrisElement.innerHTML = `
        <div class="card" style="padding: 18px; margin-top: 30px;">
        <b class="center"><h4>Tim Sepakbola Favorit</h4></b>
            <table class="striped responsive-table">
                <tbody id="klasemen">
                    ${infoKlub}
                </tbody>
            </table>
        </div>
    `;
  });
}

function  getSavedInfoLigaPremierInggrisByID(){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var isFromSaved = urlParams.get("saved");

    getById(idParam).then(function(data) {
        console.log(data);
        let squad = "";
        let infoElement =  document.getElementById("body-content");

        var i = 1;
        data.squad.forEach(function (pemain) {
            var tanggal = [];
            var data = pemain.dateOfBirth;
            if(pemain.dateOfBirth !== null){
                tanggal = data.split("T");
            } else {
                tanggal = ["Tidak ada"];
            };

            if(pemain.position === "Attacker"){
                pemain.position = "Penyerang";
            } else if (pemain.position === "Midfielder"){
                pemain.position = "Gelandang";
            } else if (pemain.position === "Defender"){
                pemain.position = "Pertahanan";
            } else if (pemain.position === "Goalkeeper"){
                pemain.position = "Penjaga Gawang";
            } 

            if(pemain.shirtNumber == null){
                pemain.shirtNumber = "Tidak ada";
            }
            squad += `
                <tr>
                    <td>${i++}</td>
                    <td>${pemain.name}</td>
                    <td>${pemain.position}</td>
                    <td>${tanggal[0]}</td>
                    <td>${pemain.shirtNumber}</td>
                </tr> 
            `;
        });

        infoElement.innerHTML = `
            <div class="card" style="padding: 18px; margin-top: 30px;">
                <div class="row">
                    <div class="col s12 m3">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                        </div>
                    </div>
                    <div class="col s12 m9">
                        <div class="card-content">
                            <span class="card-title"><b>${data.name}</b></span>
                            <p>Alamat : ${data.address}</p>
                            <p>No Telp : ${data.phone}</p>
                            <p>Website : ${data.website}</p>
                            <p>Email : ${data.email}</p>
                            <p>Stadion : ${data.venue}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="card" style="padding: 18px; margin-top: 30px;">
                <span class="card-title"><b>Pemain</b></span>
                <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Posisi</th>
                                <th>Tanggal Lahir</th>
                                <th>No Punggung</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${squad}
                        </tbody>
                    </table>
            </div>
            `;
            
        });
}


function showKlasemen(data) {
    let standings = "";
    let klasemenElement =  document.getElementById("klasemen");
    let i = 1;
    data.standings[0].table.forEach(function (standing) {
    // console.log(data);
    standings += `
            <tr>
                <td>${i++}</td>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
                <td>${standing.points}</td>
            </tr>
        `;
    });

    klasemenElement.innerHTML = `
        <h4 class="header center">Klasemen Sementara Liga Inggris</h4>
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th></th>
                        <th>Klub</th>
                        <th>M</th>
                        <th>M</th>
                        <th>S</th>
                        <th>K</th>
                        <th>GM</th>
                        <th>GA</th>
                        <th>SG</th>
                        <th>Point</th>
                    </tr>
                </thead>
                <tbody id="klasemen">
                    ${standings}
                </tbody>
            </table>
        </div>
    `;
}

function showTanding(data) {
    
    let tanding = "";
    let tandingKe = "";
    let tandingElement =  document.getElementById("tanding-team");

    data.matches.forEach(function (match) {

    var data = match.utcDate;
    var tanggal = data.split("T");
    var pukul = tanggal[1].split("Z");
    var pecahPukul = pukul[0].split(":");
    var jam = parseInt(pecahPukul[0]);
    var jamWIB =  jam + 7;
    if(jamWIB < 24){
        var jamTanding = jamWIB;
        var jamTandingWIB = jamTanding.toString();
    } else if (jamWIB == 24) {
        var jamTandingWIB = "00";
    } else {
        var jamTanding = jamWIB - 24;
        var jamTandingWIB = jamTanding.toString();
    };

    var gabungJam = jamTandingWIB + ":" + pecahPukul[1] ;

    tanding +=`
            <tr>
                <td colspan="3" style="background-color:#eaeaea;">
                    <p>Pertandingan ke-${match.matchday}, pada tanggal ${tanggal[0]} pukul ${gabungJam} WIB</p>
                </td>
            </tr>
            <tr>
                <td class="center">${match.homeTeam.name}</td>
                <td> VS </td>
                <td class="center">${match.awayTeam.name}</td>
            </tr>
            <tr>
                <td colspan="3"></td>
            </tr>
        `;
    });

    tandingElement.innerHTML = `
        <div class="row">
            <h4 class="center">Jadwal Pertandingan Liga Premier Inggris</h4>
        </div>
        <table class="highlight responsive-table " width="100%">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="standings">
                ${tanding}
            </tbody>
        </table>
    `;
}














