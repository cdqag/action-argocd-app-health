import * as core from '@actions/core';

import { requireNonEmptyStringInput } from './utils';
import { ArgoCDClient } from './argocd';
import { HealthStatus } from './argocd/models/argocd/HealthStatus';
import {
  printHealth,
  printResourceEvents,
  printPodContainerLogs
} from './print';

const appName = requireNonEmptyStringInput('app-name');
const serverUrl = requireNonEmptyStringInput('server-url');
const userLogin = requireNonEmptyStringInput('user-login');
const userPassword = requireNonEmptyStringInput('user-password');

const main = async () => {
  const argocd = new ArgoCDClient(serverUrl);
  await argocd.authenticate(userLogin, userPassword);
  
  const app = await argocd.getApplication(appName);
  
  printHealth(`Application ${appName}`, app.status.health);
  if (app.status.health.status !== HealthStatus.Healthy) {

    // app.status.resources.forEach(async (resource) => {
    //   if (resource.health && resource.health.status !== HealthStatus.Healthy) {
    //     console.log(`> ${resource.kind} ${resource.name} is in ${resource.health.status} state because: `, resource.health.message);
    //   }
    // });

    const tree = await argocd.getApplicationResourceTree(appName);
    for (const node of tree.nodes) {
      if (node.health && node.health.status !== HealthStatus.Healthy) {
        await printHealth(`${node.kind} ${node.name}`, node.health);
        await printResourceEvents(argocd, appName, node.kind, node.namespace, node.uid, node.name);

        if (node.kind == 'Pod') {
          const containers = await argocd.getApplicationPodContainers(appName, node.namespace, node.name);
          if (containers.length > 0) {
            console.log(`  ↘️ Pod ${node.name} has the following containers:`);
            for (const container of containers) {
              console.log(`    📦 ${container.name} (${container.image})`);
              await printPodContainerLogs(argocd, appName, node.namespace, node.name, container.name);
            }

          } else {
            const msg = `Pod ${node.name} has no containers`;
            console.error(`  ❗ ${msg}`);
            core.error(msg);
          }
        }
      }
    }

  }

}

main();
