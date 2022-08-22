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
 * Shows credentials auto-detections in the intercation with GCP libraries
 *
 * @param {string} projectId - Project ID or project number of the Cloud project you want to use.
 * @param {string} zone - Zone of the disk you copy from.
 */
function main(projectId, zone) {
  // [START auth_cloud_implicit_adc]
  /**
   * TODO(developer):
   *  1. Uncomment and replace these variables before running the sample.
   *  2. Set up ADC as described in https://cloud.google.com/docs/authentication/external/set-up-adc
   *  3. Make sure that the user account or service account that you are using
   *    has the required permissions. For this sample, you must have "compute.instances.list".
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const zone = 'us-central1-a';

  const compute = require('@google-cloud/compute');

  async function authenticateImplicitWithAdc() {
    // This snippet demonstrates how to list instances.
    // Hence, the client library will look for credentials using ADC.
    const instancesClient = new compute.InstancesClient();

    const [instanceList] = await instancesClient.list({
      project: projectId,
      zone,
    });

    console.log(`Instances found in zone ${zone}:`);

    for (const instance of instanceList) {
      console.log(` - ${instance.name} (${instance.machineType})`);
    }

    console.log('Listing instances complete.');
  }

  authenticateImplicitWithAdc();
  // [END auth_cloud_implicit_adc]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
