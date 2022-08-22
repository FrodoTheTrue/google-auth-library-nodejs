// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Uses the Google Cloud metadata server in the Cloud Run (or AppEngine or Kubernetes etc.,)
 * environment to create an identity token and add it to the HTTP request as part of an
 * Authorization header.
 *
 * @param {string} url - The url or target audience to obtain the ID token for.
 */
function main(url) {
  // [START auth_cloud_idtoken_metadata_server]
  /**
   * TODO(developer):
   *  1. Uncomment and replace these variables before running the sample.
   */
  // const url = 'http://www.abc.com';

  const {Compute} = require('google-auth-library');

  async function getIdTokenFromMetadataServer() {
    const auth = new Compute();

    // Get the ID token.
    // Once you've obtained the ID token, use it to make an authenticated call
    // to the target audience.
    await auth.fetchIdToken(url);
    console.log('Generated ID token.');
  }

  getIdTokenFromMetadataServer();
  // [END auth_cloud_idtoken_metadata_server]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
