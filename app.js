// app.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Fetch PHP data
    const phpApiUrl = 'https://endoflife.date/api/php.json';
    const phpResponse = await axios.get(phpApiUrl);
    const dataPhp = phpResponse.data;

    // Fetch MySQL data
    const mysqlApiUrl = 'https://endoflife.date/api/mysql.json';
    const mysqlResponse = await axios.get(mysqlApiUrl);
    const dataMysql = mysqlResponse.data;

    // Fetch Amazon RDS MySQL data
    const amazonRdsMysqlApiUrl = 'https://endoflife.date/api/amazon-rds-mysql.json';
    const amazonRdsMysqlResponse = await axios.get(amazonRdsMysqlApiUrl);
    const dataAmazonRdsMysql = amazonRdsMysqlResponse.data;

    // Fetch Laravel data
    const laravelApiUrl = 'https://endoflife.date/api/laravel.json';
    const laravelResponse = await axios.get(laravelApiUrl);
    const dataLaravel = laravelResponse.data;

    // Fetch Node.js data
    const nodejsApiUrl = 'https://endoflife.date/api/nodejs.json';
    const nodejsResponse = await axios.get(nodejsApiUrl);
    const dataNodejs = nodejsResponse.data;

    // Fetch Rails data
    const railsApiUrl = 'https://endoflife.date/api/rails.json';
    const railsResponse = await axios.get(railsApiUrl);
    const dataRails = railsResponse.data;

    // Render HTML for PHP, MySQL, Amazon RDS MySQL, Laravel, Node.js, and Rails
    const html = renderHTML(dataPhp, dataMysql, dataAmazonRdsMysql, dataLaravel, dataNodejs, dataRails);
    res.send(html);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

function renderHTML(dataPhp, dataMysql, dataAmazonRdsMysql, dataLaravel, dataNodejs, dataRails) {
  const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in the format YYYY-MM-DD

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tech Stack EOL</title>
      <!-- Include Bootstrap CSS -->
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          padding: 20px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Tech Stack EOL</h1>

        <!-- Bootstrap Nav tabs -->
        <ul class="nav nav-tabs" id="myTabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="php-tab" data-toggle="tab" href="#php" role="tab" aria-controls="php" aria-selected="true">PHP</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="mysql-tab" data-toggle="tab" href="#mysql" role="tab" aria-controls="mysql" aria-selected="false">MySQL</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="amazon-rds-mysql-tab" data-toggle="tab" href="#amazon-rds-mysql" role="tab" aria-controls="amazon-rds-mysql" aria-selected="false">Amazon RDS MySQL</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="laravel-tab" data-toggle="tab" href="#laravel" role="tab" aria-controls="laravel" aria-selected="false">Laravel</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="nodejs-tab" data-toggle="tab" href="#nodejs" role="tab" aria-controls="nodejs" aria-selected="false">Node.js</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="rails-tab" data-toggle="tab" href="#rails" role="tab" aria-controls="rails" aria-selected="false">Rails</a>
          </li>
        </ul>

        <!-- Bootstrap Tab Content -->
        <div class="tab-content">
          <div class="tab-pane fade show active" id="php" role="tabpanel" aria-labelledby="php-tab">
            <table class="table table-bordered">
              <thead class="thead-light">
                <tr>
                  <th>Latest</th>
                  <th>Release</th>
                  <th>Release Date</th>
                  <th>Support Date</th>
                  <th>End of Life Date</th>
                  <th>LTS</th>
                </tr>
              </thead>
              <tbody>
                ${Array.isArray(dataPhp) ?
                  dataPhp.map(version => `
                    <tr>
                      <td>${version.latest} (${version.latestReleaseDate})</td>
                      <td>${version.cycle}</td>
                      <td>${version.releaseDate}</td>
                      <td style="background-color: ${version.support === true ? '-' : (version.support && version.support < currentDate ? 'lightcoral' : 'lightgreen')}">${version.support === true ? '-' : (version.support || '-')}</td>
                      <td style="background-color: ${version.eol && version.eol < currentDate ? 'lightcoral' : 'lightgreen'}">${version.eol ? version.eol : '-'}</td>
                      <td>${version.lts}</td>
                    </tr>
                  `).join('') : ''}
              </tbody>
            </table>
          </div>

          <div class="tab-pane fade" id="mysql" role="tabpanel" aria-labelledby="mysql-tab">
            <table class="table table-bordered">
              <thead class="thead-light">
                <tr>
                  <th>Latest</th>
                  <th>Release</th>
                  <th>Release Date</th>
                  <th>Support Date</th>
                  <th>End of Life Date</th>
                  <th>LTS</th>
                </tr>
              </thead>
              <tbody>
                ${Array.isArray(dataMysql) ?
                  dataMysql.map(version => `
                    <tr>
                      <td>${version.latest} (${version.latestReleaseDate})</td>
                      <td>${version.cycle}</td>
                      <td>${version.releaseDate}</td>
                      <td style="background-color: ${version.support && version.support < currentDate ? 'lightcoral' : 'lightgreen'}">${version.support === true ? '-' : (version.support || '-')}</td>
                      <td style="background-color: ${version.eol && version.eol < currentDate ? 'lightcoral' : 'lightgreen'}">${version.eol ? version.eol : '-'}</td>
                      <td>${version.lts}</td>
                    </tr>
                  `).join('') : ''}
              </tbody>
            </table>
          </div>

          <div class="tab-pane fade" id="amazon-rds-mysql" role="tabpanel" aria-labelledby="amazon-rds-mysql-tab">
            <table class="table table-bordered">
              <thead class="thead-light">
                <tr>
                  <th>Latest</th>
                  <th>Release</th>
                  <th>Release Date</th>
                  <th>Support Date</th>
                  <th>End of Life Date</th>
                  <th>LTS</th>
                </tr>
              </thead>
              <tbody>
                ${Array.isArray(dataAmazonRdsMysql) ?
                  dataAmazonRdsMysql.map(version => `
                    <tr>
                      <td>${version.latest} (${version.latestReleaseDate})</td>
                      <td>${version.cycle}</td>
                      <td>${version.releaseDate}</td>
                      <td style="background-color: ${version.support && version.support < currentDate ? 'lightcoral' : 'lightgreen'}">${version.support === true ? '-' : (version.support || '-')}</td>
                      <td style="background-color: ${version.eol && version.eol < currentDate ? 'lightcoral' : 'lightgreen'}">${version.eol ? version.eol : '-'}</td>
                      <td>${version.lts}</td>
                    </tr>
                  `).join('') : ''}
              </tbody>
            </table>
          </div>

          <div class="tab-pane fade" id="laravel" role="tabpanel" aria-labelledby="laravel-tab">
            <table class="table table-bordered">
              <thead class="thead-light">
                <tr>
                  <th>Latest</th>
                  <th>Release</th>
                  <th>Release Date</th>
                  <th>Support Date</th>
                  <th>End of Life Date</th>
                  <th>LTS</th>
                </tr>
              </thead>
              <tbody>
                ${Array.isArray(dataLaravel) ?
                  dataLaravel.map(version => `
                    <tr>
                      <td>${version.latest} (${version.latestReleaseDate})</td>
                      <td>${version.cycle}</td>
                      <td>${version.releaseDate}</td>
                      <td style="background-color: ${version.support && version.support < currentDate ? 'lightcoral' : 'lightgreen'}">${version.support === true ? '-' : (version.support || '-')}</td>
                      <td style="background-color: ${version.eol && version.eol < currentDate ? 'lightcoral' : 'lightgreen'}">${version.eol ? version.eol : '-'}</td>
                      <td>${version.lts}</td>
                    </tr>
                  `).join('') : ''}
              </tbody>
            </table>
          </div>

          <div class="tab-pane fade" id="nodejs" role="tabpanel" aria-labelledby="nodejs-tab">
            <table class="table table-bordered">
              <thead class="thead-light">
                <tr>
                  <th>Latest</th>
                  <th>Release</th>
                  <th>Release Date</th>
                  <th>Support Date</th>
                  <th>End of Life Date</th>
                  <th>LTS</th>
                </tr>
              </thead>
              <tbody>
                ${Array.isArray(dataNodejs) ?
                  dataNodejs.map(version => `
                    <tr>
                      <td>${version.latest} (${version.latestReleaseDate})</td>
                      <td>${version.cycle}</td>
                      <td>${version.releaseDate}</td>
                      <td style="background-color: ${version.support && version.support < currentDate ? 'lightcoral' : 'lightgreen'}">${version.support === true ? '-' : (version.support || '-')}</td>
                      <td style="background-color: ${version.eol && version.eol < currentDate ? 'lightcoral' : 'lightgreen'}">${version.eol ? version.eol : '-'}</td>
                      <td>${version.lts}</td>
                    </tr>
                  `).join('') : ''}
              </tbody>
            </table>
          </div>

          <div class="tab-pane fade" id="rails" role="tabpanel" aria-labelledby="rails-tab">
            <table class="table table-bordered">
              <thead class="thead-light">
                <tr>
                  <th>Latest</th>
                  <th>Release</th>
                  <th>Release Date</th>
                  <th>Support Date</th>
                  <th>End of Life Date</th>
                  <th>LTS</th>
                </tr>
              </thead>
              <tbody>
                ${Array.isArray(dataRails) ?
                  dataRails.map(version => `
                    <tr>
                      <td>${version.latest} (${version.latestReleaseDate})</td>
                      <td>${version.cycle}</td>
                      <td>${version.releaseDate}</td>
                      <td style="background-color: ${version.support && version.support < currentDate ? 'lightcoral' : 'lightgreen'}">${version.support === true ? '-' : (version.support || '-')}</td>
                      <td style="background-color: ${version.eol && version.eol < currentDate ? 'lightcoral' : 'lightgreen'}">${version.eol ? version.eol : '-'}</td>
                      <td>${version.lts}</td>
                    </tr>
                  `).join('') : ''}
              </tbody>
            </table>
          </div>
        
        </div>
      </div>

      <!-- Include Bootstrap JS and dependencies -->
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </body>
    </html>
  `;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
